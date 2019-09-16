import axios from './../axios';

export default {
    getCedula:  function(cedula_id){
        //console.log('trae cedula:'+data); //data tiene el id de la cedula a editar
        return axios.get('cedula/'+cedula_id);
    },

    deleteCedula:  function(cedula_id){
        //console.log('trae cedula:'+data); //data tiene el id de la cedula a editar
        return axios.delete('cedula/'+cedula_id);
    },

    getCedulas: function () {
     
        return axios.get('cedula');
    },

    postCedulas: function(data) {
        return axios.post('cedula',data);
    },
    getUser: function () {
        return axios.get('user');
    }
}
