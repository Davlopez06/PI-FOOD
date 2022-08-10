import React from "react";
import css from "./Receta.module.css"
import image from "../../img/imgDefault.jpg"

export default function Receta(props){
    if(props.id<1000){

        console.log("Entra")
        return(
            <div className={css.receta}>
            <div className={css.image}>
                <img className={css.ima} src={props.image? props.image:image} alt={props.image? props.image:image} />
            </div>
            <p className={css.nombre}>{props.name}</p>
            <div className={css.diets}>
                {props.diets?.map((diet,index)=>{
                    return (
                        <button key={index} className={css.diet}>{diet.name}</button>
                    )
                })}
            </div>
        </div>
        )
    }else{
        return(
            <div className={css.receta}>
                <div className={css.image}>
                    <img className={css.ima} src={props.image} alt={props.image} />
                </div>
                <p className={css.nombre}>{props.name}</p>
                <div className={css.diets}>
                    {props.diets?.map((diet,index)=>{
                        return (
                            <button key={index} className={css.diet}>{diet}</button>
                        )
                    })}
                </div>
            </div>
        )
    }
}