import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje]= useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!presupuesto || presupuesto<0){
        setMensaje('No es un presupuesto válido')
        return //DETENEMOS LA EJECUCIÓN DEL CÓDIGO
    }
        setMensaje('')
        setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
    <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
            <label htmlFor="">Definir Presupuesto</label>
            <input 
                type="number" 
                className='nuevo-presupuesto'
                placeholder='Añade tu Presupuesto'
                value={presupuesto}
                onChange={ e => setPresupuesto( Number(e.target.value) ) }
                //LO QUE EL USUARIO ESCRIBA SE VA AÑADIENDO A "setPresupuesto"
            />

            <input
                type="submit" 
                value="Añadir"
            />

                {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje> }
            
        </div>
    </form>
    </div>
  )
}

export default NuevoPresupuesto
