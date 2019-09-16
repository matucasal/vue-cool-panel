<template>
    <div>
        <p>Home.vue</p>
        <div>{{ usuario }}</div>
        <button @click="logout">Logout</button>
    </div>

</template>

<script>
    import axios from 'axios';
    import api from './../axios';
    import cedula from './../api/cedula';
    export default {
        data: () => ({
            'usuario':{}
        }),
        mounted() {
            this.getUser();
        },
        methods: {
            getUser(){

                /*
                cedula.getUser()
                    .then( response => {
                        console.log( response );
                        this.usuario = response.data;
                    })
                ;
                */
                api.get('/user')
                    .then( response => {
                        console.log( response );
                        this.usuario = response.data;
                    })
                ;

            },
            logout(){
                console.log('supuestamente me deslogueo');
                return axios.post('/logout');
            },
        }
    }
</script>