import React, { useState, useRef, useEffect, useContext } from "react"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import axios from "axios"
import { Spiner } from "./Spiner"

export const EditSpecifikacija = () => {
    let { setNewOn, spinerOn, setSpinerOn, formatDateEdit, verDate, setOpenSpecEdit, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume } = useContext(DataContext)

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
                window.location.reload()
            }).catch(er => {
                setSpinerOn(false)
                console.log(er)
            })

        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifySasija, verifyMotor , verifyGodiste , verifyBoja , verifyDateKup , verifyCenaVoz , verifyDocume)
        }
    }

    let handleCancel = () => {
        setOpenSpecEdit(false)
        setNewOn(false)
        setValid(true)

    }
    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Specifikacija</h3>
            <div className="form">

                <div className="single-input-container">
                    <label for="broj-sasije" className="standard--label">Broj šasije</label>
                    <input ref={sasijaRef} type="text" onChange={(e) => setSasija(e.target.value)} className="standard--input" id="broj-sasije" name="broj-sasije" />
                </div>

                <div className="single-input-container">
                    <label for="broj-motora" className="standard--label">Broj motora</label>
                    <input ref={brMotRef} type="text" onChange={e => setMotor(e.target.value)} className="standard--input" id="broj-motora" name="broj-motora" />
                </div>

                <div className="single-input-container">
                    <label for="godiste" className="standard--label">Godište</label>
                    <input ref={godisteRef} type="number" onChange={(e) => setGodiste(e.target.value)} className="standard--input" id="godiste" name="godiste" />
                </div>

                <div className="single-input-container">
                    <label for="boja" className="standard--label">Boja</label>
                    <input ref={bojaRef} onChange={(e) => setBoja(e.target.value)} type="text" className="standard--input" id="boja" name="boja" />
                </div>

                <div className="single-input-container">
                    <label for="datum-kupovine" className="standard--label">Datum kupovine</label>
                    <input ref={datumRef} onChange={(e) => setDateKup(e.target.value)} type="date" className="standard--input" id="datum-kupovine" name="datum-kupovine" />
                </div>

                <div className="single-input-container">
                    <label for="cena-vozila" className="standard--label">Cena vozila</label>
                    <input ref={cenaRef} onChange={(e) => setCenaVoz(e.target.value)} type="number" className="standard--input" id="cena-vozila" name="cena-vozila" />
                </div>

                <div className="single-input-container textarea-specifikacija">
                    <label for="dokumentacija" className="standard--label">Dokumentacija</label>
                    <textarea ref={documRef} onChange={(e) => setDocume(e.target.value)} className="standard--input" id="dokumentacija" name="dokumentacija" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div >
    )
}