import BaseModel from './BaseModel';
import NotificadorCedula from "./NotificadorCedula";

export default class Notificador extends BaseModel {

    resource()
    {
        // OJO; sin '/' al principio del recurso, la librería agrega y si hay demás no funca
        return 'notificador';
    }

    primaryKey()
    {
        return 'id';
    }

    asignacion() {
        return this.hasMany( NotificadorCedula );
    }

}
