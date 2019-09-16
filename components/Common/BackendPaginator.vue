<template><el-pagination
        background
        layout="sizes, prev, pager, next"
        :page-sizes="pageSizes"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
        :page-size.sync="per_page"
        :total="total"
        :current-page.sync="current_page">
</el-pagination>
</template>

<script>
    import ModelFactory from '../../models/ModelFactory';

    export default {
        name: "BackendPaginator",

        props: {
            resource: {
                type: String,
                required: true,
                validator: value => {

                    if ( ! ModelFactory.has( value ) ) {
                        console.error( 'el recurso ' + value + ' no está registro en ModelFactory')
                        return false;
                    }
                    return true;
                }
            },

            filters: {
                type: Object,
                default: () => ({}),
            },

            sizes: {
                type: Array,
                default: () => ([
                    25,
                    50,
                    100,
                    200,
                ]),
            },
        },

        computed: {

            resourceModel(){
                return this.resource;
            },

            modelInstance(){
                return ModelFactory.createModel( this.resource );
            },

            pageSizes(){
                return this.sizes;
            },

            appliedFilters(){
                return this.filters;
            },
        },

        data() {
            return {
                per_page: null,
                total: 0,
                current_page: 1,
                response: {},
            };

        },

        mounted(){
            this.handleCurrentPageChange();
        },

        methods: {

            // un método común para asegurarnos que se crea una nueva instancia
            // si uso la coputada para obtener el Model, lo que ocurre es que la instancia se crea una sola vez y queda
            // guardada en algun lugar del Vue y se utiliza esa misma para todos los requests subsiguientes
            // eso hace que en la query de la url se vayan concatenando todos los parámetros.
            // en el php eso finalmente se procesa correctamente gracias a alguna magia negra del laravel o del php
            // pero al apache efectivamente le llegan query strings gigantescos.
            crearModelInstance(){
                return ModelFactory.createModel( this.resource );
            },

            handlePageSizeChange( tamanio ){

                if ( ! tamanio )
                    tamanio = this.pageSizes[0];

                this.per_page = tamanio;
                this.current_page = 1;
                this.getDataFromBackend();
            },

            handleCurrentPageChange( page = 1 ){

                this.getDataFromBackend( page );
            },

            async getDataFromBackend( page = 1 ){

                if ( ! this.per_page )
                    this.per_page = this.pageSizes[0];

                this.response = await this.crearModelInstance()
                    .withFilters( this.appliedFilters )
                    .limit( this.per_page )
                    .page( page )
                    .get();

                this.current_page = page;
                this.per_page     = parseInt(this.response.meta.per_page);
                this.total        = this.response.meta.total;

                this.$emit( 'new-backend-dataset', this.response );
            },

        },
    }
</script>

<style scoped>

</style>