import React, {useState} from "react";
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    //Destructuring
    const {ciudad, pais} = busqueda

    //Func coloca los elementos en el state
    const manejarCambio = e => {
        //actualizar el state
        guardarBusqueda({
            ...busqueda, //guarda una copia de lo que hay en el objeto
            [e.target.name]: e.target.value,//guarda el cambio
        });
    };

    //State para el error
    const [error, guardarError] = useState(false);


    //Cuandose ejecute el Submit
    const manejarSubmit = e =>{
        e.preventDefault();

        //validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //pasarlo al componente principal
        guardarConsultar(true);

    };

  return (
        <form onSubmit={manejarSubmit}>

        {(error)
            ? <Error mensaje="Ambos campos son obligatorios"/>
            : null
        }

        <div className="input-field col s12">

            <input 
                type="text" 
                name="ciudad" 
                id="ciudad" 
                value={ciudad}
                onChange={manejarCambio}
            />

            <label htmlFor="ciudad">Ciudad: </label>  

        </div>

        <div className="input-field col s12">

            <select 
                name="pais" 
                id="pais" 
                value={pais}
                onChange={manejarCambio}
            >
                <option value="">-- Selecciona un país--</option>
                <option value="AR">Argentina</option>
                <option value="CO">Colombia</option>
                <option value="CR">Costa Rica</option>
                <option value="ES">España</option>
                <option value="MX">México</option>
                <option value="PE">Perú</option>
                <option value="US">Estados Unidos</option> 
            </select>

            <label htmlFor="pais">País: </label>

        </div>

        <div className="input-field col s12">
            <button
                type="submit"
                className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
            >Buscar Clima</button>
        </div>

        </form>
  );
};

Formulario.propTypes ={
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;
