import React from "react";
import "./style/izvestaj.css"
import { Link } from "react-router-dom";
export const Izvestaj = () => {
    return (
        <div className="izvestaj">
            <img src="http://cdn.mikroe.com/img/mega-menu/mikroe-timesaving-white.png" alt="logo" />

            <h1>Work in progress</h1>
            <Link className="back" to="/"><button> <i className="fas fa-arrow-left"></i>  Vrati se na vozila</button></Link>
        </div>
    )
}