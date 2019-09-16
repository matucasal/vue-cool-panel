<template>
    <div>
        <el-button @click="activateOrCreatePanel('cedula')">Mostrar Cedulas</el-button>
        <el-button @click="activateOrCreatePanel('notificador')">Mostrar Notificadores</el-button>
        <el-button @click="activateOrCreatePanel('zona')">Mostrar Zonas</el-button>

        <el-tabs type="card" closable @tab-remove="removePanel">


            <!--<el-tab-pane key="cedula" label="Cedulas" name="cedula">-->
                <!--<cedula-panel></cedula-panel>-->
            <!--</el-tab-pane>-->

            <!--<el-tab-pane key="zona" label="Zonas" name="zona">-->
                <!--<zona-panel></zona-panel>-->
            <!--</el-tab-pane>-->

            <el-tab-pane
                    v-for="item in displayedPanels"
                    :key="item.name"
                    :label="item.titulo"
                    :name="item.name"

            >
                <component v-bind:is="item.component" :key="item.name"></component>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

    import CedulaPanel from "./CedulaPanel";
    import NotificadorPanel from "./NotificadorPanel";
    import ZonaPanel from "./ZonaPanel";

    export default {

        name: "TestMainPanel",
        components: {ZonaPanel, NotificadorPanel, CedulaPanel},

        data(){

            return {

                // fuck it, soy malo con javascript, asi que uso un set para saber más fácil cuáles
                // están activados o no así no explota cuando agrego dos veces el mismo tab
                visibles: new Set(),

                displayedPanels: [],

                availablePanels: [
                    {
                        titulo: 'Cédulas',
                        name: 'cedula',
                        component: CedulaPanel,
                    },
                    {
                        titulo: 'Zonas',
                        name: 'zona',
                        component: ZonaPanel,
                    },
                    {
                        titulo: 'Notificador',
                        name: 'notificador',
                        component: NotificadorPanel,
                    },
                ],
            };
        },

        methods: {

            activateOrCreatePanel( name ){

                if ( this.visibles.has( name ) ){
                    // nada.... capaz activarlo... o algo....
                }
                else {
                    this.visibles.add( name );
                    let panel = this.availablePanels.find( item => item.name === name );
                    this.displayedPanels.push( panel );
                }


            },

            removePanel( name ){


                if ( this.visibles.has( name ) ){
                    this.visibles.delete( name );
                    this.displayedPanels = this.displayedPanels.filter( item => item.name !== name );
                }


            },
        },

    }
</script>

<style scoped>

</style>