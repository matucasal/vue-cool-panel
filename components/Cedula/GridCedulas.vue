<template>
	<v-container fluid>
<!--		<Card  color="#b71c1c" title="Buscar Cedula" text="">-->
        <el-tabs type="border-card" @tab-click="onTabClick">
            <el-tab-pane label="Búsqueda de cédulas" id="aafasdf">
                <el-form
                    :inline="true"
                    label-position="top"
                    label-width="100px"
                    :model="params"
                >
                    <el-form-item label="Número"><el-input placeholder="Número de cedula a buscar" v-model="params.numero"></el-input></el-form-item>
                    <el-form-item label="Carátula"><el-input v-model="params.caratula"></el-input></el-form-item>
                    <el-form-item label="Dirigido"><el-input v-model="params.dirigido"></el-input></el-form-item>
                    <el-form-item label="Estado cédula"><estado-select v-model="params.estado" :estado.sync="params.estado"></estado-select></el-form-item>
                    <!--el-form-item><el-button type="primary" @click="onSubmit">Buscar</el-button></el-form-item-->
                    <el-form-item label="Sector"><sector-select v-model="params.sector" :sector.sync="params.sector"></sector-select></el-form-item>
					<!--<el-form-item label="Sector">
                        <el-select v-model="params.sector" placeholder="Seleccionar" filterable autocomplete>
                            <el-option v-for="item in sectores" :key="item.id" :label="item.sector" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>-->

                    <el-form-item label="Notificador">
                        <el-select v-model="params.notificador_id" placeholder="Seleccionar notificador" filterable value="">
                            <el-option v-for="item in notificadores" :key="item.id" :label="item.apellido + ', ' + item.nombre" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <el-row>
                    <el-col :span="4">
                        <v-btn class="ma-2" color="grey darken-2" @click="onSubmit" dark>
                            <v-icon dark left>search</v-icon>Buscar
                        </v-btn>
                        <!-- <el-button class="" type="primary" @click="onSubmit" >Buscar
                            <v-icon dark right>search</v-icon>
                        </el-button> -->
                    </el-col>
                </el-row>

            </el-tab-pane>

            <!--
            Panel para las opciones de filtor de cédulas asignadas
             -->
            <!--
            <el-tab-pane label="Asignaciones a notificadores" id="sarasa">
                <el-row>
                    <el-col :span="12">
                        <el-form :model="asignacionesOptions" label-width="150px">
                            <el-form-item label="Notificador">
                                <el-select v-model="asignacionesOptions.notificador_id" placeholder="Seleccionar notificador" filterable value="">
                                    <el-option v-for="item in notificadores" :key="item.id" :label="item.apellido + ', ' + item.nombre" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Estado de cédulas">
                                <el-radio-group v-model="asignacionesOptions.asignacion">
                                    <el-radio-button label="pendientes">Pendientes</el-radio-button>
                                    <el-radio-button label="todas">Todas</el-radio-button>
                                    <el-radio-button label="diligenciadas">Diligenciadas</el-radio-button>
                                    <el-radio-button label="extraviadas">Extraviadas</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <el-button class="" type="primary" @click="onSubmit" >Buscar
                            <v-icon dark right>search</v-icon>
                        </el-button>
                    </el-col>
                </el-row>

            </el-tab-pane>
            -->
        </el-tabs>


