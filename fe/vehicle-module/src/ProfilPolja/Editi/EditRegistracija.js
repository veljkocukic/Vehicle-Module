import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"

export const EditRegistracija = ({ registracijaAr, regId, carId }) => {
    let { spinerOn, setSpinerOn, setOpenRegEdit, verDate, formatDateEdit, id, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)
    let cond = registracijaAr.length===1
    let [valid, setValid] = useState(true)
    let regDateRef = useRef(null)
    let regDocRef = useRef(null)
    let regTrosRef = useRef(null)
    let regZapRef = useRef(null)
    let regTimeRef = useRef(null)
    let regRegDoRef = useRef(null)

    useEffect(() => {
        let reg = registracijaAr.find(item => item._id === regId)
        setDateReg(cond ? "" : reg.datum)
        regDateRef.current.value = cond ? "" : formatDateEdit(reg.datum)

        setDocReg(cond ? "" : reg.dokumentacija)
        regDocRef.current.value = cond ? "" : reg.dokumentacija

        setTroskovi(cond ? 0 : reg.cena)
        regTrosRef.current.value = cond ? 0 : reg.cena

        setRegistrovao(cond ? "" : reg.registrovaoZaposleni)
        regZapRef.current.value = cond ? "" : reg.registrovaoZaposleni

        setTimeZaposleni(cond ? 0 : reg.vremeZaposlenog)
        regTimeRef.current.value = cond ? 0 : reg.vremeZaposlenog

        setRegDo(cond ? 0 : reg.registrovanDo)
        regRegDoRef.current.value = cond ? 0 : formatDateEdit(reg.registrovanDo)

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
                window.location.reload()
            }).catch(er => {
                setSpinerOn(false)
                console.log(carId)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(regDo)
            console.log(verifyDate, verifyDoc, verifyTroskovi, verifyReg, verifyTime, verifyDo)
        }
    }


    const handleCancel = () => {

        setValid(true)
        setOpenRegEdit(false)

    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Registracija</h3>
            <div className="form">

                <div className="single-input-container">
                    <label htmlFor="datum-registracije" className="standard--label">Datum registracije <span>*</span></label>
                    <input onBlur={e=>!verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={regDateRef} onChange={e => setDateReg(e.target.value)} type="date" className="standard--input" id="datum-registracije" name="datum-registracije" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="troskovi-registracije" className="standard--label">Troškovi registracije <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="number" ref={regTrosRef} onChange={(e) => setTroskovi(e.target.value)} className="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovao-zaposleni" className="standard--label">Registrovao zaposleni <span>*</span></label>
                    <input onBlur={e=>e.target.value.length<3 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={regZapRef} onChange={(e) => setRegistrovao(e.target.value)} type="text" className="standard--input" id="registrovao-zaposleni" name="registrova-zaposleni" />

                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog" className="standard--label">Vreme zaposlenog <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={regTimeRef} onChange={(e) => setTimeZaposleni(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovan-do" className="standard--label">Registrovan do <span>*</span></label>
                    <input onBlur={e=> !verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={regRegDoRef} onChange={(e) => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="dokumentacija" className="standard--label">Dokumentacija <span>*</span></label>
                    <textarea onBlur={e=>e.target.value.length<3 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={regDocRef} onChange={(e) => setDocReg(e.target.value)} className="standard--input" id="dokumentacije" name="dokumentacija" ></textarea>
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