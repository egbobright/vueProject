<template>
<div class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <router-link to="/">Test System</router-link>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <center v-if="!onSuccess" class="text-danger text-sm" id="msg">{{resMsg}}</center>
      <center v-else class="text-success">{{resMsg}}</center>
      <p class="login-box-msg">Sign in to start your session</p>

      <form>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="username" placeholder="Username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="password" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" v-model="remember" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="button" id="login_button" @click="DO_VALIDATE()" class="btn btn-primary btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form> 
    </div>
    <!-- /.login-card-body -->
  </div>
</div> 
</div>
</template>

<script>
// @ is an alias to /src 
import apiServices from "@/services"; // IMPORT SERVER ROUTE SERVICES 
import {CHECK_IF_EMPTY, CHECK_EMAIL_PATTERN} from "@/utils/"; // IMPORT REUSEABLE JS FUNCTIONS 

export default {
name: "Login",
data() {
    return{   
      remember: this.$store.state.rememberUser !== null ? this.$store.state.rememberUser.remember : false,
      username: this.$store.state.rememberUser !== null ? this.$store.state.rememberUser.username : '',
      password: this.$store.state.rememberUser !== null ? this.$store.state.rememberUser.password : '',
      onSuccess: null,
      resMsg: '',  
      CHECK_IF_EMPTY, CHECK_EMAIL_PATTERN,
    }
},  
methods: { 

    DO_VALIDATE: function(){ // VALIDATE REQUEST BODY BEFORE SENDING TO SERVER
      if(!CHECK_IF_EMPTY(this.username) || !CHECK_IF_EMPTY(this.password)){ // CHECK IF USERNAME & PASSWORD IS EMPTY.
        document.getElementById('login_button').innerHTML = 'Loading...'; // Trigger loading text. 
        document.getElementById('login_button').setAttribute(`disabled`, true); // Trigger disable login button. 
        this.DO_LOGIN() // CALL LOGIN FUNCTION
      }
      else{
        this.resMsg = ' Ensure username or password is not empty'; // on error show message.
      }
    },
      
    DO_LOGIN: function(){ // FUNCTION FOR USE LOGIN
      
      let data = {'username': this.username, 'password': this.password} // Prepare login data object.

      this.remember ? this.$store.commit('AUTH_REMEMBER', { 'username': this.username, 'password': this.password, 'remember': this.remember}) : null; //Remember user if remember check box is active. 
      
    apiServices.DO_LOGIN(data)
        .then(result =>{ // SERVER RESPONSE 

            document.getElementById('login_button').removeAttribute(`disabled`); // enable login button 
            document.getElementById('login_button').innerHTML = 'Sign in'; 

            if(!result.data.status === 200){  // If request failed
              this.onSuccess = false;
              this.resMsg = result.data.message;
              document.getElementById('login_button').innerHTML = 'Sign in'; 
            }
            else{ // if request was successfull.
              this.onSuccess = true; 
              this.resMsg = 'Login operation successful, ';
              this.$store.commit('AUTH_SUCCESS', result.data);   
              setTimeout(() => this.$router.push('/'), 800)  // redirct to dashboard after 8 mili seconds 
            }  
        })
        .catch(err => { // If there was an error.
            console.log(err.message) 
            this.onSuccess = false;
            this.resMsg = 'an internal server error occured.';
            document.getElementById('login_button').innerHTML = 'Sign in';
            document.getElementById('login_button').removeAttribute(`disabled`);  
        })
    }
},  
};
</script>