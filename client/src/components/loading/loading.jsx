import React, { useEffect, useState } from "react";
import css from "./loading.module.css"
import img from "../../img/landing.gif"
import { Redirect } from "react-router-dom";

export default function Loading(){
    const [loadin,setLoading]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(true)
        },3000)
    })
    if(loadin){
        return <Redirect to="/home"/>
    }else{
        return(
            <div className={css.container}>
                <div className={css.image}>
                    <img className={css.ima} src={img} alt={img} />
                </div>
            </div>
        
        )
    }
}