import BaseModel from './BaseModel';

export default class CedulaMovimiento extends BaseModel {

    constructor( ...attributes ) {

        super( ...attributes );

        this._customEndpoint = '';
    }

    static setCustomEndpoint( endpoint ){
        let self = this.instance();
        return self.setCustomEndpoint( endpoint );
    }

    setCustomEndpoint( endpoint ){
        this._customEndpoint = endpoint;
        return this;
    }

    resource()
    {
        // OJO; sin '/' al principio del recurso, la librería agrega y si hay demás no funca

        if ( this._customEndpoint )
            return this._customEndpoint;

        return 'cedula-movimiento';
    }
}
