import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"


export const EditOdrzavanje = () => {
    let [valid, setValid] = useState(true)
    let { openOdrEdit, setOpenOdrEdit, formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    const handleSubmit = () => {
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 10
        let verifyPartsOdr = partsOdr.length > 2
        let verifyTotalOdr = totalOdr > 10

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {

            setValid(true)
            setOpenOdrEdit(false)
        } else {
            setValid(false)
        }
    }

    const handleCancel = () => {
        setTypeOdr("Redovno")
        setDateOdr(0)
        setKmOdr(0)
        setPartsOdr("")
        setTotalOdr(0)
        setUslugaOdr(0)
        setTimeOdr(0)

        setOpenOdrEdit(false)
    }


    return (
        <table className="tg editTable">
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Tip </td><td><select onChange={(e) => setTypeOdr(e.target.value)} ><option>Redovno</option><option>Vanredno</option><option>Higijena</option><option>Gume</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDateOdr(e.target.value)} /></td></tr>
                <tr><td>Kilometraža </td><td><input type="number" onChange={(e) => setKmOdr(e.target.value)} /></td></tr>
                <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e) => setPartsOdr(e.target.value)} /></td></tr>
                <tr><td>Ukupan trošak</td><td><input type="text" onChange={(e) => setTotalOdr(e.target.value)} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUslugaOdr(e.target.value)} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="text" onChange={(e) => setTimeOdr(e.target.value)} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}