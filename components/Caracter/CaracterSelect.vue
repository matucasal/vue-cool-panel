<template>
    <el-select
            v-model="value"
            @input="emitUpdate"
            filterable
            autocomplete
			placeholder= "Seleccionar"
            :multiple="isSingle"
            value=""
            prop="">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    import Caracter from '../../models/Caracter';
    export default {
        name: "CaracterSelect",
        props: ['caracter', 'single'],
        model: {
            prop: 'caracter',
            event: 'updateCaracter',
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
            let response = await Caracter.limit( 5000 ).get();
            let lista = [];
            for( let i = 0; i < response.data.length; i++ ){
                lista[i] = {
                    value: response.data[i].id,
                    label: response.data[i].caracter,
                };
            }
            this.options = lista;
        },
        methods: {
            emitUpdate( event ){
                this.$emit( 'update:caracter', event );
            }
        },
    }
</script>

<style scoped>
</style>