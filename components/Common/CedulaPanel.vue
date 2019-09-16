<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="Lista">{{ contenido }}</el-tab-pane>
        <el-tab-pane label="Alta">Alta</el-tab-pane>
        <el-tab-pane label="Vista" :disabled="!hasView">Vista</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "CedulaPanel",
        data() {
            return {
                contenido: 'Lista de cédulas',
                hasView: false,
            };
        },

        created(){
            console.log('crando panel de cedula');
        },
    }
</script>

<style scoped>

</style>