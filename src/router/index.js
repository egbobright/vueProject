import { createRouter, createWebHistory } from "vue-router"; 
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import store from '@/store';

const routes = [ 
  {
    path: "/login",
    name: "login", 
    meta: { 
      title: "User login", 
      requires_auth: false, /* CHECK USER ACCESS */  
    }, 
    component: () => import(/* webpackChunkName: "login" */ "@/views/auth/login.vue"),
  },
  {
    path: "/",
    name: "dashboard", 
    meta: { 
      title: "Dashboard", 
      requires_auth: true, /* CHECK USER ACCESS */  
    }, 
    component: () => import(/* webpackChunkName: "login" */ "@/views/index.vue"),
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar. 
    NProgress.configure({ showSpinner: false }).start();
    }
    NProgress.configure({ showSpinner: false }).start();
    next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title  
  if (to.matched.some(record => record.meta.requires_auth)) {
      if (store.state.is_authenticated) next();   
      else next(`/login`); // send user to login page with intending page so as to execute a redirect after login
  }

 else next()
   
})

// router.beforeEach((to, from, next) => {
//   document.title = to.title
//   if (to.matched.some(record => record.requiresGuest)) {
//       if (store.state.is_authenticated || store.state.user !== null) { // redirect user to home page.
//           next("/home");
//           return;
//       }
//       next();
//   } else {
//       next();
//   }
// })

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router