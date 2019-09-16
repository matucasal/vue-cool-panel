<template>
    <v-container fill-height fluid grid-list-xl>
        <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay>
        <div id="cedula_form"> 
            <AddCedula v-bind:cedula_id="id_item"></AddCedula>
            <v-spacer></v-spacer>
            <v-btn @click="close" class="text-xs-right">Cerrar</v-btn>
        </div>           
    </v-dialog>       
    </div>
        <v-layout justify-center wrap>
            <v-flex md12>
                <Card color="#b71c1c" title="Listado de Cedulas" text="Listado de Cedulas">
                    <v-data-table
                        :headers="headers"
                        :items="cedulas"
                        :loading="loading"
                        class="elevation-1"
                        dense
                        :rows-per-page-items="[10, 20, 30, 40]"
                        :search="search"
                    >
                        <template v-slot:items="props">
                            <td v-for="header in headers">
                                {{ props.item[header.value] }}
                            </td>
                        </template>
                        <template v-slot:footer>
                                <v-text-field
                                    v-model="search"
                                    prepend-inner-icon="search"
                                    label="Buscar"
                                    size="10"
                                    single-line
                                    class="mx-4"
                                ></v-text-field>
                        </template>
                    </v-data-table>
                </Card>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Api from './../../api/cedula';
    import AddCedula from './AddCedula.vue';
    import Card from '../material/Card';
    export default {
        components: {
            Card,
            AddCedula
            //CoreToolbar
        },
        data () {
            return {
                cedulas: [],
                totalCedulas: 0,
                loading: true,
                options: {},
                dialog:false,
                search: '',
                headers: [
                    {
                        text: 'id',
                        align: 'left',
                        sortable: false,
                        hiden: true,
                        value: 'id'
                    },
                    { text: 'Creada', value: 'created_at' },
                    { text: 'Cedula Numero', value: 'numero' },
                    { text: 'Calle', value: 'calle' },
                    { text: 'Altura', value: 'altura' },
                    { text: 'Zona', value: 'zona' },
                    { text: 'Dirigido', value: 'dirigido' },
                    { text: 'Estado', value: 'estado' },
                    { text: 'Caracter', value: 'caracter' },
                    //{ text: 'texto', value: 'texto' },
                    // { text: 'Actualizada', value: 'updated_at' },
                    // { text: 'User id', value: 'user_id' },
                    { text: '', value: 'name', sortable: false }
                ],
                id_item:null
            }
        },
        watch: {
            options: {
                handler () {
                    this.fetchCedulasCollection()
                    .then(data => {
                        this.cedulas = data.items
                        this.totalCedulas = data.total
                    })
                },
                deep: true,
            },
            dialog (val) {
                val || this.close()
            }
        },
        methods: {
            fetchCedulasCollection () {
                this.loading = true
                return new Promise((resolve, reject) => {
                console.log(Api.getCedulas())
                Api.getCedulas()
                .then( ( {data} ) => {
                    const { sortBy, descending, page, itemsPerPage } = this.options
                    if ( data ) {
                        this.cedulas = data.data 
                        let cedulas = this.cedulas
                        const total = cedulas.length
                        if (this.options.sortBy) {
                            console.log(cedulas);
                            cedulas = cedulas.sort((a, b) => {
                                const sortA = a[sortBy]
                                const sortB = b[sortBy]
                                if (descending) {
                                    if (sortA < sortB) return 1
                                    if (sortA > sortB) return -1
                                    return 0
                                } else {
                                    if (sortA < sortB) return -1
                                    if (sortA > sortB) return 1
                                    return 0
                                }
                            })
                        }
                        if (itemsPerPage > 0) {
                            cedulas = cedulas.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        }
                         setTimeout(() => {
                             this.loading = false
                             resolve({
                                 cedulas,
                                 total,
                             })
                         }, 1000)
                        //console.log(this.cedulas);
                    }
                })
                .catch( error => {
                    console.error( 'shit, api.getcedulas falló' );
                    console.error( "el toString del error: " + error.toString() );
                    console.log( error );
                    console.error( 'despues de error.toString()' );
                }); 
                });
               // alert ('load');
            },
           
            editItem (item) {
                /*this.editedIndex = this.cedulas.indexOf(item)
                this.editedItem = Object.assign({}, item) */
                this.id_item = item;
                this.dialog = true;
                //alert(item)
            },

            deleteItem (item) {
                Api.deleteCedula(item)
                .then( ( {data} ) => { 
                        if ( data ) {
                            this.fetchCedulasCollection();
                            console.log ( 'Api.deleteCedula' );

                        } 
                })
                .catch( error=> {
                        console.error( 'shit, api.deletcedula falló' );
                        console.error( "el toString del error: " + error.toString() );
                        console.log( error );
                        console.error( 'despues de error.toString()' );
                });

                alert(item);
                //   confirm('¿Desea eliminar la Cedula?') && this.cedulas.splice(index, 1)
            },

            


            close () {
                this.id_item=null;
                this.dialog = false
                /* setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                }, 300) */
            },
            save () {
                /* if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                this.desserts.push(this.editedItem)
                } */
                this.close()
            },
            
        },
        created() {
            /*Api.getCedulas()
                .then( ( {data} ) => {
                    if ( data ) {
                        console.log( 'Api.getCedulas' );
                        console.log(data);
                    }
                })
                .catch( error => {

                    console.error( 'shit, api.getcedulas falló' );
                    console.error( "el toString del error: " + error.toString() );
                    console.log( error );
                    console.error( 'despues de error.toString()' );
                })
            ;*/
        },
        mounted() {
            this.fetchCedulasCollection()
        //     .then(data => {
        //         this.cedulas = data.data
        //         this.totalCedulas = data.total
        //     })
         }
    }
</script>

<style lang="scss">
    #cedula_form{
        background-color: white;
    }
    app-drawer {
        .v-list__tile {
            border-radius: 4px;
            &--buy {
                margin-top: auto;
                margin-bottom: 17px;
            }
        }
        .v-image__image--contain {
            top: 9px;
            height: 60%;
        }
        .search-input {
            margin-bottom: 30px !important;
            padding-left: 15px;
            padding-right: 15px;
        }
        div.v-responsive.v-image > div.v-responsive__content {
            overflow-y: auto;
        }
    }
</style>