import options from './AxiosConfig';
import axios from 'axios';
const qs = require('qs');

// para los get de los endpoints que vienen paginados necesito
// esta funcion para que los filtros del QueryBuilder de spatie lleguen bien como un array

options.paramsSerializer =  function( params ) {
    return qs.stringify( params, {arrayFormat: 'repeat'} );
};

const axiosClient = axios.create(
    options
);


export default axiosClient;