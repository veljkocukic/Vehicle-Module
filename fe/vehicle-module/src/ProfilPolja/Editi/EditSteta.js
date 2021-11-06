import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"

export const EditSteta = () => {

    let { setOpenDmgEdit, openOdrEdit, setOpenOdrEdit, formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)
    let [valid, setValid] = useState(true)

    const handleSubmit = () => {
        let verifyDesc = desc.length > 2
        let verifyDate = date !== 0
        let verifyParts = parts.length > 2
        let verifyTotal = total > 1

        if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const handleCancel = () => {
        setDesc("")
        setPokriva("Zaposleni")
        setDate(0)
        setTotal(0)
        setUsluga("/")
        setTime("/")
        setParts("")
        setOpenDmgEdit(false)
    }

    return (
        <table className="tg editTable">
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Opis štete </td><td><input type="text" onChange={(e) => setDesc(e.target.value)} /></td></tr>
                <tr><td>Štetu pokriva </td><td><select onChange={(e) => setPokriva(e.target.value)}><option>Zaposleni</option><option>Firma</option><option>Osiguranje</option><option>Drugo lice</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDate(e.target.value)} /></td></tr>
                <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e) => setParts(e.target.value)} /></td></tr>
                <tr><td>Ukupan trošak</td><td><input type="number" onChange={(e) => setTotal(e.target.value)} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUsluga(e.target.value)} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e) => setTime(e.target.value)} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}