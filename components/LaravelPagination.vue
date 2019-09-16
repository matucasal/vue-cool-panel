<template>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-sizes="[25, 100, 150, 200]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size.sync="per_page"
        :total="total"
        :current-page.sync="current_page">
    </el-pagination>
</template>

<script>
	import client from '../../js/AxiosGetClient';
	
	import Sector from '../models/Sector';

    export default {
        name: "LaravelPagination",

        data() {
            return {
                per_page: 25,
                current_page: 1,
                total: 0,
            };
        },

        mounted() {
            this.fetchData();
        },

        methods: {

            handleSizeChange( val ) {
                console.log( `${val} items per page` );
                this.per_page = val;
                this.fetchData();
            },

            handleCurrentChange( val ) {
                console.log( `current page val: ${val}` );
                console.log( 'vue.current_page ' + this.current_page );
                this.fetchData( val );
            },

            writeLog( msg ) {
                console.log( msg );
            },

            async fetchData ( page = 1 ){

				let sectores = await Sector
				.page( page )
				.limit( this.per_page )
				.get();

				/*
                client.get( '/sector' + '?page=' + page )
                    .then( response => {

                        let meta = response.data.meta;
                        this.total      = meta.total;
                        this.per_page   = meta.per_page;
                    })
				;
				*/

				this.total      = sectores.meta.total;
                this.per_page   = sectores.meta.per_page;

            },
        },

    }
</script>

<style scoped>

</style>