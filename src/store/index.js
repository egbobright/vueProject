import { createStore } from 'vuex' 
import createPersistedState from 'vuex-persistedstate'; 
// import {REMOVE_CHARC} from "@/utils/";   

const store = new createStore({

    state: {
        user: null, 
        is_authenticated: false,
        rememberUser: null, 
    },

    mutations: { 

        AUTH_LOGOUT(state) {   
            localStorage.setItem('user', null)  
            localStorage.setItem('is_authenticated', false) 
            state.user = null  
            state.is_authenticated = false
               
        },

        AUTH_SUCCESS(state, payload) { 
            localStorage.setItem('user', payload)  
            localStorage.setItem('is_authenticated', true) 
            state.user = payload  
            state.is_authenticated = true
        },

        AUTH_REMEMBER(state, payload) { 
            state.rememberUser = payload 
        },
 
    },

    actions: {
 
    },

    getters: {
        is_authenticated: state => state.is_authenticated,
    },

    modules: {},

    plugins: [createPersistedState()],
});

store.subscribe((mutation, state) => { 
    localStorage.setItem('store', JSON.stringify(state));
});

export default store;