import VueRouter from 'vue-router';
import Vue from 'vue';

import Dashboard from './components/Dashboard';
import ListaCedulas from './components/Cedula/ListaCedulas';
import GridCedulas from './components/Cedula/GridCedulas';
import AddCedula from './components/Cedula/AddCedula';
import ViewCedula from './components/Cedula/ViewCedula';
import Cedula from './components/Cedula/Cedula';

import Logout from './components/User/Logout';

import UsuariosPermisos from './components/Permissions/UsuariosPermisos';
import Roles from './components/Permissions/Roles';
import Permisos from './components/Permissions/Permisos';

import Zona from './components/Zona/Zona';
import GridZona from './components/Zona/GridZona';
import AddZona from './components/Zona/AddZona';

import Notificadores from './components/Notificador/ListNotificador';
import ViewNotificador from "./components/Notificador/ViewNotificador";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            alias: '/home',
            component: Dashboard,
            children: [
            {
                name: 'Cedula',
                path: '/cedula',
                title: 'Cedulas',
                permission: 'default',
                action: 'local_activity',
                //si es modulo quiere decir que tiene hijos, si no es modulo es un link o panel directo
                isModule: true,
                components: {
                    content: Cedula
                },
                children: [

                    {
                        name: 'Listado Cedulas',
                        path: '/list-cedulas',

                        title: 'Listado Cedulas',

                        permission: 'default',
                        action: 'list',
                        isModule: false,
                        components:{
                            content: GridCedulas
                        }
                    },
                    {
                        name: 'Alta Cedulas',
                        path: '/add-cedulas',
                        title: 'Alta De Cedulas',
                        action:'library_add',
                        //action:'my_library_add',
                        //action:'note_add',
                        //action:'post_add',
                        //action:'add',
                        //action:'add_box',
                        //action:'add_circle',
                        //action:'add_circle_outline',
                        permission: 'default',
                        //permission: 'add.cedula',
                        isModule: false,
                        components: {
                           content: AddCedula
                        }
                    },
                    {
                        name: 'Ver Cedula',
                        path: '/cedula/:id',
                        title: 'Ver cedula',
                        isModule: false,
                        components: {
                           content: ViewCedula
                        }
                    },
                    

                ]
            },
            {
                name: 'Notificador',
                path: '/notificador',
                title: 'Notificadores',
                permission: 'default',
                action: 'local_activity',
                //si es modulo quiere decir que tiene hijos, si no es modulo es un link o panel directo
                isModule: false,
                components: {
                    content: ViewNotificador,
                },
            },
                {
                name: 'Permisos',
                path: '/permisos',
                title: 'Permisos',
                permission: 'default',
                action: 'settings',
                //si es modulo quiere decir que tiene hijos, si no es modulo es un link o panel directo
                isModule: true,
                components: {
                    content: Permisos
                },
                children: [
                    {
                        name: 'Roles',
                        path: '/roles',
                        title: 'Roles',
                        permission: 'default',
                        action: 'assignment_ind',
                        isModule: false,
                        components:{
                            content: Roles
                        }
                    },
                    {
                        name: 'UsuariosPermisos',
                        path: '/usuarios-permisos',
                        title: 'Permisos por usuario',
                        action: 'how_to_reg',
                        permission: 'default',
                        isModule: false,
                        components:{
                            content: UsuariosPermisos
                        }
                    }

                ]
            },

            {
                name: 'Zonas',
                path: '/zonas',
                title: 'Zonas',
                permission: 'default',
                action: 'settings',
                //si es modulo quiere decir que tiene hijos, si no es modulo es un link o panel directo
                isModule: true,
                components: {
                    content: Zona
                },
                children: [
                    {
                        name: 'Listado de zonas',
                        path: '/lista',
                        title: 'Listado de zonas',
                        permission: 'default',
                        action: 'list',
                        isModule: false,
                        components:{
                            content: GridZona
                        }
                    },
                    {
                        name: 'Alta de zona',
                        path: '/alta',
                        title: 'Alta de zona',
                        permission: 'default',
                        action: 'library_add',
                        isModule: false,
                        components:{
                            content: AddZona
                        }
                    }


                ]
            }
            ,
            {
                name: 'Logout',
                path: '/logout',
                title: 'Cerrar sesion',
                permission: 'default',
                action: 'exit_to_app',
                //si es modulo quiere decir que tiene hijos, si no es modulo es un link o panel directo
                isModule: false,
                components: {
                    content: Logout
                }
            }
            ]
        }
    ],
});

export default router
