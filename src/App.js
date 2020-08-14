import React, {Fragment, useState, useEffect} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';



function App() {


  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
      ciudad: '',
      pais: ''
  });

  //controlar el useEffect antes de ejecutar consulta
  const [consultar, guardarConsultar] = useState(false);
  //resultado de la consulta API
  const [resultado, guardarResultado] = useState({});
  //Error en consulta
  const [error, guargarError] = useState(false);

  const {ciudad, pais} = busqueda;

  
    useEffect(() => {      
       const consultaAPI = async () => {
       
        if(consultar){
        
          const appId = '444eb4de2b78cd26b5ed76f444120f2b';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
          
          const respuesta = await fetch(url);
          const resultado = await respuesta.json(); //console.log(resultado);
          
          guardarResultado(resultado);
          guardarConsultar(false);    
          
          if (resultado.cod === '404'){
              guargarError(true);
          }else{
              guargarError(false);
          }


        } 
    }
    consultaAPI();
    // eslint-disable-next-line
  }, [consultar]);


  let componente;
  if(error){
       componente = <Error mensaje="No hay resultados"/>
  } else{
      componente =  <Clima resultado={resultado} />
  }
 

  return (
    <Fragment>

      <Header
        titulo="Clima - React App"
      />
      
      <div className="contenedor-form">

        <div className="container">

          <div className="row">

            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className="col m6 s12">

              {componente}

            </div>

          </div>

        </div>

      </div>

    </Fragment>
  );
}

export default App;
