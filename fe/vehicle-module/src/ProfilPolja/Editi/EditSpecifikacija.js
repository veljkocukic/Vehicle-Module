import React, { useState, useRef, useEffect, useContext } from "react"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import axios from "axios"
import { Spiner } from "./Spiner"

export const EditSpecifikacija = () => {
    let { spinerOn,setSpinerOn,formatDateEdit, verDate, setOpenSpecEdit, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume } = useContext(DataContext)

    let [valid, setValid] = useState(true)
    let sasijaRef = useRef(null)
    let brMotRef = useRef(null)
    let godisteRef = useRef(null)
    let bojaRef = useRef(null)
    let datumRef = useRef(null)
    let cenaRef = useRef(null)
    let documRef = useRef(null)
    let { carId } = useParams()

    useEffect(() => {

        sasijaRef.current.value = sasija
        brMotRef.current.value = motor
        godisteRef.current.value = godiste
        bojaRef.current.value = boja
        datumRef.current.value = formatDateEdit(dateKup)
        cenaRef.current.value = cenaVoz
        documRef.current.value = docume

    }, [])



    let handleSubmit = () => {
        setSpinerOn(true)
        let verifySasija = sasija.length > 10
        let verifyMotor = motor.length > 4
        let verifyGodiste = godiste > 1950
        let verifyBoja = boja.length > 2
        let verifyDateKup = verDate(dateKup)
        let verifyCenaVoz = cenaVoz > 0
        let verifyDocume = docume.length > 5
        if (verifySasija && verifyMotor && verifyGodiste && verifyBoja && verifyDateKup && verifyCenaVoz && verifyDocume) {
            axios.patch("http://localhost:5000/api/v1/specifikacija/" + carId, { sasija, motor, godiste, boja, dateKup, cenaVoz, docume }).then(res => {
                console.log(res)
                setValid(true)
                setSpinerOn(false)
                setOpenSpecEdit(false)
            }).catch(er =>{
                setSpinerOn(false)
                console.log(er)})

        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(
                verifySasija,
                verifyMotor,
                verifyGodiste,
                verifyBoja,
                verifyDateKup,
                verifyCenaVoz,
                verifyDocume
            )
        }
    }

    let handleCancel = () => {
        setOpenSpecEdit(false)
    }
    return (
        <table className="tg editTable">
            {spinerOn && <Spiner />}
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
                <tr><td><button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button></td><td><button className="btn yes" onClick={handleSubmit}> <i class="far fa-save"></i>SAČUVAJ</button></td></tr>
                {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
            </tbody>
        </table>)
}