<!--		</Card>-->
		<Card  color="#b71c1c" title="Listado de cedulas" text="">
		<el-main>
			<el-row>
				<el-col :span="6">
					<el-dropdown disabled @command="handleSelectionAction">
						<!-- <el-button type="primary">
							Accion sobre elementos seleccionados<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button> -->
						<v-btn class="ma-2" color="grey darken-2" dark>
							Accion sobre elementos seleccionados<i class="el-icon-arrow-down el-icon--right"></i>
						</v-btn>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :disabled="disableRemitir" command="remitir">Remitir a Notificaciones</el-dropdown-item>
							<el-dropdown-item :disabled="disableAceptar" command="aceptar">Aceptar</el-dropdown-item>
							<el-dropdown-item :disabled="disableRechazar" command="rechazar">Rechazar</el-dropdown-item>
							<el-dropdown-item :disabled="disableAsignar" command="asignar">Asignar</el-dropdown-item>
							<el-dropdown-item :disabled="disableDiligenciar" command="diligenciar">Diligenciar</el-dropdown-item>
							<el-dropdown-item :disabled="disableExtraviar" command="extraviar">Extraviar</el-dropdown-item>
							<el-dropdown-item :disabled="disableDevolver" command="devolver">Devolver</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
            <el-table
                    ref="multipleTable"
                    :data="cedulas"
					style="width: 100%"
                    @selection-change="handleSelectionChange"
					@row-dblclick="viewCedula"
					>
                <el-table-column
						type="selection"
                        width="55">
                </el-table-column>
				<el-table-column
                        label="Número"
						property="numero"
                        width="150">
                </el-table-column>
				<el-table-column
                        label="Carácter"
						property="caracter"
                        width="120">
                </el-table-column>
				<el-table-column
                        label="Estado"
						property="estado"
                        width="250">
                </el-table-column>
                <el-table-column
                        label="Fecha de Creación"
						prop="created_at"
						width="200">
                    <template slot-scope="scope">{{ scope.row.created_at | moment("DD/MM/YYYY") }}</template>
                </el-table-column>
                <el-table-column
                        property="dirigido"
                        label="Dirigido">
                </el-table-column>
				<el-table-column
                        label="Expediente"
						property="expediente"
                        width="150">
                </el-table-column>
				<el-table-column
                        label="Sector"
						property="sector"
                        width="250">
                </el-table-column>
            </el-table>
            <!--div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third rows</el-button>
                <el-button @click="toggleSelection()">Clear selection</el-button>
            </div-->
        </el-main>
		<el-pagination
			color="grey darken-2"
			background
			layout="prev, pager, next"
			:page-sizes="[25, 100, 150, 200]"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-size="per_page"
			:total="total"
			:current-page="current_page">
		</el-pagination>
		</Card>
			<ActionModal v-show="isAsignarActionModalVisible" @close="closeAsignarCedulasActionModal" @onModalAction="doAsignarCedulasAction">
				
				<template v-slot:body>
				<Card  color="#b71c1c" title="Asignar a Notificador" text="" >
					<el-form :inline="true" ref="asignarNotificadorForm" label-position="top" :model="params">
						<el-form-item prop="notificador_id" :rules="[{ required: true, message: 'Seleccionad Notificador', trigger:'blur' }]" label="Notificador">
							<!--el-input placeholder="Notificador" v-model="params.notificador_id"></el-input-->
							<el-select v-model="params.notificador_id" placeholder="Seleccionar notificador" filterable autocomplete>
								<el-option v-for="item in notificadores" :key="item.id" :label="item.apellido + ', ' + item.nombre" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</Card>
				</template>
			</ActionModal>
		<ActionModal v-show="isDiligenciarActionModalVisible" @close="closeDiligenciarCedulasActionModal" @onModalAction="doDiligenciarCedulasAction">
			
			<template v-slot:body>
				<Card  color="#b71c1c" title="Diligenciar" text="" >
					<el-form :inline="true" ref="diligenciarForm" label-position="top" :model="params">
						<el-form-item prop="fecha_diligenciamiento" :rules="[{ required: true, message: 'Ingrese la fecha', trigger:'blur' }]" label="Fecha">
							<el-date-picker
								v-model="params.fecha_diligenciamiento"
								type="date"
								placeholder="Seleccionar Fecha"
								format="dd/MM/yyyy"
								value-format="yyyy-MM-dd HH:mm:ss"
							>
							</el-date-picker>
						</el-form-item>
					</el-form>
				</Card>
			</template>
		</ActionModal>

	</v-container>
</template>

