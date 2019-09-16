import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
        user : {},
		username :'',
		acl: [],
		//Estos son los estados del tabulador
		options: [],
		activeIndex: '',
		userInfo: {}
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
        },
        auth_username(state,username){
            state.status = 'success',
			state.username = username
			//console.log('Username: ')
			//console.log(username)
		},
		auth_permissions (state,acl){
			state.status = 'success',
			state.acl = acl
			//console.log('Acl: ')
			//console.log(acl)
		},
		/*auth_permissions_activated (state){
			state.acl_activated = true
		},*/
	  	auth_success(state, token, user){
		    state.status = 'success'
		    state.token = token
			state.user = user
		},
		auth_setuser(state, userlocal){
		    state.user = userlocal
		},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
		},

		//Mutations del tab
		add_tabs (state, data) {
			this.state.options.push(data);
		},
		
		delete_tabs (state, route) {
			let index = 0;
			for (let option of state.options) {
				if (option.route === route) {
					break;
				}
				index++;
			}
			this.state.options.splice(index, 1);
		},
		
		set_active_index (state, index) {
			this.state.activeIndex = index;
		},

		
		//TODO: Que hace eso?
		save_detail_info (state, info) {
			this.state.userInfo = info;
		}
		//Fin Mutations del tab
		  
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/api/login', data: user, method: 'POST' })
	            .then(resp => {
	                /*const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
					resolve(resp)*/
					return resp.data
	            }).then(data =>{
 					const token = data.token
					const user = data.user
					//console.log(user)
					//localStorage.setItem('token', token)
					//localStorage.setItem('user', user._id)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
					commit('auth_success', token, user)
					commit('auth_setuser', user)
					
	                resolve(data)
				})
	            .catch(err => {
	                commit('auth_error')
	                //localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/api/login/signup', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
        },
        getuser({commit}){
            return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/user', method: 'GET' })
	            .then(resp => {
					const username = resp.data.username
					const acl = resp.data.acl
					
					commit('auth_username', username)
					commit('auth_permissions', acl)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                //localStorage.removeItem('token')
	                reject(err)
	            })
	        })
		},
		activateAcl ({commit}){
			//commit('auth_permissions_activated')
		},
		/*getuser({
			commit
		}) {
			axios.get('/user').then((response) => {
				const username = response.data.username
				const acl = response.data.acl
				
				commit('auth_username', username)
				commit('auth_permissions', acl)
				
				return response //resolve(response)
			})
		},*/
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
				console.log("Haciendo logout")
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
		isLoggedIn: state => !!state.user,
		user: state => {
			return state.user
		},
		authStatus: state => state.status,
		username: state => {
			return state.username
		},
		acl: state => {
			return state.acl
		}
		
	}
})