import BaseModel from './BaseModel';

export default class Calle extends BaseModel {

    resource()
    {
        // OJO; sin '/' al principio del recurso, la librería agrega y si hay demás no funca
        return 'calle';
    }
}