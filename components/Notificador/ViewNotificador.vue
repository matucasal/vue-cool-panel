<template>
    <el-container>
        <el-header>Vista notificador</el-header>
        <el-row :gutter="5">
            <default-view-field label="Apellido" :value="row.apellido" :formatter="formatApellido"></default-view-field>
        </el-row>
        <el-row :gutter="5">
            <default-view-field label="Nombre" :value="row.nombre"></default-view-field>
        </el-row>
        <el-row :gutter="5">
            <default-view-field label="D.N.I." :value="row.dni"></default-view-field>
        </el-row>
        <el-row :gutter="5">
            <default-view-field label="Sexo" :value="row.sexo"></default-view-field>
        </el-row>
        <el-row :gutter="5">
            <html-view-field label="Texto" :value="row.texto"></html-view-field>
        </el-row>

        <test-main-panel></test-main-panel>

    </el-container>

    <!--<div>-->
        <!--<asignaciones :notificador="notificador_id"></asignaciones>-->
    <!--</div>-->
</template>

<script>
    import Asignaciones from "./Asignaciones";
    import ViewField from "../Common/ViewField";
    import CalleRemoteSelect from "../Calle/CalleRemoteSelect";
    import DefaultViewField from "../Common/DefaultViewField";
    import Cedula from '../../models/Cedula';
    import HtmlViewField from "../Common/HtmlViewField";
    import TestMainPanel from "../Common/TestMainPanel";


    export default {

        name: "ViewNotificador",
        components: {
            TestMainPanel,
            HtmlViewField, DefaultViewField, ViewField, Asignaciones,CalleRemoteSelect},

        async mounted() {
            let cedula = await Cedula.find( 2510 );
            this.row.texto = cedula.data.texto;

        },

        data(){
            return {
                notificador_id: 63,

                etiqueta: 'Apellido',
                data: 'Rodriguez',

                calle_id: 0,

                rows: {

                },

                persona: {
                    Apellido: 'Rodriguez',
                    Nombre: 'Pablo Sebastián',
                    DNI: 22711459,
                    Sexo: 'M',
                },

                row: {
                    apellido: 'Rodriguez',
                    nombre: 'Pablo Sebastián',
                    dni: 22711459,
                    sexo: 'M',
                    texto: null,
                },
            };
        },

        methods: {
            formatApellido( val ){
                return val.toLocaleUpperCase();
            },
        },
    }
</script>

<style scoped>
    .el-select {
        display: block;
    }

</style>
