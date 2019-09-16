import Cedula from "./Cedula";
import Sector from "./Sector";
import Notificador from "./Notificador";

export default class ModelFactory {

    // Es para que se pueda validar en el prop de BackendPaginator.
    constructor(){
        this.resources = new Set([
            'cedula',
            'sector',
            'notificador',
        ]);
    }

    static instance(){
        return new this;
    };

    static createModel( resource ){

        let self = this.instance();
        return self.createModel( resource );
    };

    createModel( resource ){

        switch ( resource ){

            case 'cedula':
                return new Cedula();

            case 'sector':
                return new Sector();

            case 'notificador':
                return new Notificador();

            default:
                throw 'el recurso ' + resource + ' no está registrado en el ModelFactory';

        }

    };

    static has( resource ){
        let self = this.instance();

        return self.has( resource )
    };

    has( resource ){
        return this.resources.has( resource );
    };

};