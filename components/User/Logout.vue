<template>
    <div>
        <p>Cerrando sesion</p>
        
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        data: () => ({
            'usuario':{}
        }),
        mounted() {
            this.logout();
        },
        methods: {
            
            logout(){
                console.log('supuestamente me deslogueo');
                return axios.post('/logout').then( response => {
                //this.$router.push('/')
                window.location.href = '/login';

                });

            },
        
        }
    }
</script>