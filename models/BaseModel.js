import { Model as BaseModel } from 'vue-api-query';
import config from '../AxiosConfig';
import vm from '../app';

export default class Model extends BaseModel {

    // define a base url for a REST API
    baseURL () {
        return '';
    }

    parameterNames () {

        return {
            include:'include',
            filter: 'filter',
            sort:   'sort',
            fields: 'fields',
            append: 'append',
            page:   'page',
            limit:  'per_page',
        };
    }

    static withFilters( filters ){

        let self = this.instance();
        self.withFilters( filters );

        return self;
    };

    withFilters( filters ){

        let modelInstance = this;

        // Le paso un objeto y lo convierto a un Map para iterarlo y agregar los filtros que correspondan
        // Los objetos "comnunes": { a: 1, b: 'bbb' } en javascript no son iterables (parece)
        // No conviene usar un Map() directo como data en Vue porque, al menos hasta ahora, no es reactivo con respecto
        // a los elementos internos de la colección que tienen: Map.set(key,value) no dispara ningún envento en el Vue
        // Al pasar el parametro modelInstace en la llamada forEach(),  'this' dentro de la callback es el BaseModel, no el Map que hace la iteración

        new Map( Object.entries( filters ) ).forEach( function( value, key ) {

            if ( value )
                this.where( key, value );

        }, modelInstance );

        return this;
    };


    // implement a default request method
    request ( config ) {

        return this.$http.request( config );
    }
}
