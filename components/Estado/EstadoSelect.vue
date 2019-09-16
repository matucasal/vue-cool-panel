<template>
    <el-select
            v-model="value"
            @input="emitUpdate"
            filterable
            autocomplete
			placeholder= "Seleccionar"
            :multiple="! isSingle"
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
    import Estado from '../../models/Estado';

    export default {

        name: "EstadoSelect",

        props: ['estado', 'single'],

        model: {
            prop: 'estado',
            event: 'updateEstado',
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

            let response = await Estado.get();
            let lista = [];

            for( let i = 0; i < response.data.length; i++ ){
                lista[i] = {
                    value: response.data[i].id,
                    label: response.data[i].estado,
                };
            }

            this.options = lista;
        },

        methods: {
            emitUpdate( event ){
                this.$emit( 'update:estado', event );
            }
        },
    }
</script>

<style scoped>

</style>