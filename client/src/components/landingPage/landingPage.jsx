import React, { useState } from "react";
import css from "./landingPage.module.css";
import { Redirect } from "react-router-dom";
import Loading from "../loading/loading";

export default function LandingPage(){
    const [redirect,setRedirect]=useState(false)
    function handleOnClick(){
        setRedirect(true)
    }
    if(redirect){
        return <Loading/>
    }else{
        return (
            <div className={css.landing}>
                <div className={css.title}>Welcome to SALUFOOD</div>
                <div className={css.Iniciar}><button className={css.boton} onClick={()=>handleOnClick()}>Start</button></div>
                {redirect? <Redirect to="/home"/> : null}
            </div>
        )
    }
}