<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Lista">Lista de notificadores</el-tab-pane>
        <el-tab-pane label="Alta">Alta</el-tab-pane>
        <el-tab-pane label="Vista" :disabled="!hasView">Vista</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "NotificadorPanel",

        data() {
            return {
                hasView: false,
            };
        },

        created(){
            console.log('crando panel de notificador');
        },
    }
</script>

<style scoped>

</style>