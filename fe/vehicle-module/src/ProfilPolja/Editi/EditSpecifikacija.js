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



    let [sasijaFalse, setSasijaFalse] = useState(false)
    let [motorFalse, setMotorFalse] = useState(false)
    let [godisteFalse, setGodisteFalse] = useState(false)
    let [bojaFalse, setBojaFalse] = useState(false)
    let [dateFalse, setDateFalse] = useState(false)
    let [cenaFalse, setCenaFalse] = useState(false)

    let handleSubmit = () => {
        setSpinerOn(true)
        let verifySasija = sasija.length > 10
        let verifyMotor = motor.length > 5
        let verifyGodiste = godiste > 1980
        let verifyBoja = boja.length > 2
        let verifyDateKup = verDate(dateKup)
        let verifyCenaVoz = cenaVoz > 0
        //let verifyDocume = docume.length > 5
        if (verifySasija && verifyMotor && verifyGodiste && verifyBoja && verifyDateKup && verifyCenaVoz) {
            axios.patch("https://vehicle-module.herokuapp.com/api/v1/specifikacija/" + carId, { sasija, motor, godiste, boja, dateKup, cenaVoz, docume }).then(res => {
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
            !verifySasija ? setSasijaFalse(true) : setSasijaFalse(false)
            !verifyMotor ? setMotorFalse(true) : setMotorFalse(false)
            !verifyGodiste ? setGodisteFalse(true) : setGodisteFalse(false)
            !verifyBoja ? setBojaFalse(true) : setBojaFalse(false)
            !verifyDateKup ? setDateFalse(true) : setDateFalse(false)
            !verifyCenaVoz ? setCenaFalse(true) : setCenaFalse(false)
            setValid(false)
            setSpinerOn(false)
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
                    <label htmlFor="broj-sasije" className="standard--label">Broj šasije <span>*</span></label>
                    <input style={{ border: sasijaFalse && "1px solid red" }} onBlur={e => e.target.value.length <= 10 ? setSasijaFalse(true) : setSasijaFalse(false)} ref={sasijaRef} type="text" onChange={(e) => setSasija(e.target.value)} className="standard--input" id="broj-sasije" name="broj-sasije" />
                    {sasijaFalse && <p style={{ color: "red", fontSize: ".8em" }}>Broj šasija mora biti duži od 10 karaktera</p>}

                </div>

                <div className="single-input-container">
                    <label htmlFor="broj-motora" className="standard--label">Broj motora <span>*</span></label>
                    <input style={{ border: motorFalse && "1px solid red" }} onBlur={e => e.target.value <= 5 ? setMotorFalse(true) : setMotorFalse(false)} ref={brMotRef} type="text" onChange={e => setMotor(e.target.value)} className="standard--input" id="broj-motora" name="broj-motora" />
                    {motorFalse && <p style={{ color: "red", fontSize: ".8em" }}>Broj motora mora biti duži od 5 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="godiste" className="standard--label">Godište <span>*</span></label>
                    <input style={{ border: godisteFalse && "1px solid red" }} onBlur={e => e.target.value <= 1980 ? setGodisteFalse(true) : setGodisteFalse(false)} ref={godisteRef} type="number" onChange={(e) => setGodiste(e.target.value)} className="standard--input" id="godiste" name="godiste" />
                    {godisteFalse && <p style={{ color: "red", fontSize: ".8em" }}>Godište mora biti veće od 1980</p>}

                </div>

                <div className="single-input-container">
                    <label htmlFor="boja" className="standard--label">Boja <span>*</span></label>
                    <input style={{ border: bojaFalse && "1px solid red" }} onBlur={e => e.target.value.length <= 2 ? setBojaFalse(true) : setBojaFalse(false)} ref={bojaRef} onChange={(e) => setBoja(e.target.value)} type="text" className="standard--input" id="boja" name="boja" />
                    {bojaFalse && <p style={{ color: "red", fontSize: ".8em" }}>Naziv boje mora biti duži od 2 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-kupovine" className="standard--label">Datum kupovine <span>*</span></label>
                    <input style={{ border: dateFalse && "1px solid red" }} onBlur={e => !verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false)} ref={datumRef} onChange={(e) => setDateKup(e.target.value)} type="date" className="standard--input" id="datum-kupovine" name="datum-kupovine" />
                    {dateFalse && <p style={{ color: "red", fontSize: ".8em" }}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="cena-vozila" className="standard--label">Cena vozila <span>*</span></label>
                    <input style={{ border: cenaFalse && "1px solid red" }} onBlur={e => e.target.value <= 0 ? setCenaFalse(true) : setCenaFalse(false)} ref={cenaRef} onChange={(e) => setCenaVoz(e.target.value)} type="number" className="standard--input" id="cena-vozila" name="cena-vozila" />
                    {cenaFalse && <p style={{ color: "red", fontSize: ".8em" }}>Cena vozila mora biti veća od 0</p>}
                </div>

                <div className="single-input-container textarea-specifikacija">
                    <label htmlFor="dokumentacija" className="standard--label">Dokumentacija </label>
                    <textarea ref={documRef} onChange={(e) => setDocume(e.target.value)} className="standard--input" id="dokumentacija" name="dokumentacija" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu bili validni</h3>}
        </div >
    )
}