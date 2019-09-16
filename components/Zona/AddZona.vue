<template>
	<v-container fill-height fluid grid-list-xl>
		<v-layout justify-center wrap>	
			<v-flex xalign-xl-content-center>
				<Card  color="#b71c1c" title="Alta de Zona" text="Completar datos de la zona">
					
                    <v-alert
						v-model="alert"
						outlined
        				type="success"
						dismissible
						text
					>
						Zona creada correctamente
					</v-alert>
                    
                    <el-form
						:inline="true" 
						label-position="top"
						label-width="100%"
						:model="zona"
						:inline-message="true"
                        ref="zona"
					>
						
						<el-form-item label="par" :error="zona.errorMap.get('par')"><el-input v-model="zona.par" ></el-input></el-form-item>
						
                        <el-form-item label="alt_ini" :error="zona.errorMap.get('alt_ini')"><el-input v-model="zona.alt_ini" ></el-input></el-form-item>
                        <el-form-item label="alt_fin" :error="zona.errorMap.get('alt_fin')"><el-input v-model="zona.alt_fin" ></el-input></el-form-item>

                        <el-form-item label="zona" :error="zona.errorMap.get('zona')"><el-input v-model="zona.zona" ></el-input></el-form-item>
						
                        <el-form-item label="Calle" :error="zona.errorMap.get('calle_id')">
							<calle-select v-model="zona.calle_id" :calle.sync="zona.calle_id" />
						</el-form-item>


						<v-spacer/>
						<v-flex xs12 text-xs-right>
						<el-form-item>
							<md-button @click="postZona" class="md-lg md-raised md-accent">
								Guardar Zona
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
	import Zona from '../../models/Zona';
	import Card from '../material/Card';
	import CalleSelect from "../Calle/CalleSelect";
    
    export default {
		name: 'zona',
		components: {
		    Card,
			CalleSelect
		},
	  	
        mounted() {
		},	
		data(){
			return{
				errorMap:new Map(),
				valid: false,
				zona:{
					errorMap:new Map(),
                },
                alert: false,
			}
		},
		created() {
		},
	  	computed: {
		},
		errorCaptured (err, vm, info) {
			this.error = true
		},
        watch: {
		},
		
        methods: {
			postZona() {
                console.log(this.zona)
				let zona = new Zona(this.zona)
				console.log(zona);
				zona.save()
				.then( response => {
                        console.log("estoy bien")
						this.$refs.zona.resetFields();
						this.alert= true;
                    })
                    .catch( error => {
						this.zona.errorMap = new Map();
                        for( const message of error.response.data.errors ){
							let key = message.source.parameter;
							let value = message.detail;
                            // alta grasada porque no sé Javascript
                            // https://stackoverflow.com/questions/37130105/does-vue-support-reactivity-on-map-and-set-data-types
                            //this.errors = new Map( this.formData.errorMap.set( key, value ) );
                            this.zona.errorMap = new Map(this.zona.errorMap.set( key, value ));
						}
                    })
                ;
			}
		}
	}
	
</script>