import CedulaMovimiento from "./CedulaMovimiento";

export default class CedulaActions {

    constructor( accion, cedulas, params, cedula_key = 'id' ) {

        this.accion     = accion;
        this.cedulas    = cedulas;
        this.params     = params;
        this.result     = new Map();
        this.cedula_key = cedula_key;

    }

    getResponses(){
        return this.procesarAccion();
    }

    getResult(){
        return this.result;
    }

    createCedulaMovimientoData( cedula ){

        let cedulaMovimiento = { cedula_id: cedula[this.cedula_key] };

        switch ( this.accion ){
            case 'asignar':
            case 'reasignar':
                cedulaMovimiento.notificador_id = this.params.notificador_id;
				break;
			case 'diligenciar':
                cedulaMovimiento.fecha_diligenciamiento = this.params.fecha_diligenciamiento;
                break;
        }

        return cedulaMovimiento;
    };

    async procesarAccion(){

		const lista = [];
        const me = this;

        const promises = this.cedulas.map( async cedula => {

            lista.push( cedula.id );

            let cedulaMovimiento = new CedulaMovimiento( this.createCedulaMovimientoData( cedula ) );
            cedulaMovimiento.setCustomEndpoint( 'cedula-movimiento/' + me.accion );

            return cedulaMovimiento.save();


            /*
            return {
                cedula_id: data.cedula_id,
                request: CedulaMovimiento.find( data.cedula_id ),
                data: null,
            };
            */

            //return CedulaMovimiento.find( data.cedula_id );
                /*
                .then( success => {

                    //console.log('then del cedulas.map interno en procesarAccion() ');
                    return success;
                })
                .catch( error => {
                    //console.log('cath del cedulas.map interno en procesarAccion() ');
                    return error;
                })
                ;

                 */
            /*
            let request = CedulaMovimiento.find( data.cedula_id )

                .then( success => {
                    resultado = success;
                    //console.log('then del cedulas.map interno en procesarAccion() ');
                    return resultado;
                })
                .catch( error => {
                    resultado = error;
                    //console.log('cath del cedulas.map interno en procesarAccion() ');
                    return resultado;
                })
            ;
            return {
                cedula_id: data.cedula_id,
                request: request,
            };

             */

        });

        const esto = this;
        const sarasa = await Promise.all( promises )
            /*
            .then( result => {
                result.map( data => {
                    esto.result.set( data.cedula_id, data.response );
                    console.log( 'item individual de collection de promises', data, ' response: ', data.response.response );
                });
                //console.log( 'then del Promise.all():' , result.length )
            })

             */
            ;


        for( let i = 0; i < sarasa.length; i++ ){
            this.result.set( lista[i], sarasa[i] );
        }

        return sarasa;
    }


/*
    async function fetchRepoInfos () {
        // load repository details for this array of repo URLs
        const repos = [
            {
                url: 'https://api.github.com/repos/fs-opensource/futureflix-starter-kit'
            },
            {
                url: 'https://api.github.com/repos/fs-opensource/android-tutorials-glide'
            }
        ]

        // map through the repo list
        const promises = repos.map(async repo => {
            // request details from GitHub’s API with Axios
            const response = await Axios({
                method: 'GET',
                url: repo.url,
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            });

            return {
                name: response.data.full_name,
                description: response.data.description
            }
        });

        // wait until all promises resolve
        const results = await Promise.all(promises)

        // use the results
    }
    */

}