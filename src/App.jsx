import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros'

function App() {

  const [gastos, setGastos] = useState (
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  
const [presupuesto, setPresupuesto] = useState(
  Number(localStorage.getItem('presupuesto')) ?? 0
)
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
const [modal, setModal] = useState(false)
const [animarModal, setAnimarModal] = useState(false)
const [gastoEditar, setGastoEditar] = useState({})
const [filtro, setFiltro] = useState('')
const [gastosFiltrados, setGastosFiltrados] = useState([])

useEffect( () => {
 if(Object.keys(gastoEditar).length > 0){
  setModal(true)
  

  setTimeout(() => {
    setAnimarModal(true)
  }, 280);
  }

}, [gastoEditar])

useEffect(() =>{
  localStorage.setItem('presupuesto', presupuesto ?? 0)
},[presupuesto])

useEffect(() =>{
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
},[gastos])

useEffect (() =>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  if(presupuesto >0){
    setIsValidPresupuesto(true)
  }
},[])

useEffect (() =>{
  if(filtro){
  //FILTRAR GASTOS POR CATEGORÍA
    const gastosFiltrados = gastos.filter( gasto => gasto.categoria===filtro)
    setGastosFiltrados(gastosFiltrados)
  }
},[filtro])

const handleNuevoGasto = () => {
  setModal(true)
  setGastoEditar({})

  setTimeout(() => {
    setAnimarModal(true)
}, 280);
}

const guardarGasto = gasto => {
  console.log(gasto)
  if(gasto.id){
    //ACTUALIZAR 
    const gastoActualizados = gastos.map( gastoState => gastoState.id ===
      gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({})
  }else{
    //NUEVO GASTO
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
    // con 3 puntos ... para hacer una copia de esas variables
  }
  setAnimarModal(false)

  setTimeout(() => {
  setModal(false)
  }, 400);
}

const eliminarGasto = id => {
  console.log('eliminando ', id)
  const gastoActualizados = gastos.filter(gasto => gasto.id !== id)
  setGastos(gastoActualizados)
}


  return (
    <div className={modal ? 'fijar' : ''}>

    <Header
    gastos={gastos}
    setGastos={setGastos}
    presupuesto={presupuesto}
    setPresupuesto={setPresupuesto}
    isValidPresupuesto={isValidPresupuesto}
    setIsValidPresupuesto={setIsValidPresupuesto}
    />

    {isValidPresupuesto&& (
      <>
        <main>
          <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
          />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />


        </main>

        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt='icono nuevo gasto'
            onClick={handleNuevoGasto}
          />
        </div>
    </>
    )}
    
      {/* si modal se muestra aparece lo demás */}
      {modal && <Modal 
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                 />}

    </div>



  )
}

export default App
