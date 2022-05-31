import axios from 'axios'; 
import store from "@/store"; 

export default (x) => {  
    let IP = `https://proguardpeercover.herokuapp.com/`;                                                               
    let header;

    switch(x) { // switch to define perfect api route

        case 'auth': // if api request is for auth 
            header = false;
        break;

        case 'marketers': // if api request is for marketers 
            header = true;
        break;

        default: // if api request is to general 
            header = true;  
    }    

    if(header){  
        return axios.create({ // dispatch api route
            baseURL: IP,
            headers: { "Authorization": store.state.user.token }  // check if it requires header or not
        }) 
    }else{
        return axios.create({ // dispatch api route
            baseURL: IP, 
        }) 
    }
    
}

