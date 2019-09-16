<template>
    <div>
        <el-col :span="labelSpan" align="right">
            <div class="p-3 mb-2 bg-secondary text-white font-weight-black">{{ label }}</div>
        </el-col>
        <el-col :span="dataSpan" >
            <div v-if="hasContent">
                <div v-if="shouldShow" class="p-3 mb-2" v-html="value"></div>
                <div><a @click="toggle" class="mt-5" aria-role="button" >{{ showHideLabel }}</a></div>
            </div>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "HtmlViewField",
        props: {

            labelSpan: {
                type: Number,
                default: 3,
            },

            dataSpan: {
                type: Number,
                default: 21,
            },

            label: {
                type: String,
                default: '',
            },

            value: {
                default: ''
            },

        },

        computed: {

            hasContent(){
                return this.value !== '' && this.value !== null ;
            },

            showHideLabel(){
                return ( this.shouldShow ) ? 'Ocultar contenido' : 'Mostrar contenido';
            },

        },

        methods: {
            toggle(){
                this.shouldShow = ! this.shouldShow;
            },
        },

        data() {
            return {
                shouldShow: false,
                showing: false,
            };
        },
    }
</script>

<style>


</style>