import Api from './../../../api/permissions';
import Card from './../../material/Card';

export default {
    components: {
        Card
      },
    data () {
      return {
        isEditing: true,
        model: null,
        //Estos son los roles que se van a cargar x axios
        usuarios: [],
        chips: [],
        items: [],
        original_chips: [],
        currentUserId: null,
        isLoading: false,
        search: null,
     
      }
    },
    mounted() {
        //por ahora no hago nada en mounted
        //apenas entro al modulo cargo los usuarios
        //this.fetchUsuariosCollection()
        //obtengo todos los roles
        //this.fetchRolesCollection()
    },

    
    watch: {
        chips: function(newVal, oldVal){
            //Verifico si el nuevo valor es distinto al original
            //SI es distinto significa que se hizo una modificacion en el array, ahi si comparar
            //si el nuevo valor > al viejo
            if (this.original_chips != newVal){
                //si el new es mayor al old ver si hay insert
                if (newVal.length > oldVal.length){
                    //aca hago la comparacion de los 2 arrays para ver cual es diferente
                    let dif1 = newVal.diff( oldVal );  
                    let valInsertedId = dif1[0].id
                    console.log('inserted: ' + valInsertedId)
                    //aca tengo que hacer el insert por axios del valInsertedId
                    Api.addRoleToUser(this.currentUserId,valInsertedId)
                    
                }
            }
        },
        
        // se actualiza cuando busco
        search (val) {
            
            // Items have already been requested
            //if (this.isLoading) return

            //El val es muy corto
            if (val.length < 3) return
    
            this.isLoading = true
    
            console.log(val)
            console.log(val)

            Api.getUsersRoles(val)
            .then( ( {data} ) => {
                if ( data ) {
                    console.log( 'Api.getUsuarios' );
                    this.usuarios = data.data
                }
            })
            .catch( error => {
                console.error( 'shit, api.getuserroles falló' );
                console.error( "el toString del error: " + error.toString() );
                console.log( error );
                console.error( 'despues de error.toString()' );
            }).finally(() => (this.isLoading = false));

        
        }
        


    }

    ,methods: {
        
        remove (item) {
            //aca tengo que borrar el elemento
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
            let valDeletedId = item.id
            console.log('deleted: '+ valDeletedId)
            //aca tengo que hacer el delete por axios del valDeletedId
            Api.deleteRoleFromUser(this.currentUserId,valDeletedId)
        },

        //Este no lo estoy usuando por ahora, pero lo guardo
        fetchUsuariosCollection () {
            Api.getUsersRoles()
            .then( ( {data} ) => {
                if ( data ) {
                    console.log( 'Api.getUsuarios' );
                    this.usuarios = data.data
                }
            })
            .catch( error => {
                console.error( 'shit, api.getroles falló' );
                console.error( "el toString del error: " + error.toString() );
                console.log( error );
                console.error( 'despues de error.toString()' );
            });
        },


        //trae todos los roles segun el usuario
        getRolesPorUsuario(){
            
            //Cargo los roles una vez que se cargue el usuario
            this.fetchRolesCollection()

            //dejo vacias las variables 
            this.original_chips = []
            this.currentUserId  = null

            this.currentUserId = this.model.id
            this.chips = this.model.roles
            //uso este array local para ver si se esta haciendo un cambio en el original o solo se iniciando
            this.original_chips = this.chips
            
        },

        //trae todos los roles de la bd
        fetchRolesCollection(){
            Api.getRoles().then( ( {data} ) => {
                if ( data ) {
                    console.log( 'Api.getRoles' );
                    //this.roles = data.data
                    //permisos ->
                    this.items = data.data
                }
            })
            .catch( error => {
                console.error( 'shit, api.getroles falló' );
                console.error( "el toString del error: " + error.toString() );
                console.log( error );
                console.error( 'despues de error.toString()' );
            });
        },

      }
  }


//Esto me compara los dos arrays old value vs new value 
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};