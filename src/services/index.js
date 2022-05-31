import API from './api.js';

export default { 

    //USER AUTH REST API
    DO_LOGIN(data) {
        return API('auth').post('consultant_auth', data)
    },  

    //MARKETERS REST API
    LOAD_MARKETERS() {
        return API('marketers').get('marketers')
    },

    ADD_MARKETER(data) {
        return API('marketers').post('marketers', data)
    },

    GET_MARKETER(id) {
        return API('marketers').get('marketers/'+id,)
    },

    DEL_MARKETER(username) {
        return API('marketers').delete('marketers/'+username)
    },

    UPDATE_MARKETER(data) {
        return API('marketers').put('marketers', data)
    }, 


}