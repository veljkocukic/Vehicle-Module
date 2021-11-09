import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditSpecifikacija } from "./Editi/EditSpecifikacija"

export const Specifikacija = ({ specifikacijaAr }) => {

    let { formatDate, openSpecEdit, setOpenSpecEdit } = useContext(DataContext)

    return (
        <table className="tg">
            {openSpecEdit && <EditSpecifikacija />}
            <tbody>
                <tr><td className="specTd" >Br. šasija</td><td>{specifikacijaAr.brSasije}</td><td className="specTd" >Br. motora</td><td>{specifikacijaAr.brMotora}</td></tr>
                <tr><td className="specTd" >Godište</td><td>{specifikacijaAr.godiste}</td><td className="specTd" >Boja</td><td>{specifikacijaAr.boja}</td></tr>
                <tr><td className="specTd" >Datum kupovine</td><td >{formatDate(specifikacijaAr.datumKupovine)}</td><td className="specTd">Cena vozila</td><td>{specifikacijaAr.cenaVozila}</td></tr>
                <tr className="docum"><td className="specTd" >Dokumentacija</td><td>{specifikacijaAr.dokumentacija}</td></tr>
                <tr><td><button className="editBtn spec" onClick={setOpenSpecEdit}><i class="fas fa-edit"></i> IZMENI</button></td></tr>

            </tbody>
        </table>
    )
}