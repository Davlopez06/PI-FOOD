import React from "react";
import css from "./Recetas.module.css"
import Receta from "./Receta";
import {Link} from "react-router-dom"

export default function Recetas(props){
    return(
        <div className={css.recetas}>
            {props.recipes?.map(recipe=>{
                return(
                    <div key={recipe.id} className={css.receta}>
                        <Link className={css.link} to={`/receta/${recipe.id}`}>
                            <Receta 
                            id={recipe.id}
                            image={recipe.image}
                            name={recipe.name}
                            diets={recipe.diets}/>
                        </Link>
                    </div>
                )}
            )}
        </div>
    )
}