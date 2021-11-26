import React, { useContext, useState } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"
import { ZaposleniLista } from "./ZaposleniLista"

export const NovoRegistracija = ({ newC }) => {
    let { valid, setValid, setNewOn, spinerOn, setSpinerOn, verDate,dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    let { carId } = useParams()
    let [dateFalse,setDateFalse] = useState(false)
    let [docFalse,setDocFalse] = useState(false)
    let [trosFalse,setTrosFalse] = useState(false)
    let [regFalse,setRegFalse] = useState(false)
    let [timeFalse,setTimeFasle] = useState(false)
    let [doFalse,setDoFalse]  = useState(false)


    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 3
        let verifyTroskovi = troskovi > 0
        let verifyRegistrovao = registrovao.length > 2
        let verifyTime = timeZaposleni>0
        let verifyDo = verDate(regDo)
        if (verifyDate && verifyDoc && verifyTroskovi && verifyRegistrovao && verifyTime && verifyDo) {
            await axios.post("http://localhost:5000/api/v1/registracija/new/" + carId, { dateReg, docReg, troskovi, registrovao, timeZaposleni, regDo }).then(res => {
                if (res.data !== "success") {
                    alert("error")
                    console.log(res.data)
                    return
                }
                setSpinerOn(false)
                setValid(true)
                setNewOn(false)
                window.location.reload()
            }).catch(er => {
                setSpinerOn(false)
                alert(er)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            !verifyDate ? setDateFalse(true) : setDateFalse(false)
            !verifyDoc ? setDocFalse(true) : setDocFalse(false)
            !verifyTroskovi ? setTrosFalse(true) : setTrosFalse(false)
            !verifyRegistrovao ? setRegFalse(true) : setTrosFalse(false)
            !verifyTime ? setTimeFasle(true) : setTimeFasle(false)
            !verifyDo ? setDoFalse(true) : setDoFalse(false)

            console.log(verifyDate, verifyDoc, verifyTroskovi, verifyRegistrovao, verifyTime, verifyDo)
        }
    }

    const handleCancel=()=>{

        setValid(true)
        setNewOn(false)
    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Registracija</h3>
            <div className="form">

                <div className="single-input-container">
                    <label htmlFor="datum-registracije" className="standard--label">Datum registracije <span>*</span></label>
                    <input style={{border:dateFalse&&"1px solid red"}} onBlur={e=>!verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false) } onChange={e => setDateReg(e.target.value)} type="date" className="standard--input" id="datum-registracije" name="datum-registracije" />
                    { dateFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>


                <div className="single-input-container">
                    <label htmlFor="troskovi-registracije" className="standard--label">Troškovi registracije <span>*</span></label>
                    <input style={{border:trosFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value<=0 ? setTrosFalse(true) : setTrosFalse(false)} type="number" onChange={(e) => setTroskovi(e.target.value)} className="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                    { trosFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovao-zaposleni" className="standard--label">Registrovao zaposleni <span>*</span></label>
                    <ZaposleniLista type="reg" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog" className="standard--label">Vreme zaposlenog <span>*</span></label>
                    <input style={{border:timeFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value<=0 ? setTimeFasle(true) : setTimeFasle(false)} onChange={(e) => setTimeZaposleni(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                    { timeFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovan-do" className="standard--label">Registrovan do <span>*</span></label>
                    <input style={{border:doFalse&&"1px solid red"}} onBlur={e=>!verDate(e.target.value) ? setDoFalse(true) : setDoFalse(false)} onChange={(e) => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                    { doFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="dokumentacija" className="standard--label">Dokumentacija <span>*</span></label>
                    <textarea style={{border:docFalse&&"1px solid red"}} onBlur={e=>e.target.value<4 ? setDocFalse(true) : setDocFalse(false)} onChange={(e) => setDocReg(e.target.value)} className="standard--input" id="dokumentacije" name="dokumentacija" ></textarea>
                    { docFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 3 karaktera</p>}
                </div>

            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu bili validni</h3>}
        </div>
    )

}