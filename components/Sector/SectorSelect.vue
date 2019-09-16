<template>
    <el-select
            v-model="value"
            @input="emitUpdate"
            filterable
            autocomplete
			placeholder= "Seleccionar"
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
    import Sector from '../../models/Sector';

    export default {

        name: "SectorSelect",

        props: ['sector', 'single'],

        model: {
            prop: 'sector',
            event: 'updateSector',
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

            let response = await Sector.limit( 1000 ).get();
            let lista = [];

            for( let i = 0; i < response.data.length; i++ ){
                lista[i] = {
                    value: response.data[i].id,
                    label: response.data[i].sector,
                };
            }

            this.options = lista;
        },

        methods: {
            emitUpdate( event ){
                this.$emit( 'update:sector', event );
            }
        },
    }
</script>

<style scoped>

</style>