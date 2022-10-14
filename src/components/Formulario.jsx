import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';


const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [nit, setNit] = useState('');
    const [tproductos, setTproductos] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [email, setEmail] = useState('');
    const [lista, setLista] = useState([])


    useEffect(() => {

        const obtenerDatos = async () => {    
          try {
            await onSnapshot(collection(db, "proveedores"), (querySnapshot) => {    
              setLista(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
          } catch (error) {
            console.log(error);
          }
        };
        obtenerDatos();
      }, []);


    const eliminar = async id => {
        console.log(id)
        try{
            await deleteDoc(doc(db,'proveedores',id))
        }catch(error){
            console.log(error)
        }
    }

    const guardar = async (e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            alert('Ingrese el nombre')
            return
        }
        if(!nit.trim()){
            alert('Ingrese el Nit')
            return
        }
        if(!tproductos.trim()){
            alert('Ingrese el Tipo de producto')
            return
        }
        if(!ciudad.trim()){
            alert('Ingrese la ciudad ')
            return
        }
        if(!email.trim()){
            alert('Ingrese el email')
            return
        }
        try{

            const data = await addDoc(collection(db,'proveedores'),{
                nombre: nombre,
                nit: nit,
                tproductos: tproductos,
                ciudad: ciudad,
                email: email
            })

            setLista([
                ...lista,
                {nombre:nombre,
                nit:nit,
                tproductos: tproductos,
                ciudad: ciudad,
                email: email,
                id:data.id}
            ])

            setNombre('')
            setNit('')
            setTproductos('')
            setCiudad('')
            setEmail('')
            e.target.reset()
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>PROVEEDORES</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de Proveedores</h4>
                <ul className="list-group">
                    {
                        lista.map(item =>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombre}    -    {item.nit}    -    {item.tproductos}    -    {item.ciudad}    -    {item.email}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        
        <div className='col-4'>
            <h4 className="text-center">
                Agregar Nuevo Proveedor
            </h4>
            <form onSubmit={guardar}>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese Nombre del Proveedor'
                onChange={(e)=>setNombre(e.target.value)}
                value = {nombre}
                ></input>
                <input 
                className='form-control mb-2'
                type="number" 
                placeholder='Ingrese el nit del proveedor'
                onChange={(e) => setNit(e.target.value)}
                value = {nit}></input>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese el Tipo del productos'
                onChange={(e) => setTproductos(e.target.value)}
                value = {tproductos}></input>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese la cuidad del proveedor'
                onChange={(e) => setCiudad(e.target.value)}
                value = {ciudad}></input>
                <input 
                className='form-control mb-2'
                type="email" 
                placeholder='Ingrese el Email de contacto'
                onChange={(e) => setEmail(e.target.value)}
                value = {email}></input>
                <button 
                className='btn btn-primary btn-block'
                type='submit'
                >Agregar</button>
            </form>
        </div>
        </div>   
    </div>
  )
}

export default Formulario