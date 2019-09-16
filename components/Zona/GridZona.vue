<template>
	<v-container fluid>

        <el-tabs type="border-card" @tab-click="onTabClick">
            <el-tab-pane label="Búsqueda de Zonas" id="aafasdf">

                <el-form
                    :inline="true"
                    label-position="top"
                    label-width="100px"
                    :model="params"
                >
                    <el-form-item label="Calle"><el-input placeholder="Calle" v-model="params.calle"></el-input></el-form-item>
                    <el-form-item label="Zona"><el-input placeholder="Zona" v-model="params.zona"></el-input></el-form-item>
                    
                </el-form>
                <el-row>
                    <el-col :span="4">
                        <v-btn class="ma-2" color="grey darken-2" @click="onSubmit" dark>
                            <v-icon dark left>search</v-icon>Buscar
                        </v-btn>
                        
                    </el-col>
                </el-row>

            </el-tab-pane>
        </el-tabs>


        <!--		</Card>-->
		<Card  color="#b71c1c" title="Listado de Zonas" text="">
		<el-main>
			
            <el-table
                    ref="multipleTable"
                    :data="zonas"
					style="width: 100%"
                    >
                <el-table-column
						type="selection"
                        width="55">
                </el-table-column>
				<el-table-column
                        label="Calle"
						property="calle"
                        width="500">
                </el-table-column>
				<el-table-column
                        label="Par"
						property="par"
                        width="100">
                </el-table-column>
				<el-table-column
                        label="Alt_ini"
						property="alt_ini"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="Alt_fin"
						prop="alt_fin"
						width="100">
                </el-table-column>
                <el-table-column
                        property="zona"
                        label="Zona">
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

	</v-container>
</template>

<script>
	import Zona from '../../models/Zona';
	import constantes from '../../constantes.js';
	import Card from '../material/Card';
	
	export default {
        name: "GridZonas",
		components: {
            Card,
		},

        data() {
            return {
                currentSelectedTab: 0,
				filter: {},
				// variables para el paginador
                per_page: 25,
                current_page: 1,
                total: 0,
                sizes: [25, 100, 150, 200],

                // los inputs para los filtros del QueryBuilder
                params: {
                    calle: '',
                    zona: '',
					alt_ini: '',
					alt_fin: '',
					
				},
                listaResultados: null,
				zonas: [],
				selected: [],
				
            };
		},

		created() {
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
			

            queryParams(){
                let query = {
                    calle: '',
                    zona: '',
					alt_ini: '',
					alt_fin: ''
                };
                query.calle = this.params.calle;
                query.zona = this.params.zona;
                query.alt_ini = this.params.alt_ini;
                query.alt_fin = this.params.alt_fin;
                
                return {
                    calle: this.params.calle,
                    zona: this.params.zona,
                    alt_ini: this.params.alt_ini,
                    alt_fin: this.params.alt_fin,
                };
            }
        },

        methods: {

            onSubmit() {
                this.handleCurrentChange( 1 );
            },

            async handleCurrentChange( pageNumber ){


				let zonas = await Zona
                    .where( 'calle', this.params.calle )
                    .where( 'zona', this.params.zona )
					.page( pageNumber )
                    .limit( this.perPageAsNumber )
                    .get();

                this.current_page = zonas.meta.current_page;
				this.total = zonas.meta.total;
				this.zonas = zonas.data;

            },

            handleSizeChange( pageSizeAsString ){

                if ( typeof pageSizeAsString === 'string' )
                    this.per_page = parseInt( pageSizeAsString );

                this.per_page = pageSizeAsString;
                this.handleCurrentChange( 1 );
            },

            onTabClick( tab ){
			    console.log('onTablClick: ', tab.index );
			    this.currentSelectedTab = tab.index;
            },

			
			async asyncForEach(array, callback) {
				for (let index = 0; index < array.length; index++) {
					await callback(array[index], index, array);
				}
			},

			
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
