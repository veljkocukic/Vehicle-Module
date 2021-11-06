import React, { useState, useRef, useContext, useEffect } from "react"
import { DataContext } from "../../Context"
import axios from "axios"



export const EditGorivo = () => {
    let { formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)

    let [valid, setValid] = useState(true)


    const handleSubmit = () => {
        let verifyDateFuel = !verDate(dateFuel)
        let verifyKmFuel = kmFuel > 0
        let verifyPotrosnja = (type === "Gorivo" && potrosnja > 5) || type !== "Gorivo"
        let verifyPriceFuel = priceFuel > 100

        if (verifyDateFuel && verifyKmFuel && verifyPotrosnja && verifyPriceFuel) {
            setValid(true)
            setOpenFuelEdit(false)
        } else {
            setValid(false)
        }
    }

    const handleCancel = () => {
        setType("Gorivo")
        setDateFuel(0)
        setKmFuel("")
        setPotrosnja("")
        setPriceFuel("")
        setUslugaFuel("")
        setTimeFuel("")
        setOpenFuelEdit(false)
    }



    return (
        <table className="tg editTable">
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Tip </td><td><select onChange={(e) => setType(e.target.value)}><option>Gorivo</option><option>Tag</option><option>Pranje</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDateFuel(e.target.value)} /></td></tr>
                <tr><td>Kilometraža </td><td><input type="number" onChange={(e) => setKmFuel(e.target.value)} /></td></tr>
                <tr><td>Potrošnja</td><td><input type="number" onChange={(e) => setPotrosnja(e.target.value)} /></td></tr>
                <tr><td>Cena</td><td><input type="number" onChange={(e) => setPriceFuel(e.target.value)} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUslugaFuel(e.target.value)} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e) => setTimeFuel(e.target.value)} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}
