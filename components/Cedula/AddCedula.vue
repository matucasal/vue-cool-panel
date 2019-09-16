<template>
	<v-container fill-height fluid grid-list-xl>
		<v-layout justify-center wrap>	
			<v-flex xalign-xl-content-center>
				<Card  color="#b71c1c" title="Alta de Cedula" text="Completar datos de la cedula">
					<v-alert
						v-model="alert"
						outlined
        				type="success"
						dismissible
						text
					>
						Cedula creada correctamente con el numero "{{this.numeroCedula}}"
					</v-alert>
					<el-form
						:inline="true" 
						label-position="top"
						label-width="100%"
						:model="cedula"
						:inline-message="true"
						ref="cedula"
					>
						<el-form-item label="Dirigido" :error="cedula.errorMap.get('dirigido')" prop="dirigido"><el-input placeholder="Dirigido"  v-model="cedula.dirigido" ></el-input></el-form-item>
						<el-form-item label="Carátula" :error="cedula.errorMap.get('caratula')" prop="caratula"><el-input placeholder="Caratula"  v-model="cedula.caratula"></el-input></el-form-item>
						<el-form-item label="Caracter" :error="cedula.errorMap.get('caracter_id')" prop="caracter" >
							<caracter-select placeholder="Caracter"  v-model="cedula.caracter_id" :caracter.sync="cedula.caracter_id" ref="caracter"/>
						</el-form-item>
						<v-spacer/>
						<el-form-item label="Tipo Domicilio" :error="cedula.errorMap.get('tipo_domicilio_id')" prop="tipo_domicilio_id">
							<tipo-domicilio-select v-model="cedula.tipo_domicilio_id" :tipo_domicilio.sync="cedula.tipo_domicilio_id" ref="tipoDomicilio"/>
						</el-form-item>
						<el-form-item label="Calle" :error="cedula.errorMap.get('calle_id')" prop="calle_id">
							<calle-select v-model="cedula.calle_id" :calle.sync="cedula.calle_id" ref="calle"/>
						</el-form-item>
						<el-form-item label="Altura" :error="cedula.errorMap.get('altura')" prop="altura"><el-input placeholder="altura" v-model="cedula.altura"></el-input></el-form-item>
						<!--el-form-item><el-button type="primary" @click="onSubmit">Buscar</el-button></el-form-item-->
							<v-spacer/>

						<el-form-item label="Sector" :error="cedula.errorMap.get('sector_id')" prop="sector_id"><sector-select v-model="cedula.sector_id" :sector.sync="cedula.sector_id" ref="sector"/></el-form-item>

						<el-form-item>
							<v-flex>
								<v-dialog
									ref="dialog"
									v-model="modal"
									:return-value.sync="date"
									persistent
									lazy
									full-width
									width="290px"
								>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="computedDateFormatted"
											label="Seleccione Fecha"
											prepend-icon="event"
											v-on="on"
											hint="MM/DD/YYYY"
										/>
									</template>
									<v-date-picker
										v-model="date"
										locale="es"
										scrollable
										dark
									>
										<v-spacer/>
										<v-btn flat color="red" @click="modal = false">Cancelar</v-btn>
										<v-btn flat color="succes" @click="$refs.dialog.save(date)">OK</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>
						</el-form-item>
							<v-spacer/>
						<el-form-item prop="texto">
							<TextEditor ref="textEditor" v-model="cedula.texto"/>
						</el-form-item>
						<v-spacer/>
						<v-flex xs12 text-xs-right>
						<el-form-item>
							<md-button @click="postCedula" class="md-lg md-raised md-accent">
								Guardar Cedula
								<md-icon >add</md-icon>
							</md-button>
						</el-form-item>
						</v-flex>
					</el-form>
					
				</Card>
				
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	import Api from './../../api/cedula';
	import Cedula from '../../models/Cedula';
	import TextEditor from './../Editor/Text_editor.vue';	
	import Card from '../material/Card';
	import CalleSelect from "../Calle/CalleSelect";
	import SectorSelect from "../Sector/SectorSelect";
	import CaracterSelect from "../Caracter/CaracterSelect";
	import TipoDomicilioSelect from "../TipoDomicilio/TipoDomicilioSelect";
    export default {
		name: 'AddCedula',
		components: {
		// Use the <ckeditor> component in this view.
			TextEditor,
			SectorSelect,
			Card,
			CalleSelect,
			CaracterSelect,
			TipoDomicilioSelect
		},
	  	props: ['cedula_id'],		
		mounted() {
		 	//. if (this.cedula_id)
			//	this.fetchCedula(); 		
		},	
		data(){
			return{
				errorMap:new Map(),
				valid: false,
				cedula:{
					errorMap:new Map(),
				},
				errors:{},
				dirigidoRules:[],
				texto:'',
				textoRules:[],
				caratulaRules:[],
				date: new Date().toISOString().substr(0, 10),
				dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
				menu: false,
				modal: false,
				menu2: false,
				alert: false,
				numeroCedula:''
			}
		},
		created() {
		},
	  	computed: {
      		computedDateFormatted () {
        		return this.formatDate(this.date)
	  		},
	  		/* getCedula(){ 
				return this.fetchCedula()
	  		} */
		},
		errorCaptured (err, vm, info) {
			this.error = true
			//console.log(this.errors)
		},
		watch: {
			date (val) {
				this.dateFormatted = this.formatDate(this.date)
			},
			cedula_id(val){
				if ((val != 0) || (val != null )){
					this.fetchCedula(val)
					let fieldset = document.getElementById('conjunto').disabled = true;
				}
			}
		},
	  	methods: {
			fetchCedula(idCedula){
				Api.getCedula(idCedula)
				.then( ( {data} ) => {
					if ( data ) {
						let contenido = data.data.texto;
						let texto = contenido.replace(/<[^>]*>?/g, '');
						//console.log( 'Api.getCedula' );
						this.$refs.textEditor.content = texto;
						this.dirigido	= data.data.dirigido;
					}
				})
				.catch( error => {
					console.error( 'shit, api.getcedula falló' );
					console.error( "el toString del error: " + error.toString() );
					console.log( error );
					console.error( 'despues de error.toString()' );
				});		
			},
	  		postCedula() {
				/* let contenido = this.$refs.textEditor.content;
				let texto = contenido.replace(/<[^>]*>?/g, '');
				this.cedula.texto = texto; */
				let post = new Cedula(this.cedula)
				post.save()
				.then( response => {
					if(response.data){
						this.$refs.sector.value = "";
						this.$refs.caracter.value = "";
						this.$refs.tipoDomicilio.value = "";
						this.$refs.calle.value = "";
						this.$refs.cedula.resetFields();
						this.alert= true;
						this.numeroCedula=response.data.numero;
						this.$refs.textEditor.content = null;
						

						

					}else{
						console.log(response.errors);
						this.cedula.errorMap = new Map();
						for( const message of response.errors ){
							let key = message.source.parameter;
							let value = message.detail;
							this.cedula.errorMap = new Map(this.cedula.errorMap.set( key, value ));
						}
					}
                });
			},
			formatDate (date) {
				if (!date) return null
				const [year, month, day] = date.split('-')
				return `${day}/${month}/${year}`
			},
			parseDate (date) {
				if (!date) return null
				const [month, day, year] = date.split('/')
				return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
			}
		}
	}
</script>