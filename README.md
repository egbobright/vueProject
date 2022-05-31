
# DOCUMENTATION

This is a simple web application build with Vue js framework.

It demonstrates simple crud functionalities utilizing JavaScript SPA features. This means all client server interactions are done on one page without the user necessarily having to switch pages.

# OPERATIONS
i. To access the system, a user needs to be authenticated. And to do so, user needs to visit the following URL {{baseUrl}}/login.

ii. after login, user is redirected to {{baseUrl}}/

iii. On page load, an onLoad() process is activated to spool all marketers available.

iv. Once marketers have been loaded, user can perform any crud operation like (add, delete, search and delete)

# REQUIREMENT
i. Node must be installed on the server 

# DEPLOYMENT

i. Clone project from git repo to server root folder.

ii. Run the following cli command npm install to install all required dependencies.

iii. Afterwards run: npm run build.

iv. After app build, access application from serves web address.

# FOLDER STRUCTURE
i. src/view/auth contains the login page

ii.src/router contains the page navigation file

iii. src/utils contain reusable JavaScript functions that can be imported anywhere needed in the web app.

iv. src/store contain vuex store file which manages store/client caching.

v. src/services contain server REST API route file.