import React, { useState, useRef, useContext } from "react"
import { DataContext } from "../Context"
import { EditSpecifikacija } from "./Editi/EditSpecifikacija"

export const Specifikacija = ({ specifikacijaAr }) => {

    let { openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, valid, setValid, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)
    let formatDate = (dt) => { ///////////// Vreme za tabele
        let date = new Date(dt).toLocaleDateString().replaceAll("/", ".")   ///<------------------------------------- Ne prikazuje nas format
        return date + "."
    }


    return (
        <table className="tg">
            {openSpecEdit && <EditSpecifikacija />}
            <tbody>
                <tr><th>Br. šasija</th><td>{specifikacijaAr.brSasije}</td><th>Br. motora</th><td>{specifikacijaAr.brMotora}</td></tr>
                <tr><th>Godište</th><td>{specifikacijaAr.godiste}</td><th>Boja</th><td>{specifikacijaAr.boja}</td></tr>
                <tr><th>Datum kupovine</th><td>{formatDate(specifikacijaAr.datumKupovine)}</td><th>Cena vozila</th><td>{specifikacijaAr.cenaVozila}</td></tr>
                <tr className="docum"><th>Dokumentacija</th><td>{specifikacijaAr.dokumentacija}</td></tr>
                <tr><td><button className="changeSpec" onClick={() => setOpenSpecEdit(true)}>Izmeni</button></td></tr>

            </tbody>
        </table>
    )
}