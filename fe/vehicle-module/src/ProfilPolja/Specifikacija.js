import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditSpecifikacija } from "./Editi/EditSpecifikacija"

export const Specifikacija = ({ specifikacijaAr }) => {

    let { formatDate, openSpecEdit, setOpenSpecEdit } = useContext(DataContext)

    return (
        <table className="tg">
            {openSpecEdit && <EditSpecifikacija />}
            <tbody>
                <tr><th>Br. šasija</th><td>{specifikacijaAr.brSasije}</td><th>Br. motora</th><td>{specifikacijaAr.brMotora}</td></tr>
                <tr><th>Godište</th><td>{specifikacijaAr.godiste}</td><th>Boja</th><td>{specifikacijaAr.boja}</td></tr>
                <tr><th>Datum kupovine</th><td>{formatDate(specifikacijaAr.datumKupovine)}</td><th>Cena vozila</th><td>{specifikacijaAr.cenaVozila}</td></tr>
                <tr className="docum"><th>Dokumentacija</th><td>{specifikacijaAr.dokumentacija}</td></tr>
                <tr><td><button className="changeSpec" onClick={setOpenSpecEdit}>Izmeni</button></td></tr>

            </tbody>
        </table>
    )
}