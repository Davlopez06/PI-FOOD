import React from "react";
import css from "./Nav.module.css"
import logo from "../../img/cooking.png";
import {Link} from "react-router-dom"

export default function Nav(){
    return(
        <div className={css.nav}>
            <div className={css.left}>
                <img className={css.ima} src={logo} alt={logo} />
            </div>
            <div className={css.rigth}>
                <div className={css.it}>
                <Link className={css.item} to="/home">Home</Link>
                <Link className={css.item} to="/create">Create recipe</Link>
                </div>
            </div>
        </div>
    )
}