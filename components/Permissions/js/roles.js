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
        roles: [],

        //chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        chips: [],
        items: [],
        original_chips: [],
        currentRoleId: null,
        
      }
    },
    mounted() {
        //apenas entro al modulo cargo los roles
        this.fetchRolesCollection()
        //obtengo todos los permisos
        this.fetchPermisosCollection()
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
                    Api.addPermissionToRole(this.currentRoleId,valInsertedId)
                    
                }
            }
        },
    }

    ,methods: {
        remove (item) {
            //aca tengo que borrar el elemento
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
            let valDeletedId = item.id
            console.log('deleted: '+ valDeletedId)
            //aca tengo que hacer el delete por axios del valDeletedId
            Api.deletePermissionFromRole(this.currentRoleId,valDeletedId)
        },

        fetchRolesCollection () {
            Api.getRoles()
            .then( ( {data} ) => {
                if ( data ) {
                    console.log( 'Api.getRoles' );
                    this.roles = data.data
                }
            })
            .catch( error => {
                console.error( 'shit, api.getroles falló' );
                console.error( "el toString del error: " + error.toString() );
                console.log( error );
                console.error( 'despues de error.toString()' );
            });
        },
        getPermisosPorRole(){
            //dejo vacias las variables 
            this.original_chips = []
            this.currentRoleId  = null

            this.currentRoleId = this.model.id
            this.chips = this.model.permissions
            //uso este array local para ver si se esta haciendo un cambio en el original o solo se iniciando
            this.original_chips = this.chips
            
        },
        fetchPermisosCollection(){
            Api.getPermisos().then( ( {data} ) => {
                if ( data ) {
                    console.log( 'Api.getPermisos' );
                    //this.roles = data.data
                    //permisos ->
                    this.items = data.data
                }
            })
            .catch( error => {
                console.error( 'shit, api.getpermisos falló' );
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