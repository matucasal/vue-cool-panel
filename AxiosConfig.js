
let token = document.head.querySelector('meta[name="csrf-token"]');

const axiosOptions = {
    //ojo, sin el '/' al final de la url porque la librería los agrega y no funca
    baseURL: '/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token.content,
    },
    validateStatus: function (status) {
        //si es estado 401 salgo
        if (status== 401)
            return
        return status >= 200 && status <= 503;
    },
};

export default axiosOptions;
