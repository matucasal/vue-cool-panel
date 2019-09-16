<template>
    <div>
        <el-col :span="labelSpan" align="right">
            <div class="p-3 mb-2 bg-secondary text-white font-weight-black">{{ label }}</div>
        </el-col>
        <el-col :span="dataSpan" >
            <div class="p-3 mb-2 bg-light text--black">{{ formattedValue }}</div>
        </el-col>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css';

    export default {

        name: "DefaultViewField",

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

            formatter: {
                type: Function,
            },

        },

        computed: {
            formattedValue(){

                if ( typeof this.formatter == 'function' )
                    return this.formatter( this.value );

                return this.value;
            },
        },

        data() {
            return {
            };
        },
    }
</script>

<style scoped>

</style>
