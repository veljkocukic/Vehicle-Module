import React,{useState,useEffect,useRef,useContext} from "react"
import {DataContext} from "./Context"
import axios from "axios"
import "./style/new-car.css"

export const NovoVozilo = () =>{



    return(
        <div className="new-car">
            <h1>Novo vozilo</h1>
            <div className="new-car-container">

            </div>
        </div>
    )
}