import React,{ useContext, useState} from "react"
import axios from "axios" 
import { DataContext } from "../../Context"
import {Spiner} from "./Spiner"
export const Dialog = ({par,polje}) => {

    let {setOpenDialog,id,spinerOn,setSpinerOn} = useContext(DataContext)
    let url = ""

    switch(polje){
        case "reg":
            url = "registracija/"
            break;
        case "spec":
            url = "specifikacija/"
            break;
        case "fuel":
           url = "gorivo/"
            break;
        case "odr":
            url= "odrzavanje/"
            break;
        case "dmg":
            url = "steta/"
            break;
        default:
            url=""
    }
    
    const handleDelete=()=>{
        
        setSpinerOn(true)
        axios.post("http://localhost:5000/api/v1/"+url+par,{id}).then(
            ()=>{
                setSpinerOn(false)
                setOpenDialog(false)
            }).catch(er=>console.log(er))


    }

    return (
        <div className="dialog">
            {spinerOn && <Spiner />}
            <h4>Brisanje</h4>
            <div className="dialog-txt">
                <p>Da li ste sigurni da želite da obrišete izabranu stavku?</p>
            </div>
            <div className="dialog-btns">
                <button className="dialog-btn dYes" onClick={handleDelete}>Da</button>
                <button className="dialog-btn dNo" onClick={()=>setOpenDialog(false)}> Ne</button>
            </div>
        </div>
    )
}