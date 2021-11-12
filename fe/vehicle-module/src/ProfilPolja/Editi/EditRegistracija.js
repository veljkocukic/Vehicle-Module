import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"

export const EditRegistracija = ({ registracijaAr, regId, carId }) => {
    let { spinerOn, setSpinerOn, setOpenRegEdit, verDate, formatDateEdit, id, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)

    let [valid, setValid] = useState(true)
    let regDateRef = useRef(null)
    let regDocRef = useRef(null)
    let regTrosRef = useRef(null)
    let regZapRef = useRef(null)
    let regTimeRef = useRef(null)
    let regRegDoRef = useRef(null)

    useEffect(() => {
        let reg = registracijaAr.find(item => item._id === regId)
        setDateReg(reg.datumRegistracije)
        regDateRef.current.value = formatDateEdit(reg.datumRegistracije)

        setDocReg(reg.dokumentacija)
        regDocRef.current.value = reg.dokumentacija

        setTroskovi(reg.troskoviRegistracije)
        regTrosRef.current.value = reg.troskoviRegistracije

        setRegistrovao(reg.registrovaoZaposleni)
        regZapRef.current.value = reg.registrovaoZaposleni

        setTimeZaposleni(reg.vremeZaposlenog)
        regTimeRef.current.value = reg.vremeZaposlenog

        setRegDo(reg.registrovanDo)
        regRegDoRef.current.value = formatDateEdit(reg.registrovanDo)

    }, [])

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyReg = registrovao.length > 2
        let verifyTime = timeZaposleni.length > 2
        let verifyDo = verDate(regDo)
        if (verifyDate && verifyDoc && verifyTroskovi && verifyReg && verifyTime && verifyDo) {
            axios.patch("http://localhost:5000/api/v1/registracija/" + carId, { id, dateReg, docReg, troskovi, registrovao, timeZaposleni, regDo }).then(res => {
                setSpinerOn(false)
                setValid(true)
                setOpenRegEdit(false)
            }).catch(er => {
                setSpinerOn(false)
                console.log(carId)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
        }
    }


    const handleCancel = () =>{

        setValid(true)
        setOpenRegEdit(false)

    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Registracija</h3>
            <div className="form">

                <div className="single-input-container">
                    <label for="datum-registracije" className="standard--label">Datum registracije</label>
                    <input ref={regDateRef} onChange={e => setDateReg(e.target.value)} type="date" className="standard--input" id="datum-registracije" name="datum-registracije" />
                </div>


                <div className="single-input-container">
                    <label for="troskovi-registracije" className="standard--label">Troškovi registracije</label>
                    <input type="number" ref={regTrosRef} onChange={(e) => setTroskovi(e.target.value)} className="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                </div>

                <div className="single-input-container">
                    <label for="registrovao-zaposleni" className="standard--label">Registrovao zaposleni</label>
                    <input ref={regZapRef}  onChange={(e) => setRegistrovao(e.target.value)} type="text" className="standard--input" id="registrovao-zaposleni" name="registrova-zaposleni"/>
  
                </div>

                <div className="single-input-container">
                    <label for="vreme-zaposlenog" className="standard--label">Vreme zaposlenog</label>
                    <input ref={regTimeRef} onChange={(e) => setTimeZaposleni(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                </div>

                <div className="single-input-container">
                    <label for="registrovan-do" className="standard--label">Registrovan do</label>
                    <input ref={regRegDoRef} onChange={(e) => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>

                <div className="single-input-container">
                    <label for="dokumentacija" className="standard--label">Dokumentacija</label>
                    <textarea ref={regDocRef} onChange={(e) => setDocReg(e.target.value)} className="standard--input" id="dokumentacije" name="dokumentacija" ></textarea>
                </div>
            </div>

            


            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>


    )
}