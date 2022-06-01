<template>
  <div>
    <button class="btn btn-danger btn-icon btn-sm mr-3" data-toggle="modal" :data-target="`#modal-delete`+username">
      <i class="fa fa-trash"></i>
    </button> 

    <div class="modal fade" :id="`modal-delete`+username" data-backdrop="static" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-sm">
          <div class="modal-content pt-4"> 
              <h4 class="text-center">Delete Marketer</h4> 
            <div class="modal-body d-flex justify-content-between">    
              <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">No</button>
              <button type="button" id="del_button" class="btn btn-danger btn-lg" @click="DO_DEL()">Yes</button> 
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
import {CHECK_IF_EMPTY} from "@/utils/";  
export default {
  name: "Delete", 
  props: ["username"],
  data() {
      return{  
        onSuccess: null,
        resMsg: '',  
        CHECK_IF_EMPTY,
      }
  },

  methods: { 
 
    DO_DEL: function(){ 

        document.getElementById('del_button').innerHTML = 'Processing...'; // loading text. 
        document.getElementById('del_button').setAttribute(`disabled`, true); // disable login button. 
       
    apiServices.DEL_MARKETER(this.username)
        .then(result =>{ // SERVER RESPONSE
 
          // console.log(ds.token) 

            if(!result.data.status === 200){  // If request failed
              this.onSuccess = false;
              this.resMsg = result.data.message;
              document.getElementById('del_button').innerHTML = 'Yes'; 
            }
            else{ // if succ
              this.onSuccess = true; 
              this.resMsg = 'Deleting marketer was successfully.';  
              setTimeout(() => location.reload(true), 500)
            }  
        })
        .catch(err => {
            console.log(err.message) 
            this.onSuccess = false;
            this.resMsg = 'an internal server error occured.';
            document.getElementById('del_button').innerHTML = 'Yes';
            document.getElementById('del_button').removeAttribute(`disabled`);  
        })
    }

  }
};
</script>
