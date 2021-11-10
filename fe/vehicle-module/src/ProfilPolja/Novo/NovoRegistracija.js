import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../../style/new.css"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import {useParams} from "react-router-dom"


export const NovoRegistracija = ({newC}) => {
let { valid,setValid,newOn,setNewOn,spinerOn,setSpinerOn, setOpenRegEdit, verDate, formatDateEdit, id, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    let {carId} = useParams()

    const handleSubmit = async() => {
        setSpinerOn(true)
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyReg = registrovao.length > 2
        let verifyTime = timeZaposleni.length > 2
        let verifyDo = verDate(regDo)
        if (verifyDate && verifyDoc && verifyTroskovi && verifyReg && verifyTime && verifyDo) {
            await axios.post("http://localhost:5000/api/v1/registracija/new/"+carId, { dateReg, docReg, troskovi, registrovao, timeZaposleni, regDo }).then(res => {
                if(res.data!=="success"){
                    alert("error")
                    console.log(res.data)
                    return
                }
                setSpinerOn(false)
                setValid(true)
                setNewOn(false)
            }).catch(er => {
                setSpinerOn(false)
                alert(er)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyDate,verifyDoc,verifyTroskovi,verifyReg,verifyTime,verifyDo)
        }
    }
    
    return (
        <div class={newC ? "input-contaier newC":"input--container"}>
            {spinerOn && <Spiner />}
            <h3 class="input--container__title">Registracija</h3>
            <div class="form">

                <div class="single-input-container">
                    <label for="datum-registracije" class="standard--label">Datum registracije</label>
                    <input onChange={e => setDateReg(e.target.value)} type="date" class="standard--input" id="datum-registracije" name="datum-registracije" />
                </div>

                <div class="single-input-container">
                    <label for="dokumentacija" class="standard--label">Dokumentacija</label>
                    <input type="text" onChange={(e) => setDocReg(e.target.value)} class="standard--input" id="dokumentacije" name="dokumentacija" />
                </div>

                <div class="single-input-container">
                    <label for="troskovi-registracije" class="standard--label">Troškovi registracije</label>
                    <input type="number" onChange={(e) => setTroskovi(e.target.value)} class="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                </div>

                <div class="single-input-container">
                    <label for="registrovao-zaposleni" class="standard--label">Registrovao zaposleni</label>
                    <input onChange={(e) => setRegistrovao(e.target.value)} type="text" class="standard--input" id="registrovao-zaposleni" name="registrova-zaposleni"/>
  
                </div>

                <div class="single-input-container">
                    <label for="vreme-zaposlenog" class="standard--label">Vreme zaposlenog</label>
                    <input onChange={(e) => setTimeZaposleni(e.target.value)} type="text" class="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                </div>

                <div class="single-input-container">
                    <label for="registrovan-do" class="standard--label">Registrovan do</label>
                    <input onChange={(e) => setRegDo(e.target.value)} type="date" class="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>
            </div>

           <div className="input--container__btns">
                <button onClick={() => setNewOn(false)} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
            )

}