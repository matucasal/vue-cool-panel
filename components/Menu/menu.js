
import axios from 'axios';
import { mapGetters } from 'vuex'


export default {
   
    data: () => ({
        logo: './cmc-header-logo-desktop.png',
        //Array items que se van a mostrar el menu 
        items: [],
        //Aca voy a cargar los menu permissions
        menuPermissions: [],
        activeModules: [],
        admins: [
            ['Management', 'people_outline'],
            ['Settings', 'settings'],
          ],
          cruds: [
            ['Create', 'add'],
            ['Read', 'insert_drive_file'],
            ['Update', 'update'],
            ['Delete', 'delete'],
          ],
    }),
    props: {
        source: String,
        //acl: Array
    },
    mounted(){
        //Cuando se monta reviso el path que llega y armo el tabulado
        if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') == -1) {
            //Todavia no tengo nada en el / asi que no pongo nada
            //this.$store.commit('add_tabs', {route: '/', name: ''});
            this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
            this.$store.commit('set_active_index', this.$route.path);
        } else {
            //this.$store.commit('add_tabs', {route: '/', name: ''});
            //Todavia no tengo nada en el / asi que no pongo nada
            //this.$store.commit('set_active_index', '/');
            this.$router.push('/');
  }

    }
    //esto es para cargar el getter del store en la variable acl
    , computed: {
        ...mapGetters([
            'acl',
        ]),
        // activeModules se usa en el v-for del Menu component directamente
        /*activeModules: function() {
            var me = this;
            this.preitems = this.$router.options.routes[0].children;
            var ret = this.preitems.filter(function(item) {
                if (item.children){
                    item.children.forEach(function(item_child, key) {
                        console.log ("item child permision")
                        console.log (item_child.permission)
                        console.log ("me.acl")
                        console.log( me.acl)

                        if( (item_child.permission != "default") && (me.acl.indexOf(item_child.permission) < 0)){
                            item.children.splice(key,1);
                            console.log("Estoy en el if")
                        }
                            
                    });
                }
                return( (item.permission == "default") || (me.acl.indexOf(item.permission) > -1));
            });
            //console.log(ret);
            return ret;
        }*/
    },
    watch: {
        acl(newVal, oldVal) {
            if (typeof newVal == null || typeof newVal == undefined)
                return

            //Si no sale, quiere decir que se cambio el atributo acl -> cargo el active modules con el nuevo acl
            this.activeModules = this.loadActiveModules(this.acl)
            
        }
    },
    methods: {
        // loadMenu (local_acl){
            
        //     this.$router.options.routes.forEach(route => {
        //         //1) Este es el primer nivel:
        //         //   Solo el home y el dashboard -> no hago validacion de permisos
        //         //veo primer hijo -> son los modulos -> en esta capa seria el access
        //         if (route.children){
                    
        //             route.children.forEach( f_children_route => {
        //                 //2) Este es el segundo nivel: 
        //                 //  Aca ya empiezan los modulos que se veran en el menu
        //                 //  Son los padres, solo tendran una accion si vienen con el isModule = false,
        //                 //  sino solo sirven para mostrar el modulo

        //                 //inicio verificacion si forma parte del acl
        //                 //si el permiso no esta, salgo del for each y voy al proximo elemento
        //                 if (local_acl.indexOf(f_children_route.permission) < 0 && f_children_route.permission != 'default')
        //                     return 
                        
        //                 //  Creo el node padre que ya va formar parte del array item como elemento 
        //                 //  Le cargo la action (icon), el title (nombre que muestro) y handle (si es link) o el items vacio (si es solo padre)
        //                 let node1 = [];
        //                 node1["action"] = f_children_route.action
        //                 node1["title"] = f_children_route.title
        //                 node1["name"] = f_children_route.name
        //                 //  aca dberia ver si viene un modulo o no
        //                 if(!f_children_route.isModule){
        //                     node1["handle"] =  f_children_route.path
        //                 }else{
        //                     node1["items"] = []
        //                 }
                        
        //                 // veo segundo hijo -> son los paneles -> en esta capa es el view
        //                 if (f_children_route.children){
        //                     f_children_route.children.forEach( s_children_route => {
        //                         //3) Este es el tercer nivel (y por ahoar ultimo)
        //                         //  Estos son los componentes que se muestran en el menu
        //                         //  Tienen los links a los routes que se generan automaticante en el handle
        //                         //si el permiso no esta, salgo del for each y voy al proximo elemento
        //                         if (local_acl.indexOf(s_children_route.permission) < 0 && s_children_route.permission != 'default')
        //                             return 

        //                         //  Creo el node hijo que va formar parte del padre como item
        //                         //  Le cargo la action (icon), el title (nombre que muestro) y handle (si es link) o el items vacio (si es solo padre)
        //                         let node2 = [];
        //                         node2["action"] = s_children_route.action
        //                         node2["title"] = s_children_route.title
        //                         node2["name"] = s_children_route.name
        //                         if(!s_children_route.isModule){
        //                             node2["handle"] = s_children_route.path
        //                         }
                                    
        //                         //  Agrego al node padre, el nodo hijo como items 
        //                         node1["items"].push(node2)
        //                     })
        //                 }

        //                 //4) Finalmente cargo en el array items (el que muestra el menu) el nodo padre
        //                 this.items.push (node1)
        //             } )
        //         }
        //     })

        // },
        handle_function_redirect(function_name) {
            console.log('tengo que ir a ' + function_name)
            this.$router.push(function_name)
        },
        handle_function_call(function_name) {
            this[function_name]()
        },
/*
        borrarElementFlecha (id){
            var element = document.getElementById("myDIV");
            element.classList.remove("v-list__group__header__prepend-icon");
        },*/

        loadActiveModules: function(loadedAcl) {
            var me = this;
            this.preitems = this.$router.options.routes[0].children;
            var ret = this.preitems.filter(function(item) {
                if (item.children){
                    item.children.forEach(function(item_child, key) {
                        /*console.log ("item child permision")
                        console.log (item_child.permission)
                        console.log ("loadead.acl")
                        console.log( loadedAcl)
						*/
                        if( (item_child.permission != "default") && (loadedAcl.indexOf(item_child.permission) < 0)){
                            item.children.splice(key,1);
                            console.log("Estoy en el if")
                        }
                            
                    });
                }
                return( (item.permission == "default") || (loadedAcl.indexOf(item.permission) > -1));
            });
            //console.log(ret);
            return ret;
        }

        /*
        genIcon (icon) {
            return this.$createElement(VIcon, icon)
        },
        genAppendIcon () {
        const icon = !this.node2 ? this.appendIcon : ''

        return this.$createElement('li', {
            staticClass: 'list__group__header__append-icon'
        }, [
            this.$slots.appendIcon || this.genIcon(icon)
        ])
        },*/

    },
}