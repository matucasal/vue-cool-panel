import axios from 'axios';
import options from './AxiosConfig';

const axiosClient = axios.create(
    options
);


export default axiosClient;