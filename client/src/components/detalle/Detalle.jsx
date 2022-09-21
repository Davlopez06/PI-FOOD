import React from "react";
import css from "./Detalle.module.css"
import img from "../../img/imgDefault.jpg"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe,clean } from "../../redux/actions";
import logo from "../../img/cooking.png";
import {Link} from "react-router-dom"
import { useState } from "react";
import imgg from "../../img/landing.gif"

export default function Detalle(){
    const {id}=useParams()
    const dispatch=useDispatch()
    const recipe=useSelector(state=>state.recipe)
    const [cargado,setCargado]=useState(false)
    useEffect(()=>{
        dispatch(getRecipe(id))
        return dispatch(clean())
    },[])
    if(Object.keys(recipe).length != 0){
        return(
            <div className={css.datalle}>
                <div className={css.nav}>
                    <div className={css.left}>
                        <img className={css.ima} src={logo} alt={logo} />
                    </div>
                    <div className={css.rigth}>
                        <div className={css.it}>
                            <Link className={css.item} to="/home">Back</Link>
                        </div>
                    </div>
                </div>
                <div className={css.container}>
                    <div className={css.imagen}>
                        <img className={recipe.image?css.img:css.imageCreada} src={recipe.image?recipe.image:img} alt={recipe.image?recipe.image:img} />
                    </div>
                    <div className={css.deta}>
                        <div className={css.nombre}>
                            <p>Name:</p>
                            <p className={css.name}>{recipe.name}</p>
                        </div>
                        {recipe.dishTypes? 
                        <div className={css.dishtype}>
                            <p>Dish type:</p>
                            <div className={css.types}>
                            {recipe.dishTypes?.map(type=>{
                                return (
                                    <p className={css.type}>{type}</p>
                                )
                            })}
                            </div>      
                        </div>:null}
                        <div className={css.dietstype}>
                            <p>Diet type:</p>
                            <div className={css.diets}></div>
                            {recipe.diets?.map(diet=>{
                                if(typeof diet === "object"){
                                    return(
                                        <p className={css.diet}>{diet.name}</p>
                                    )
                                }else{
                                    return (
                                        <p className={css.diet}>{diet}</p>
                                    )
                                }
                            })}
                            
                        </div>
                        <div className={css.resumen}>
                            <p>Summary:</p>
                            <div className={css.name}>{recipe.summary? recipe.summary.toString().replace("/<b>|</b>|<a>|</a>|/gi",""):null}</div>
                        </div>
                        <div className={css.healt}>
                            <p>Health Score:</p>
                            <p className={css.name}>{recipe.healthScore}</p>
                        </div>
                        {recipe.steps?
                        <div className={css.pasos}>
                            <p>Steps:</p>
                            {Array.isArray(recipe.steps)? recipe.steps.map(step=>{
                                return (
                                    <p className={css.name}>{step.step}</p>
                                    )
                            }): <p className={css.name}>{recipe.steps}</p>}
                        </div>:null}
                    </div>
                </div>
            </div>
        )
    }else{
        setTimeout(()=>{
            setCargado(true)
        },2000)
        if(!cargado){
            return (
                <div className={css.containeer}>
                <div className={css.imagee}>
                    <img className={css.imaa} src={imgg} alt={imgg} />
                </div>
            </div>
            )
        }
        return (
            <div className={css.norecipe}>
                <p>ID INVALID</p> 
            </div>
        )
    }
    
}