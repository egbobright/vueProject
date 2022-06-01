<template>
  <div>
    <button class="btn btn-default btn-icon btn-sm mr-2" @click="LOAD_MARKETER()" data-toggle="modal" :data-target="`#modal-edit`+mid">
      <i class="fa fa-eye"></i>
    </button> 

    <div class="modal fade" :id="`modal-edit`+mid" data-backdrop="static" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{{username}}</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
 
              <div v-if="!editPane && !CHECK_IF_EMPTY(marketer) ">  
                <div class="text-left">  
                    <dl> 
 
                        <ul class="list-group list-group-unbordered mb-3">
                          <li class="list-group-item">
                            <b>Username</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.username)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Fullname</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.firstname + ' ' + marketer.lastname)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Email</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.email)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Phone</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.phonenumber)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Created on</b> <span class="float-right text-muted">{{READABLE_DATE(marketer.date_created)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Account number</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.account_number)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Account name</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.account_name)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Address</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.address)}}</span>
                          </li>
                          <li class="list-group-item">
                            <b>Added by</b> <span class="float-right text-muted">{{CAPITALIZE_STR(marketer.added_by)}}</span>
                          </li> 
                        </ul>  
 
                    </dl> 

                </div> 
            </div>



                <div class="row" v-if="editPane">


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
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter phone" v-model="phonenumber">
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  </div>

                  <div class="col-md-12">
                  <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Enter address" v-model="address">
                  </div>
                  </div> 

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Bank name</label>
                    <input type="text" class="form-control" placeholder="Enter bank" v-model="bankname">
                  </div>
                  </div> 

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Bank code</label>
                    <input type="text" class="form-control" placeholder="Enter bank" v-model="bankcode">
                  </div>
                  </div> 

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Account number</label>
                    <input type="text" class="form-control" placeholder="Enter bank" v-model="accountNumber">
                  </div>
                  </div> 

                  <div class="col-md-6">
                  <div class="form-group">
                    <label>Account Name</label>
                    <input type="text" class="form-control" placeholder="Enter address" v-model="accountName">
                  </div>
                  </div> 
 

                  <div class="col-md-12">
                    <span v-if="!onSuccess" class="text-danger text-sm" id="msg">{{resMsg}}</span>
                    <span v-else class="text-success">{{resMsg}}</span>
                  </div>

                </div>


            </div> 
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default btn-sm" @click="marketer = null;" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary btn-sm" v-if="!editPane" @click="editPane = true">Update marketer</button>
              <div class="d-flex justify-content-end" v-if="editPane">
                <button type="button" class="btn btn-danger btn-sm mr-2" @click="editPane = false">close form</button>
                <button type="button" id="submit_button" class="btn btn-primary btn-sm" @click="DO_VALIDATE()">Update marketer</button>
              </div>
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
import {CHECK_IF_EMPTY, CAPITALIZE_STR, READABLE_DATE, CHECK_EMAIL_PATTERN} from "@/utils/";  
export default {
  name: "view",
  props: ["mid"],
  data() {
      return{  
        marketer: null,
        username: null,
        email: null,
        firstname: null,
        lastname: null,
        address: null,
        gender: null, 
        phonenumber: null,
        marketing_consultant_id: null,
        bankname: null,
        bankcode: null,
        accountNumber: null,
        accountName: null,
        onSuccess: null,
        resMsg: '',  
        editPane: false,
        CHECK_IF_EMPTY, CAPITALIZE_STR, READABLE_DATE, CHECK_EMAIL_PATTERN

      }
  },

  methods: { 

    DO_VALIDATE: function(){ 
      this.resMsg = '';

      if(CHECK_IF_EMPTY(this.email)) this.resMsg = ' Email field cannot be empty...'; 
      else if(!CHECK_EMAIL_PATTERN(this.email)) this.resMsg = ' Ensure no email address is valid.'; 
      else if(
        CHECK_IF_EMPTY(this.username)  
        || CHECK_IF_EMPTY(this.firstname) 
        || CHECK_IF_EMPTY(this.lastname) 
        || CHECK_IF_EMPTY(this.address) 
        || CHECK_IF_EMPTY(this.gender) 
        || CHECK_IF_EMPTY(this.phonenumber) 
        || CHECK_IF_EMPTY(this.marketing_consultant_id) 
        || CHECK_IF_EMPTY(this.bankname) 
        || CHECK_IF_EMPTY(this.bankcode) 
        || CHECK_IF_EMPTY(this.accountNumber) 
        || CHECK_IF_EMPTY(this.accountName)
      ){
        this.resMsg = ' Ensure no field is not empty..';  
      }
      else {
        document.getElementById('submit_button').innerHTML = 'Processing...'; // loading text. 
        document.getElementById('submit_button').setAttribute(`disabled`, true); // disable login button.
        this.DO_SUBMISSION(); 
      }  
    }, 
    
    LOAD_MARKETER: function(){ 
      apiServices.GET_MARKETER(this.mid)
      .then(result =>{ // SERVER RESPONSE

        console.log(result.data.marketer[0])
 
          if(result.status === 200){  // If request failed 
            this.marketer = result.data.marketer[0];
            this.username= result.data.marketer[0].username;
            this.email= result.data.marketer[0].email;
            this.firstname= result.data.marketer[0].firstname;
            this.lastname= result.data.marketer[0].lastname;
            this.address= result.data.marketer[0].address;
            this.gender=  CAPITALIZE_STR(result.data.marketer[0].gender); 
            this.phonenumber= result.data.marketer[0].phonenumber;
            this.marketing_consultant_id= result.data.marketer[0].marketing_consultant_id;
            this.bankname= result.data.marketer[0].bankname;
            this.bankcode= result.data.marketer[0].bankcode;
            this.accountNumber= result.data.marketer[0].account_number;
            this.accountName= result.data.marketer[0].account_name;  
          }
          else{ // if success
            this.onSuccess = true; 
            this.resMsg = 'Loading marketer was unsuccessful.'; 
          }  
      })
      .catch(err => {
          console.log(err.message) 
          this.onSuccess = false;
          this.resMsg = 'an internal server error occured.'; 
      })
    },
    
    DO_SUBMISSION: function(){  
      let data = {
        "username": this.username,
        "email": this.email,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "address": this.address,
        "gender": this.gender, 
        "phonenumber": this.phonenumber,
        "marketingConsultantId": this.marketing_consultant_id,
        "bankname": this.bankname,
        "bankcode": this.bankcode,
        "accountNumber": this.accountNumber,
        "accountName": this.accountName,
      } // request body. 
      apiServices.UPDATE_MARKETER(data)
      .then(result =>{ // SERVER RESPONSE 

          document.getElementById('submit_button').removeAttribute(`disabled`); // enable login button 
          document.getElementById('submit_button').innerHTML = 'Update marketer'; 

          if(!result.data.status === 200){  // If request failed
            this.onSuccess = false;
            this.resMsg = result.data.message;
            document.getElementById('submit_button').innerHTML = 'Update marketer'; 
          }
          else{ // if success
            this.onSuccess = true; 
            this.resMsg = 'Marketer Updated successfully.';
            setTimeout(() => location.reload(true), 500)
              
          }  
      })
      .catch(err => {
          console.log(err.message) 
          this.onSuccess = false;
          this.resMsg = 'an internal server error occured.';
          document.getElementById('submit_button').innerHTML = 'Update marketer';
          document.getElementById('submit_button').removeAttribute(`disabled`);  
      })
    }

  }, 
  mounted() {   
  } 
};
</script>