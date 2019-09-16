<template>
    <div>
        <el-main>
            <!--
            Formulario de búsqueda: solo un campo nombre/apellido, en el backend se busca con ilike en cualquiera de los dos campos
             -->
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <el-form ref="form" :inline="true" :model="searchParams" label-width="200px">
                            <el-form-item label="Nombre / Apellido">
                                <el-input
                                        v-model="searchParams.nombre"
                                        placeholder="Nombre"
                                        clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Activo">
                                <el-switch
                                        v-model="searchParams.activo"
                                ></el-switch>
                            </el-form-item>
                            <el-form-item><el-button type="primary" @click="callBackend">Buscar</el-button></el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>

            <!--
            Grila de los Notificadores
             -->
            <el-row justify="true">
                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <el-table
                                border
                                highlight-current-row
                                :data="notificadores"
                                @sort-change="notificadoresChangeOrder"
                                @current-change="changeRow"
                                style="width: 100%">
                            <el-table-column
                                    label="ID"
                                    property="id"
                            ></el-table-column>
                            <el-table-column
                                    label="Apellido"
                                    property="apellido"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="Nombre"
                                    property="nombre"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="Activo"
                                    property="activo"
                                    :formatter="activoFormatter"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="Operations"
                                    width="175px">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleView(scope.$index, scope.row)">Ver</el-button>
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>

            <!--
            Paginador de notificadores
            -->
            <el-row>
                <el-col :span="24">
                    <backend-paginator
                            resource="notificador"
                            :filters="searchParams"
                            ref="paginador"
                            @new-backend-dataset="loadNotificadores"
                            :sizes="sizes"
                    ></backend-paginator>
                </el-col>
            </el-row>

            <el-divider class="container">{{ notificadorSeleccionado }}</el-divider>



            <!--
            Componente con las asignaciones del notificador

            -->
            <asignaciones :notificador="notificador_id"></asignaciones>
        </el-main>

    </div>
</template>

<script>
    import BackendPaginator from "../Common/BackendPaginator";
    import Asignaciones from "./Asignaciones";

    export default {
        name: "ListNotificador",
        components: {Asignaciones, BackendPaginator},

        data() {
            return {

                sizes: [5,10,15],

                searchParams: {
                    nombre: '',
                    apellido: '',
                    activo: true,
                },

                orderOptions: {
                    apellido: null,
                    nombre: null,
                },

                notificadores: null,

                // el notificador seleccionado
                activeRow: null,

                // el valor para pasarle a prop del compoonente de asignaciones
                notificador_id: 0,
            };
        },

        computed: {

            notificadorSeleccionado(){
                return ( this.activeRow ) ? 'Cédulas asignadas de ' + this.activeRow.apellido + ', ' + this.activeRow.nombre : '';
            },

            hayNotificadorSeleccionado(){
                return this.activeRow;
            },
        },

        mounted(){
            this.callBackend();
        },

        methods: {

            // actualiza la grilla de los notificadores con el boton de buscar
            callBackend(){
                this.$refs.paginador.getDataFromBackend();
            },

            // el paginador dispara un evento que termina cableado con este método (
            loadNotificadores( dataset ){
                this.notificadores = dataset.data;
            },

            /**
             * El cambio de orden de la grilla de Notificadores
             * */
            notificadoresChangeOrder(order ){
                console.log( order );
            },

            // changeRow de la grilla de notificadores
            changeRow( row, col ){

                this.activeRow = row;
                // cuando se cambia de pagina con el paginador row viene nulo y rompe el componente de asignaciones
                this.notificador_id = ( row ) ? row.id : 0;
            },

            // muestra sí/no en la columan de notificador.activo
            activoFormatter( row, column ){
                return ( row.activo ) ? 'Sí' : "No";
            },

            handleView( index, row ){
                console.log('handleView', index, row );
            },

            handleEdit( index, row ){
                console.log('handleEdit', index, row );
            },

        },
    }
</script>

<style scoped>

</style>
