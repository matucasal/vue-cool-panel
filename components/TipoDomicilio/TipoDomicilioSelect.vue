<template>
    <el-select
            v-model="value"
            @input="emitUpdate"
            filterable
            autocomplete
			placeholder= "Seleccionar"
            :multiple="isSingle"
            value="">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    import TipoDomicilio from '../../models/TipoDomicilio';
    export default {
        name: "TipoDomicilioSelect",
        props: ['tipo_domicilio', 'single'],
        model: {
            prop: 'tipo_domicilio',
            event: 'updateTipoDomicilio',
        },
        computed: {
            isSingle(){
                if ( this.single == 'true' || this.single == 'single' )
                    return true;

                return false;
            },
        },
        data(){
            return {
                value: '',
                options: [],
            };
        },
        async mounted() {
            let response = await TipoDomicilio.limit( 5000 ).get();
            let lista = [];
            for( let i = 0; i < response.data.length; i++ ){
                lista[i] = {
                    value: response.data[i].id,
                    label: response.data[i].tipo_domicilio,
                };
            }
            this.options = lista;
        },
        methods: {
            emitUpdate( event ){
                this.$emit( 'update:tipo_domicilio', event );
            }
        },
    }
</script>

<style scoped>
</style>