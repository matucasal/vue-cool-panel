import instance from './AxiosClient';
//import {vm} from './app';

instance.interceptors.response.use(

    response => {
        return response;
    },

    error => {

        if ( error.response.status === 401 ){
            console.log('deberías estar logueado');
            window.location.href = '/login';

            /*
            vm.$router.push( {
                name: 'login',
            });
            */
        }

        return Promise.reject( error ) ;
        /*
        else if ( error.response.status === 422 ){
            return Promise.reject( error ) ;
        }
        else {
            return Promise.resolve(response);
        }
        */
        // https://github.com/axios/axios/issues/960
        //return Promise.reject( error.response );
    }


);

export default instance;
