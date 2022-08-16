import React from "react";
import css from "./Error.module.css"

export default function Error(){
    return(
        <div className={css.error}>
            <div className={css.text}>
                <h1 className={css.not}>404 Not found</h1>
            </div>
        </div>
    )
}