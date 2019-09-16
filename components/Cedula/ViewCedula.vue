<template>
    
     <v-container fill-height fluid grid-list-xl>
		<v-layout justify-center wrap>
            <v-card>HOla v-card devuetify 2</v-card>
			<v-flex xalign-xl-content-center>
				<Card  color="#b71c1c">
                <md-card-header>
                <div class="md-title">Numero de cedula: {{ cedula.numero }}</div>
                </md-card-header>

     
         <v-list two-line>
          <v-list-tile @click="">
            
            <v-list-tile-content>
              <v-list-tile-title>{{ cedula.caratula }}</v-list-tile-title>
              <v-list-tile-sub-title>Caratula</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

          <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.caracter }}</v-list-tile-title>
                    <v-list-tile-sub-title>Caracter</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.estado }}</v-list-tile-title>
                    <v-list-tile-sub-title>Estado</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.created_at }}</v-list-tile-title>
                    <v-list-tile-sub-title>Fecha de creacion</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.dirigido }}</v-list-tile-title>
                    <v-list-tile-sub-title>Dirigido</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.expediente }}</v-list-tile-title>
                    <v-list-tile-sub-title>Expediente</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ cedula.sector }}</v-list-tile-title>
                    <v-list-tile-sub-title>Sector</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

        </v-list>

				</Card></v-flex>
		</v-layout></v-container>


</template>
<script>
import Cedula from '../../models/Cedula';
import Card from '../material/Card';


export default {

    name: "ViewCedula",
    components:{
        Card,
        
    },
    data(){
        return{
            cedula: {}
        }
    },
    //Activated es el hook que vendria a ser el created pero del keep-alive
    async activated (){
        let cedula = await Cedula
        .find(this.$route.params.id)
        

        this.cedula = cedula.data
    }

}
</script>
