import React, { useEffect } from "react";
import css from "./Opciones.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../../redux/actions";
import { filter,ordenar ,searchName} from "../../redux/actions";

export default function Opciones(){
    const diets=useSelector(state=>state.diets)
    const dispatch=useDispatch()
    const orden=["Asc","Des"]
    const [name,setName]=useState("");
    const [activo,setActivo]=useState(false)
    const [activo2,setActivo2]=useState(false)
    const [activo3,setActivo3]=useState(false)
    const [filtrar,setFiltrar]=useState(false)
    const [filtrar2,setFiltrar2]=useState(false)
    const [filtrar3,setFiltrar3]=useState(false)
    useEffect(()=>{
        dispatch(getAllDiets())
    },[])
    function handleOnChange(event){
        setName(event.target.value)
        console.log(name)
    }
    function handleFilter(){
        if(filtrar){
            setFiltrar(false)
        }else{
            setFiltrar(true)
        }
        if(activo){
            setActivo(false)
        }else{
            setActivo(true)
        }
    }
    function handleOrden(){
        if(filtrar2){
            setFiltrar2(false)
        }else{
            setFiltrar2(true)
        }
        if(activo2){
            setActivo2(false)
        }else{
            setActivo2(true)
        }
    }
    function handleOrden2(){
        if(filtrar3){
            setFiltrar3(false)
        }else{
            setFiltrar3(true)
        }
        if(activo3){
            setActivo3(false)
        }else{
            setActivo3(true)
        }
    }
    function handleOnSearch(e){
        dispatch(searchName(name))
    }
    function handleOnFiltro(e,diet){
        dispatch(filter(diet))
    }
    function handleOnOrden(e,orden,tipo){
        dispatch(ordenar(orden,tipo))
    }
    return(
        <div className={css.container}>
            <div className={css.search}>
                <input className={css.inSerach} type="text" name="name" placeholder="Buscar por nombre" onChange={(e)=>handleOnChange(e)}/>
                <button className={css.btnSerach} onClick={(e)=>handleOnSearch(e)}>Search</button>     
            </div>
            <div className={css.filter}>
                <button onClick={()=>handleFilter()} className={activo?css.activo:css.botonFiltrar}>Filter</button>
                <br />

                {filtrar? <button onClick={(e)=>handleOnFiltro(e,"all")} className={css.filtro}>All</button> :null}

                {filtrar? diets.map(diet=>{
                    return(
                        <button onClick={(e)=>handleOnFiltro(e,diet.name)} className={css.filtro}>{diet.name}</button>
                    )
                }):null}
            </div>
            <div className={css.orden}>
                <div className={css.alf}>
                    <button onClick={()=>handleOrden()} className={activo2?css.activo:css.botonFiltrar}>Alphanumeric</button>
                    <br />
                    { filtrar2? orden.map(o=>{
                        return(
                            <button onClick={(e)=>handleOnOrden(e,o,"alf")} className={css.filtro}>{o}</button>
                        )
                    }):null}
                </div>
                <div className={css.healt}>
                    <button onClick={()=>handleOrden2()} className={activo3?css.activo:css.botonFiltrar}>health score</button>
                    <br />
                    { filtrar3? orden.map(o=>{
                        return(
                            <button onClick={(e)=>handleOnOrden(e,o,"healt")} className={css.filtro}>{o}</button>
                        )
                    }):null}
                </div>
            </div>
        </div>
    )
}