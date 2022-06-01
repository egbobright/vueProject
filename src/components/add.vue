<template>
  <div>
    <button class="btn btn-info btn-icon btn-sm ml-2" data-toggle="modal" data-target="#modal-add">
      <i class="fa fa-plus"></i>
    </button> 

    <div class="modal fade" id="modal-add" data-backdrop="static" aria-modal="true" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Marketer</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">



                <div class="row">

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>First name</label>
                    <input type="text" class="form-control" placeholder="Enter first name" v-model="firstname">
                  </div>
                  </div>

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Last name</label>
                    <input type="text" class="form-control" placeholder="Enter last name" v-model="lastname">
                  </div>
                  </div>

                  <div class="col-md-7">
                  <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" placeholder="Enter username" v-model="username">
                  </div>
                  </div>

                  <div class="col-md-5">
                  <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter phone" v-model="phone">
                  </div>
                  </div>

                  <div class="col-md-8">
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" placeholder="Enter text" v-model="email">
                  </div>
                  </div>

                  <div class="col-md-4">
                  <div class="form-group">
                    <label>Gender</label>
                    <select class="form-control" v-model="gender">
                      <option>male</option>
                      <option>female</option>
                    </select>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Enter address" v-model="address">
                  </div>
                  </div> 


                  <div class="col-md-12">
                    <span v-if="!onSuccess" class="text-danger text-sm" id="msg">{{resMsg}}</span>
                    <span v-else class="text-success">{{resMsg}}</span>
                  </div>

                </div>


            </div> 
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
              <button type="button" id="submit_button" class="btn btn-primary btn-sm" @click="DO_VALIDATE()">Save marketer</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

    
  </div>
</template>

<script>
import apiServices from "@/services"; 
import {CHECK_IF_EMPTY, CHECK_EMAIL_PATTERN} from "@/utils/";  
export default {
  name: "add", 
  data() {
      return{    
        username: null,
        email: null,
        firstname: null,
        lastName: null,
        address: null,
        gender: null, 
        phone: null,
        onSuccess: null,
        resMsg: '',  
        CHECK_IF_EMPTY, CHECK_EMAIL_PATTERN
      }
  },

  methods: { 

    DO_VALIDATE: function(){ 
      this.resMsg = '';
      if(CHECK_IF_EMPTY(this.email)) this.resMsg = ' Email field cannot be empty...'; 
      else if(!CHECK_EMAIL_PATTERN(this.email)) this.resMsg = ' Ensure email address is valid.'; 
      else if(CHECK_IF_EMPTY(this.username) || CHECK_IF_EMPTY(this.email) || CHECK_IF_EMPTY(this.firstname) || CHECK_IF_EMPTY(this.lastname) || CHECK_IF_EMPTY(this.address) || CHECK_IF_EMPTY(this.gender) || CHECK_IF_EMPTY(this.phone)){
        this.resMsg = ' Ensure no field is not empty..';
      } 
      else {
        this.DO_SUBMISSION(); 
        document.getElementById('submit_button').innerHTML = 'Processing...'; // loading text. 
        document.getElementById('submit_button').setAttribute(`disabled`, true); // disable login button.
      }
    }, 
    DO_SUBMISSION: function(){ 
      
      let data = {
        'username': this.username, 
        'email': this.email, 
        'firstname': this.firstname, 
        'lastname': this.lastname, 
        'address': this.address, 
        'gender': this.gender,
        'phonenumber': this.phone, 
        'addedBy': 'admin'
      } // request body. 
      
    apiServices.ADD_MARKETER(data)
        .then(result =>{ // SERVER RESPONSE 

            document.getElementById('submit_button').removeAttribute(`disabled`); // enable login button 
            document.getElementById('submit_button').innerHTML = 'Save marketer'; 

            if(!result.data.status === 200){  // If request failed
              this.onSuccess = false;
              this.resMsg = result.data.message;
              document.getElementById('submit_button').innerHTML = 'Save marketer'; 
            }
            else{ // if success
              this.onSuccess = true; 
              this.resMsg = 'Marketer added successfully.'; 
              this.username = null;
              this.email = null;
              this.firstname = null;
              this.lastName = null;
              this.address = null;
              this.gender = null; 
              this.phone = null; 
              setTimeout(() => location.reload(true), 500)  
            }  
        })
        .catch(err => {
            console.log(err.message) 
            this.onSuccess = false;
            this.resMsg = 'an internal server error occured.';
            document.getElementById('submit_button').innerHTML = 'Save marketer';
            document.getElementById('submit_button').removeAttribute(`disabled`);  
        })
    }

  }
};
</script>
 