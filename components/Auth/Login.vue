<template>
    <div>
        <h2>Login.vue</h2>
        <form id="form_login" method="POST"  action="/login" v-on:submit.prevent="login" aria-label="Login">

            <input type="hidden" name="_token" :value="csrf_token">
            Usuario:<input type="text" name="username" v-model="username"/>
            Clave:<input type="password" name="password" v-model="password"/>

            <button class="btn btn-lg btn-primary btn-block mt-2 mb-2" type="submit">Sign in</button>
        </form>

        <button @click="logout">Logout</button>
    </div>
</template>

<script>
    //import axios from './../../axios';
    import axios from 'axios';

    export default {
        data: () => ({
            'username':  '',
            'password':    '',
        }),
        computed: {
            csrf_token() {
                let token = document.head.querySelector('meta[name="csrf-token"]');
                return token.content;
            }
        },
        methods: {
            logout(){
                console.log('supuestamente me deslogueo');
                return axios.post('/logout');
            },
            login(){
                console.log('enviando rq de login');
                const { username, password } = this;


                return axios.post('/login', { username, password } )
                    .then( function (response) {
                        if(response.status === 302) {
                            this.$router.push({ path : '/' });
                            document.getElementById('form_login').submit();
                        }

                    });
            }
        }
    }
</script>

<style scoped>

</style>