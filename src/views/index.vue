<template>
  <div>
  <div class="wrapper" style="min-height: 100vh;"> 

    <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper pt-5">
   
    <!-- Main content -->
    <div class="content">
      <div class="container">

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">List of available marketers</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 250px;">
                    <input type="text" v-model="search_keyword" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="button" @click="SEARCH_MKTRS()" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                      <button type="button" @click="RELOAD()" class="btn btn-default">
                        <i class="fa fa-history"></i>
                      </button>
                      <addModal /> 
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table text-nowrap">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Username</th>
                      <th>Full name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Date created</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="!CHECK_IF_EMPTY(marketers)">
                    <tr v-for="(mk, i) in marketers" :key="i">
                      <td>{{i+1}}</td>
                      <td>{{CAPITALIZE_STR(mk.username)}}</td>
                      <td>{{CAPITALIZE_STR(mk.firstname + ' ' + mk.lastname)}}</td>
                      <td>{{mk.phonenumber}}</td>
                      <td>{{mk.email}}</td>
                      <td><span class="badge" :class="mk.is_active === 1 ? `badge-success` : `tag-danger`">{{mk.is_active === 1 ? `active` : `inactive`}}</span></td>
                      <td>{{READABLE_DATE(mk.date_created)}}</td>
                      <td class="d-flex justify-content-end text-right">
                        <viewModal :mid="mk.marketing_consultant_id" />
                        <delModal :username="mk.username" />
                      </td>
                    </tr> 
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>


<script>
// @ is an alias to /src 
import addModal from "@/components/add.vue"; // add marketer modal component
import viewModal from "@/components/view.vue"; // view marketer modal component
import delModal from "@/components/delete.vue"; // delete marketer modal component
import apiServices from "@/services"; // server route services
import {TRUNCATE_STRING, CAPITALIZE_STR, READABLE_DATE, CHECK_IF_EMPTY, SEARCH_ARR} from "@/utils/"; // import custom reusable js functions

export default {
name: "Dashboard",
data() {
    return{     
        marketers: [], 
        marketer: null, 
        TRUNCATE_STRING, 
        CAPITALIZE_STR,
        READABLE_DATE,
        CHECK_IF_EMPTY, 
        SEARCH_ARR, 
        filterEntries: false,
        filtered_arr: null,
        search_keyword: '',
        fmarketers: null,
    }
},
components: {
    addModal, 
    viewModal, 
    delModal
},  
methods: {    

    
    SEARCH_MKTRS: function(){ // Function to search marketers 
      this.marketers = SEARCH_ARR(this.marketers, this.search_keyword.toUpperCase())  
    },

    LOAD_MARKETERS: function(){ // FETCH ALL MARKETRS FROM SERVER 
        this.retry = ''
        apiServices.LOAD_MARKETERS()
        .then(result =>{  
          if (result.status === 200) this.marketers = result.data.marketers; 
        })
        .catch(err => {
            console.log(err) 
        })
    },  

    RELOAD: function(){ 
      this.LOAD_MARKETERS() // FUNCTION TO RELOAD MARKETERS
    } 
}, 
mounted() {
  this.LOAD_MARKETERS(); // ON PAGE LOAD, TRIGGER ALL MARKETERS.
} 

};
</script>
 