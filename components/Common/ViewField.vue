<template>
    <div>
        <el-table
            border
            :show-header="false"
            :data="records"
            :cell-class-name="setCellClass"
            :highlight-current-row="false"
        >
            <el-table-column
                label="etiqueta"
                width="200px"
                align="right"
                class-name="theme--dark"
            >
                <div slot-scope="scope" class="list-enter">{{ scope.row.etiqueta }}</div>
            </el-table-column>
            <el-table-column label="valor" property="valor" v-slot="scope">
                <div v-if="scope.row.mostrar" class="mb-0">mostrando con v-if</div>
                {{ scope.row.valor }}
            </el-table-column>
        </el-table>
        <el-main>
            <default-view-field></default-view-field>
            <default-view-field></default-view-field>
            <default-view-field></default-view-field>
        </el-main>
    </div>

</template>

<script>
    import DefaultViewField from "./DefaultViewField";
    export default {
        name: "ViewField",
        components: {DefaultViewField},
        props: {

            labelSpan: {
                type: Number,
                default: 3,
            },

            fieldSpan: {
                type: Number,
                default: 21,
            },

            mostrar: true,

            row: null,
        },

        computed: {
            records() {

                if ( ! this.row || typeof this.row === 'undefined' )
                    return [];

                return this.columnsToRows( this.row );
            },
        },

        data() {
            return {

            };
        },

        mounted(){
            console.log( this.columnsToRows( this.persona ) );
        },

        methods: {
            setCellClass( row, column, rowIndex, columnIndex ){


                if ( row.columnIndex == 0 )
                    return 'view-label';

                return '';
            },

            columnsToRows(row ){
                if ( ! row || typeof row == 'undefined' )
                    return [];

                let rows = new Map( Object.entries( row ) );
                let convertido = [];
                rows.forEach( function( value, key ) {
                    convertido.push(
                        {
                            etiqueta: key,
                            valor: value,
                            type: 'html',
                            mostrar: true,
                        }
                    );
                });

                return convertido;
            },
        },
    }
</script>

<style>
    .el-table .azulito{
        background: #0d47a1;
    }
    .el-table .view-label{
        background: #1c3d5a;
    }
</style>
