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
    import Calle from '../../models/Calle';

    export default {

        name: "CalleSelect",

        props: ['calle', 'single'],

        model: {
            prop: 'calle',
            event: 'updateCalle',
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

            let response = await Calle.limit( 5000 ).get();
            let lista = [];

            for( let i = 0; i < response.data.length; i++ ){
                lista[i] = {
                    value: response.data[i].eje_cal_id,
                    label: response.data[i].calle,
                };
            }

            this.options = lista;
        },

        methods: {
            emitUpdate( event ){
                this.$emit( 'update:calle', event );
            }
        },
    }
</script>

<style scoped>

</style>