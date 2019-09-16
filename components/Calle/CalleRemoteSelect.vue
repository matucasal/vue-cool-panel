<template>
    <el-select
            v-model="value"
            @input="emitUpdate"
            autocomplete="on"
            filterable
            reserve-keyword
            remote
            :remote-method="getCalles"
            placeholder= "Seleccionar"
            value="">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.extra }}</span>
        </el-option>
    </el-select>
</template>

<script>
    import Calle from '../../models/Calle';

    export default {
        name: "CalleRemoteSelect",

        props: ['calle', 'single'],

        model: {
            prop: 'calle',
            event: 'updateCalle',
        },

        data () {
            return {
                value: '',
                loading: false,
                options: [],
            };
        },

        methods: {
            emitUpdate( event ){
                this.$emit( 'update:calle', event );
            },

            async getCalles( search ){

                if ( search !== '' ){
                    console.log('buscando calles con ', search );
                    this.loading = true;

                    let response = await Calle
                        .limit( 30 )
                        .where('calle', search )
                        .orderBy('-usos')
                        .get();


                    let lista = [];
                    for( let i = 0; i < response.data.length; i++ ){
                        lista[i] = {
                            value: response.data[i].id,
                            label: response.data[i].calle,
                            extra: ( response.data[i].alturas.length > 0 ) ? response.data[i].alturas.join(";") : 'sin alturas',
                        };
                    }
                    this.options = lista;

                    this.loading = false;

                }
                else {
                    this.options = [];
                }
            },
        },


    }
</script>

<style scoped>

</style>