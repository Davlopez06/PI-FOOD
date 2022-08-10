import React, { useEffect, useState } from "react";
import Opciones from "../Opciones/Opciones";
import css from "./Home.module.css"
import Recetas from "../recetas/Recetas";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes ,getAllRecipesInicial} from "../../redux/actions";
import carga from "../../img/Cargando.gif"


export default function Home(){
    const recipes=useSelector(state=>state.recipes)
    const recipesInicial=useSelector(state=>state.recipesIni)
    const [recipesArray,setRecipesArray]=useState();
    const [cargado,setCargado]=useState(false);
    const dispatch=useDispatch()
    const [paginas,setPaginas]=useState(0)
    const [array,setArray]=useState([])
    let arr=[];
    let numero=0;
    let i=0;
    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllRecipesInicial())
    },[])
    useEffect(()=>{
        setTimeout(()=>{
            setCargado(true)
        },2000)
    },[recipesInicial])
    useEffect(()=>{

        console.log(recipes)
        for(let i=0;i<recipes.length;i++){
            console.log("Entra a for")
            if(Array.isArray(recipes[i])){
                for(let j=0;j<recipes[i].length;j++){
                    numero=numero+1;
                }
            }else{
                console.log("Entra a numero")
                numero=numero+1;
            }
        }
        console.log(numero)
        if(numero%9!=0){
            console.log(Math.floor(numero/9)+1)

            setPaginas(Math.floor(numero/9)+1);
        }else{
            console.log(numero)
            setPaginas(numero/9);
        }
        

  

    },[recipes])
    useEffect(()=>{
        console.log(paginas)
        for(let i=1;i<=paginas;i++){
            arr.push(i);
            setArray(arr)
        }      
    },[paginas])
    useEffect(()=>{
      cambiarPage(1)     
    },[recipesInicial])

    function cambiarPage(num){
        setCargado(false)
        let arr=[]
        for(let i=(num-1)*9;i<num*9;i++){
            if(recipes[i]){
                arr.push(recipes[i]);
                setRecipesArray(arr);
            }
        }
        console.log(recipesArray)
        setCargado(true)
    }
    return(
        <div className={css.container}>
            <div className={css.margin}>          
            <div className={css.opciones}>
                <Opciones key={1}/>
            </div>
            </div>
            <div className={css.margin2}>
            {recipesInicial.length? <div className={css.recetas}> 
                <Recetas 
                key={++i}
                recipes={recipesArray? recipesArray: recipesInicial}/>
            </div>: <div className={css.loading}>
                No se encontro
            </div>}
            </div>
            {recipesInicial.length?  <div className={css.paginas}>
                {array?.map(a=>{
                    console.log("Entra Paginas")
                    return(
                        <button key={a+100} className={css.pagina} onClick={()=>cambiarPage(a)}>{a}</button>
                    )
                })}
            </div>:null }
          
        </div>
    )
}