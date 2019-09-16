<template>
    <div>
        <!--
        Formulario de opciones de visualización de cedulas asignadas
        -->
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" >
                    <el-form-item label="Estado de cédulas">
                        <el-radio-group
                            v-model="asignacionesOptions.estado"
                            :disabled="!hayNotificadorSeleccionado"
                            @change="cambiarFiltroAsignaciones"
                        >
                            <el-radio-button label="pendientes">Pendientes</el-radio-button>
                            <el-radio-button label="todas">Todas</el-radio-button>
                            <el-radio-button label="diligenciadas">Diligenciadas</el-radio-button>
                            <el-radio-button label="extraviadas">Extraviadas</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--
        Dropdown con las posibles acciones que pueden realizarse sobre la lista de cédulas
        -->
        <el-row>
            <el-col :span="12">
                <el-dropdown
                    split-button
                    @command="executeBulkAction"
                    type="primary">Acciones sobre cédulas
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="item in transitionsMap"
                            :key="item.accion"
                            :command="item.accion"
                            :disabled="!posibleTransitions.includes(item.accion)"
                        >{{ item.descripcion }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table
                    border
                    highlight-current-row
                    :data="asignaciones"
                    style="width: 100%"
                    @selection-change="handleSelectionOfCedulas"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="Número"
                        property="cedula_numero"
                    ></el-table-column>
                    <el-table-column
                        label="Carátula"
                        property="cedula_caratula"
                    ></el-table-column>
                    <el-table-column
                        label="Dirigido"
                        property="cedula_dirigido"
                    ></el-table-column>
                    <el-table-column
                        label="Fecha asignación"
                        property="fecha_asignacion"
                        :formatter="fechaAsignacionFormatter"
                    ></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!--
        Paginador de las cédulas asignadas
        -->
        <el-row>
            <el-pagination
                background
                layout="sizes, prev, pager, next"
                :page-sizes="[10,20,30]"
                :page-size.sync="asignacionesPager.pageSize"
                :total="asignacionesPager.total"
                :current-page.sync="asignacionesPager.currentPage"
                @current-change="asignacionesPageChange"
                @size-change="asignacionesSizeChange"
            ></el-pagination>
        </el-row>

        <!--
        Modal para solicitar información extra al hacer alguna operacion
        -->
        <el-dialog
            @open="whenDialogFormOpens"
            :title="dialogForm.title"
            :rules="dialogForm.rules"
            width="450px"
            :visible.sync="dialogForm.visible"
        >
            <el-form :model="dialogForm.data" label-width="175px" ref="modalForm">

                <!-- lista de notificadores para reasignar las cédulas -->
                <el-form-item
                    v-if="dialogForm.visibleFields.includes('notificador_id')"
                    :rules="[{ required: true, message: 'Seleccionad Notificador', trigger:'blur' }]"
                    prop="notificador_id"
                    label="Nuevo notificador">
                    <el-select v-model="dialogForm.data.notificador_id" filterable auto-complete value="">
                        <el-option
                            v-for="item in dialogForm.notificadores"
                            :key="item.id"
                            :label="item.apellido + ', ' + item.nombre" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <!-- Fecha diligenciamiento -->
                <el-form-item
                    v-if="dialogForm.visibleFields.includes('fecha_diligenciamiento')"
                    :rules="[{ required: true, message: 'Especifique la fecha de diligenciamiento', trigger: 'blur' }]"
                    prop="fecha_diligenciamiento"
                    label="Fecha diligenciamiento">
                    <el-date-picker
                        v-model="dialogForm.data.fecha_diligenciamiento"
                        type="date"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="Seleccione la fecha">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForm.visible = false">Cancelar</el-button>
                <el-button type="primary" @click="confirmModalForm('modalForm')">Confirmar</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Notificador from "../../models/Notificador";
    import Support from "../../utils/support";
    import CedulaActions from "../../models/CedulaActions";

    export default {
        name: "Asignaciones",

        props: {
            notificador: {
                type: Number,
                required: true,
                default: 0,
            },
        },

        watch: {
            notificador: function( newVal, oldVal ){
                this.refreshAsignaciones();
            },
        },

        data() {
            return {

                // los filtros para las cedulas asignadas
                asignacionesOptions: {
                    estado: 'pendientes',
                },

                asignacionesPager: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0,
                },

                asignaciones: null,

                // todas las transiciones definidas en la api
                transitions: null,

                selectedCedulas: null,

                dialogForm: {

                    selectedCommand: '',
                    visible: false,
                    title: 'Complete la información',
                    visibleFields:[],
                    notificadores: null,
                    wasConfirmed: false,

                    data: {
                        notificador_id: null,
                        fecha_diligenciamiento: null,
                        observacion: '',
                    },
                },
            };
        },

        computed: {

            hayNotificadorSeleccionado(){
                return !!(this.notificador);
            },

            transitionsMap(){

                // solo muestro algunas de las posibles acciones, solo las que tienen sentido
                // para la devolucion de los notificadores
                // chequear que las posibles transiciones que se puedan hacer segun las reglas del
                // backend no queden excluidas
                if ( ! this.transitions )
                    return [];

                let only = ['reasignar','diligenciar','extraviar'];
                let transitions = this.transitions;
                let filtrado = only.map( value => {
                    return transitions.find( data => data.accion === value );
                });

                return filtrado;
            },

            // las transiciones posibles de las cédulas en la grilla de asignadas
            posibleTransitions(){

                if ( ! this.asignaciones )
                    return [];

                let transitions = new Set();
                // uso un set así me aseguro la unicidad de los elementos
                this.asignaciones.forEach( row => {
                    row.actions.forEach( action => {
                        transitions.add( action );
                    });
                });

                return Array.from( transitions );
            },
        },

        created() {
            let me = this;
            let support = new Support();

            support.transitions().then( response => {
                me.transitions = response.data;
            });
        },

        mounted() {
            this.refreshAsignaciones();
        },

        methods: {
            async refreshAsignaciones(){

                /**
                 * https://github.com/robsontenorio/vue-api-query/blob/master/README.md
                 * Leer 'Response from backend'
                 * Tenemos que usar el método $find(), no el find() porque el backend wrappea los atributos con 'data'
                 * Si usamos find(), entonces notificador.id es 'undefined' ya que queda notificador.data.id
                 *
                 * Medio choronga esto, ya que al tener que usar $find() se hacen dos requests
                 * Uno: http://cedulas.test/api/notificador/63
                 * Dos: http://cedulas.test/api/notificador/63/asignacion
                 * Podría hacer la 2da directo... ugh
                 */

                if ( this.hayNotificadorSeleccionado ){

                    let chabon = await Notificador.$find( this.notificador );
                    let rows = await chabon.asignacion()
                        .where( 'estado', this.asignacionesOptions.estado )
                        .limit( this.asignacionesPager.pageSize )
                        .page( this.asignacionesPager.currentPage )
                        .get()
                    ;
                    this.asignaciones = rows.data;
                    this.asignacionesPager.total = rows.meta.total;
                    this.asignacionesPager.currentPage = rows.meta.current_page;

                }
                else{
                    this.asignaciones = null;
                    this.asignacionesPager.total = 0;
                    this.asignacionesPager.currentPage = 1;
                }
            },

            asignacionesPageChange(){
                this.refreshAsignaciones();
            },

            asignacionesSizeChange(){
                this.asignacionesPager.currentPage = 1;
                this.refreshAsignaciones();
            },

            cambiarFiltroAsignaciones() {
                this.refreshAsignaciones();
            },

            handleSelectionOfCedulas( selection ){
                this.selectedCedulas = selection;
            },

            fechaAsignacionFormatter( row, column ){
                return row.fecha_asignacion.substr( 0, 10 ) ;
            },

            executeBulkAction( command ){

                console.log( 'ejecutando comando de dropdown ', command );

                // asi elmodal sabe qué mostrar o no
                this.dialogForm.selectedCommand = command;
                this.dialogForm.visible = true;

                console.log( 'this.dialogForm.wasConfirmed: ', this.dialogForm.wasConfirmed );
            },

            async applyActionsOnceAllDataIsValidated( action ){

                let params;

                switch ( action ){
                    case 'reasignar':
                        params = { notificador_id: this.dialogForm.data.notificador_id };
                        break;
                    case 'diligenciar':
                        params = { fecha_diligenciamiento: this.dialogForm.data.fecha_diligenciamiento };
                        break;
                    case 'extraviar':
                        params = { observacion: this.dialogForm.data.observacion };
                        break;
                }

                console.log( 'llamando al backend para realizar las operaionces sobre cédulas: ' );
                // esta lista no es de cédulas sino de cedulas asignadas a oficial, por eso el key de la cedula es 'cedula_id'
                let actions = new CedulaActions( action, this.selectedCedulas, params, 'cedula_id' );
                let resultado = await actions.procesarAccion();

                console.log( 'resultado de CedulaActions: ', resultado );
            },

            // seteo los campos a mostrar según el comando a considerar
            async whenDialogFormOpens(){


                this.dialogForm.wasConfirmed = false;
                this.dialogForm.visibleFields = [];

                switch ( this.dialogForm.selectedCommand ){

                    case 'reasignar':

                        this.dialogForm.visibleFields.push( 'notificador_id' );
                        // la lista de notificadores posibles para la reasignación tiene que excluir al notificador actual
                        // que sería el notificador de this.activeRow
                        let rows = await Notificador
                            .where( 'exclude', this.notificador )
                            .where( 'activo', true )
                            .get();

                        this.dialogForm.notificadores = rows.data;

                        break;

                    case 'diligenciar':
                        this.dialogForm.visibleFields.push( 'fecha_diligenciamiento' );
                        break;
                }

            },

            confirmModalForm( name ){

                let shouldSubmit = true ;

                this.$refs[name].validate((valid) => {

                    if ( ! valid ) {
                        shouldSubmit = false ;
                    }
                });


                if ( shouldSubmit ){
                    this.dialogForm.wasConfirmed = true;
                    this.dialogForm.visible = false;
                    this.applyActionsOnceAllDataIsValidated( this.dialogForm.selectedCommand );
                }
                else {
                    this.$message.error('Oops, this is a error message.');
                }

            },
        },
    }
</script>

<style scoped>

</style>
