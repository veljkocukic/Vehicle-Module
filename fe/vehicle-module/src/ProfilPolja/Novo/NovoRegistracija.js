import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"


export const NovoRegistracija = ({ newC }) => {
    let { valid, setValid, setNewOn, spinerOn, setSpinerOn, verDate,dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    let { carId } = useParams()

    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyRegistrovao = registrovao.length > 2
        let verifyTime = timeZaposleni.length > 2
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
                    <input onBlur={e=>!verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={e => setDateReg(e.target.value)} type="date" className="standard--input" id="datum-registracije" name="datum-registracije" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="troskovi-registracije" className="standard--label">Troškovi registracije <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="number" onChange={(e) => setTroskovi(e.target.value)} className="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovao-zaposleni" className="standard--label">Registrovao zaposleni <span>*</span></label>
                    <input onBlur={e=>e.target.value.length<3 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setRegistrovao(e.target.value)} type="text" className="standard--input" id="registrovao-zaposleni" name="registrova-zaposleni" />

                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog" className="standard--label">Vreme zaposlenog <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setTimeZaposleni(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovan-do" className="standard--label">Registrovan do <span>*</span></label>
                    <input onBlur={e=>!verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="dokumentacija" className="standard--label">Dokumentacija <span>*</span></label>
                    <textarea onBlur={e=>e.target.value<5 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setDocReg(e.target.value)} className="standard--input" id="dokumentacije" name="dokumentacija" ></textarea>
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