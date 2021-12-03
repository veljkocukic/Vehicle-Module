import React, { useContext, useEffect,useState } from "react"
import { DataContext } from "../Context"
import { EditSpecifikacija } from "./Editi/EditSpecifikacija"

export const Specifikacija = ({ specifikacijaAr }) => {

    let { formatDate, openSpecEdit, setOpenSpecEdit } = useContext(DataContext)
    let [cena,setCena] = useState(0)
    useEffect(()=>{

        try {
        
        
        
            setCena(specifikacijaAr.cenaVozila.toLocaleString())            

            
        } catch (error) {

        }

    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    let und = specifikacijaAr===undefined
    return (
        <div>
            {openSpecEdit && <EditSpecifikacija />}
        <table className="tg">
            <thead>
                <tr>
                    <th colSpan="4" >Specifikacija</th>
                </tr>
            </thead>
            <tbody>
                <tr><td className="specTd" >Br. šasije</td><td>{und ? "/" : specifikacijaAr.brSasije}</td><td className="specTd" >Br. motora</td><td>{und ? "/" : specifikacijaAr.brMotora}</td></tr>
                <tr><td className="specTd" >Godište</td><td>{und ? "/" : specifikacijaAr.godiste}</td><td className="specTd" >Boja</td><td>{und ? "/" : specifikacijaAr.boja}</td></tr>
                <tr><td className="specTd" >Datum kupovine</td><td >{und ? "/" : formatDate(specifikacijaAr.datumKupovine)}</td><td className="specTd">Cena vozila</td><td>{und ? "/" : cena}</td></tr>
                <tr className="docum"><td className="specTd" >Dokumentacija</td><td>{und ? "/" : specifikacijaAr.dokumentacija || "/" }</td></tr>
                <tr><td><button className="editBtn spec" onClick={setOpenSpecEdit}><i className="fas fa-edit"></i> IZMENI</button></td></tr>

            </tbody>
        </table>
        </div>
    )
}