<script>
	import Cedula from '../../models/Cedula';
	import Sector from '../../models/Sector';
	import Notificador from '../../models/Notificador';
	import CedulaMovimiento from '../../models/CedulaMovimiento';
	import Remito from '../../models/Remito';
	import constantes from '../../constantes.js';
	import Card from '../material/Card';
	import ActionModal from '../ActionModal';
	import EstadoSelect from "../Estado/EstadoSelect";
	import SectorSelect from "../Sector/SectorSelect";
    import CedulaActions from "../../models/CedulaActions";

	export default {
        name: "GridCedulas",
		components: {
			EstadoSelect,
			SectorSelect,
			Card,
			ActionModal
        },

        data() {
            return {
                currentSelectedTab: 0,
				isAsignarActionModalVisible: false,
				isDiligenciarActionModalVisible: false,
				filter: {},
				// variables para el paginador
                per_page: 25,
                current_page: 1,
                total: 0,
                sizes: [25, 100, 150, 200],

                // los inputs para los filtros del QueryBuilder
                params: {
                    numero: '',
                    caratula: '',
					dirigido: '',
					sector: '',
					estado: '',
					notificador_id: '',
					fecha_diligenciamiento: '',
				},
                listaResultados: null,
				cedulas: [],
				selected: [],
				notificadores: [],

                asignacionesOptions: {
				    asignacion: 'pendientes',
                    notificador_id: '',
				}
            };
		},

		created() {

            //this.applyActions();

			//cargo todos los combos cuando se crea el componente
			this.loadNotificadores();
		},


		computed: {
            perPageDataType(){
                return typeof this.per_page;
            },
            perPageAsNumber(){
                if ( typeof this.per_page === 'string' ){
                    return parseInt( this.per_page );
                }
                return this.per_page;
			},
			disableRemitir(){
				return(this.disableGeneric('remitir'));
			},
			disableAceptar(){
				return(this.disableGeneric('aceptar'));
			},
			disableRechazar(){
				return(this.disableGeneric('rechazar'));
			},
			disableDevolver(){
				return(this.disableGeneric('devolver'));
			},
			disableAsignar(){
				return(this.disableGeneric('asignar'));
			},
			disableDiligenciar(){
				return(this.disableGeneric('diligenciar'));
			},
			disableExtraviar(){
				return(this.disableGeneric('extraviar'));
			},

            queryParams(){
                let query = {
                    numero: '',
                    caratula: '',
                    dirigido: '',
                    sector: '',
                    estado: '',
                    zona: '',
                    notificador_id: '',
                    asignacion: '',
                };

                if ( this.currentSelectedTab == 0 ){

                    query.numero = this.params.numero;
                    query.caratula = this.params.caratula;
                    query.dirigido = this.params.dirigido;
                    query.sector = this.params.sector;
                    query.estado = this.params.estado;
                    query.zona = this.params.zona;

                    return {
                        numero: this.params.numero,
                        caratula: this.params.caratula,
                        dirigido: this.params.dirigido,
                        sector: this.params.sector,
                        estado: this.params.estado,
                    };
                }
                else {
                    return {
                        notificador_id: this.asignacionesOptions.notificador_id,
                        asignacion: this.asignacionesOptions.asignacion,
                    };
                }
            },
        },

        methods: {


			/*showActionModal() {
				this.isActionModalVisible = true;
			},
			closeActionModal() {
				this.isActionModalVisible = false;
			},*/
			doModalAction(){
				console.log( "Do Modal Action" );
			},
			disableGeneric(action){
				let ret = !this.selected.length;
				this.selected.forEach(function(cedula,key){
					if (!cedula.actions.includes(action))
						ret = true;
				});
				return ret;
			},
            onSubmit() {
                this.handleCurrentChange( 1 );
            },

            async handleCurrentChange( pageNumber ){


				let cedulas = await Cedula
                    .where( 'numero', this.params.numero )
                    .where( 'caratula', this.params.caratula )
					.where( 'dirigido', this.params.dirigido )
					.where( 'sector', this.params.sector )
					.whereIn( 'estado', this.params.estado)
					.where( 'notificador', this.params.notificador_id)
                    .page( pageNumber )
                    .limit( this.perPageAsNumber )
                    .get();

                //this.per_page = cedulas.meta.per_page;
                this.current_page = cedulas.meta.current_page;
				this.total = cedulas.meta.total;
				this.cedulas = cedulas.data;

                /*this.$message(
                    {
                        showClose: true,
                        message: 'Congrats, this is a success message.',
                        type: 'success'
                    }
                );*/
            },

            handleSizeChange( pageSizeAsString ){

                if ( typeof pageSizeAsString === 'string' )
                    this.per_page = parseInt( pageSizeAsString );

                this.per_page = pageSizeAsString;
                this.handleCurrentChange( 1 );
            },

            async loadCedulas(){

			},

			async loadNotificadores(){

				let notificadores = await Notificador
					.limit( 1000 )
                    .get();

				this.notificadores = notificadores.data;
			},

			handleSelectionChange( selection ){
				this.selected = selection;
				console.log( 'handleSelectionChange cedula_id: ', selection );
			},

            onTabClick( tab ){
			    console.log('onTablClick: ', tab.index );
			    this.currentSelectedTab = tab.index;
            },

			async handleSelectionAction( command ){

				let selection = this.selected;
				let me = this;

                let actions;
                let resultado;

				switch( command ){

					case 'asignar':
						this.isAsignarActionModalVisible = true;
						break;
					case 'diligenciar':
						this.isDiligenciarActionModalVisible = true;
						break;

					case 'remitir':

						let remito = new Remito({});
						selection.forEach(function(cedula, key){
							cedula.accion = "remitir";
							cedula.cedula_id = cedula.id;
						});
						remito.cedulas = selection;
						remito.tipo_remito_id = 1;
						console.log(remito);
						await remito.save();
						this.$message(
							{
								showClose: true,
								message: 'Remito Número '+remito.numero+' generado.',
								type: 'success'
							}
						);
						me.handleCurrentChange(1);
						break;
					default:

                        actions = new CedulaActions( command, selection );
                        resultado = await actions.procesarAccion();

                        console.log(  'resultado de CedulaActions: ' + command, resultado );

                        if ( resultado.length == selection.length ){

                            this.$message(
                                {
                                    showClose: true,
                                    message: 'Listo!',
                                    type: 'success'
                                }
                            );
                        }

                        me.handleCurrentChange( 1 );


                        /*

						let movimiento = new CedulaMovimiento({});
						movimiento.setCustomEndpoint('cedula-movimiento/'+command);

						// Esta es la forma de hacer saves asincronos.
						// De forma tal de tener el momento en el que se termina de ejecutar el último save
						// Si alguien encuentra una forma mejor, bienvenido.
						const start = async () => {
							await me.asyncForEach(selection, async (cedula) => {
								movimiento.cedula_id = cedula.id;
								await movimiento.save();
								saved++;
								if (saved == selection.length){
									console.log("all saved!");
									this.$message(
										{
											showClose: true,
											message: 'Listo!',
											type: 'success'
										}
									);
									me.handleCurrentChange(1);
								}
							});
						}
						start();
						*/
						break;
				}
			},

			closeAsignarCedulasActionModal() {
				this.isAsignarActionModalVisible = false;
			},

			async asyncForEach(array, callback) {
				for (let index = 0; index < array.length; index++) {
					await callback(array[index], index, array);
				}
			},

			async doAsignarCedulasAction(){
				let me = this;
				let notificador_id = this.params.notificador_id;
				let selection = this.selected;
				this.$refs.asignarNotificadorForm.validate( async (valid) => {
					if (valid) {
						let actions = new CedulaActions( 'asignar', selection, {notificador_id: notificador_id} );
						let resultado = await actions.procesarAccion();

                        if ( resultado.length == selection.length ){
							me.isAsignarActionModalVisible = false;
							me.params.notificador_id = '';
                            this.$message(
                                {
                                    showClose: true,
                                    message: 'Cédulas asignadas',
                                    type: 'success'
                                }
                            );
                        }
                        me.handleCurrentChange( 1 );
					} else {
						return false;
					}
				});
			},

			closeDiligenciarCedulasActionModal() {
				this.isDiligenciarActionModalVisible = false;
			},

			doDiligenciarCedulasAction(){
				let me = this;
				let fecha_diligenciamiento = this.params.fecha_diligenciamiento;
				let selection = this.selected;
				this.$refs.diligenciarForm.validate( async (valid) => {
					if (valid) {
						let actions = new CedulaActions( 'diligenciar', selection, {fecha_diligenciamiento: fecha_diligenciamiento} );
						let resultado = await actions.procesarAccion();

                        if ( resultado.length == selection.length ){
							me.isDiligenciarActionModalVisible = false;
							me.params.fecha_diligenciamiento = '';
                            this.$message(
                                {
                                    showClose: true,
                                    message: 'Cédulas diligenciadas',
                                    type: 'success'
                                }
                            );
                        }
                        me.handleCurrentChange( 1 );
					} else {
						return false;
					}
				});
			},

			viewCedula(cedula){
				this.$router.push({ path: `/cedula/${cedula.id}` }) // -> /cedula/123
				
			}
        },
    }
</script>

<style scoped>
.el-form{
	margin-left: 20px;
}
.buscar {
	margin-left: 20px;
}

.el-select {
    display: block;
}
</style>
