import React, { useState, useRef, useEffect, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"


export const EditSpecifikacija = () => {
    let { setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)

    let verDate = (dt) => {
        return ((new Date(dt) > new Date()) && dt !== 0)
    }

    let [valid, setValid] = useState(true)
    let sasijaRef = useRef(null)
    let brMotRef = useRef(null)
    let godisteRef = useRef(null)
    let bojaRef = useRef(null)
    let datumRef = useRef(null)
    let cenaRef = useRef(null)
    let documRef = useRef(null)

    let handleSubmit = () => {
        let verifySasija = sasija.length > 10
        let verifyMotor = motor.length > 4
        let verifyGodiste = godiste > 1950
        let verifyBoja = boja.length > 2
        let verifyDateKup = !verDate(dateKup)
        let verifyCenaVoz = cenaVoz > 0
        let verifyDocume = docume.length > 5
        if (verifySasija && verifyMotor && verifyGodiste && verifyBoja && verifyDateKup && verifyCenaVoz && verifyDocume) {
            setValid(true)
            setOpenSpecEdit(false)
        } else {
            setValid(false)
        }
    }

    let handleCancel = () => {
        setSasija("")
        setMotor("")
        setGodiste(0)
        setBoja("")
        setDateKup(0)
        setCenaVoz(0)
        setDocume("")
        setOpenSpecEdit(false)
    }
    return (
        <table className="tg editTable">
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Broj šasije </td><td>< input ref={sasijaRef} type="text" onChange={(e) => setSasija(e.target.value)} /></td></tr>
                <tr><td>Broj motora </td><td><input ref={brMotRef} type="text" onChange={(e) => setMotor(e.target.value)} /></td></tr>
                <tr><td>Godište </td><td><input ref={godisteRef} type="text" onChange={(e) => setGodiste(e.target.value)} /></td></tr>
                <tr><td>Boja</td><td><input ref={bojaRef} type="text" onChange={(e) => setBoja(e.target.value)} /></td></tr>
                <tr><td>Datum kupovine</td><td><input ref={datumRef} type="date" onChange={(e) => setDateKup(e.target.value)} /></td></tr>
                <tr><td>Cena vozila</td><td><input ref={cenaRef} type="text" onChange={(e) => setCenaVoz(e.target.value)} /></td></tr>
                <tr><td>Dokumentacija</td><td><textarea ref={documRef} onChange={(e) => setDocume(e.target.value)} ></textarea></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" onClick={handleSubmit} >Sačuvaj</button></td></tr>
                {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
            </tbody>
        </table>)
}