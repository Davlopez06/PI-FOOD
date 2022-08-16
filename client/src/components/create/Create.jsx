import React, { useEffect, useState } from "react";
import css from "./Create.module.css"
import { getAllDiets, createRecipe } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Create(){
    const dispatch=useDispatch();
    const diets=useSelector(state=>state.diets)
    const crea=useSelector(state=>state.create)
    const [activo,setActivo]=useState(false)
    const [validator,setValidator]=useState(true)
    const [validate,setValidate]=useState(true)
    const [creado,setCreado]=useState(false)
    const [validarCreado,setValidarCreado]=useState(false)
    const [dietss,setDietss]=useState([]);
    const [input, setInput]= useState({
        name:"",
        summary:"",
        healthScore:0,
        steps:""
      })

    useEffect(()=>{
        dispatch(getAllDiets())
    },[])
    useEffect(()=>{
        setCreado(crea)
    },[crea])

    function validar(num){
        if(num>100 || num<1){
            setValidator(false)
            return false
        }
        setValidator(true)
        return true
    }

    function handleOnSelect(e,name){
        e.preventDefault()
        console.log(dietss)
        let filtrar=false;
        for(let i=0;i<dietss.length;i++){
            if(dietss[i]===name){
                filtrar=true;
            }
        }

        if(filtrar){
            let dietts=dietss.filter(diet=>diet!=name)
            setDietss(dietts)
            console.log(dietss)
        }else{
            dietss.push(name)
            setDietss(dietss)
            console.log(dietss)
        }
        if(activo){
            setActivo(false)
        }else{
            setActivo(true)
        }
    } 

    function handleOnChange(e){
        e.preventDefault()
        if(e.target.name==="healthScore"){
            setValidate(validar(e.target.value))
        }
        setInput({...input, [e.target.name] : e.target.value})
    }

    function validarCre(){ 
        setTimeout(()=>{
            setValidarCreado(true)
        },1000)
        setTimeout(()=>{
            setValidarCreado(false)
            setDietss([])
        },3000)
    }

    function handleOnSubmit(e){
        e.preventDefault()
        if(validator){
            dispatch(createRecipe(input,dietss))
            setCreado(true)
        }else{
            setCreado(false)
            
        }
        validarCre()
    }
    return(
        <div className={css.create}>
            {!validarCreado? 
            <div className={css.form}>
                
                <form onSubmit={handleOnSubmit}>
                    <label >Name:</label>
                    <br />
                    <input type="text" name="name" onChange={(e)=>handleOnChange(e)} required/>
                    <br />
                    <br />
                    <label>Summary:</label>
                    <br />
                    <textarea name="summary" cols="70" rows="20" onChange={(e)=>handleOnChange(e)} required/>
                    <br />
                    <br />
                    <label>Health score:</label>
                    <br />
                    <input type="number" name="healthScore" onChange={(e)=>handleOnChange(e)} required/>
                    <br />
                    {validate? null: <p className={css.rojo}>Health score no valid</p>}
                    <br />
                    <br />
                    <label>Steps:</label>
                    <br />
                    <textarea name="steps" cols="70" rows="20" onChange={(e)=>handleOnChange(e)} required/>
                    <br />
                    <br />
                    <label>Diets:</label>
                    <br />
                    {diets? <div className={css.diets}>
                        {diets? diets.map(diet=>{
                            return(
                                <button onClick={(e)=>handleOnSelect(e,diet.name)} className={css.botonFiltrar}>{diet.name}</button>
                            )
                        }):null}
                    </div> :null}
                    <br />
                    <br />
                    {dietss? <div>
                        <p>Selected diets:</p>
                        <br />
                        <div className={css.diets}>
                        {dietss? dietss.map(diet=>{
                            return(
                                <button className={css.activo}>{diet}</button>
                            )
                        }):null}
                        </div>
                    </div> :null}
                    <button className={css.boton} type="submit">Create Recipe</button>
                </form>
                </div>
                :creado? <div className={css.Creado}>
                    <h3 className={css.message}>Created</h3>
                </div>:<div className={css.Creado}>
                    <h3 className={css.message}>Error in creation process</h3>
                </div>}
            
        </div>
    )
}