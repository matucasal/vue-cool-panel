import BaseModel from './BaseModel';

export default class Sector extends BaseModel {

    resource()
    {
        // OJO; sin '/' al principio del recurso, la librería agrega y si hay demás no funca
        return 'sector';
    }
}