import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../../style/new.css"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import {useParams} from "react-router-dom"


export const NovoRegistracija = () => {
let { valid,setValid,newOn,setNewOn,spinerOn,setSpinerOn, setOpenRegEdit, verDate, formatDateEdit, id, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    let dateNewReg=useRef(null)
    let docNewReg = useRef(null)
    let trsokoviNewReg = useRef(null)
    let registrovaoNewReg=useRef(null)
    let timeNewReg = useRef(null)
    let regDoNewReg = useRef(null)
    let {carId} = useParams()

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyReg = registrovao.length > 2
        let verifyTime = timeZaposleni.length > 2
        let verifyDo = verDate(regDo)
        if (verifyDate && verifyDoc && verifyTroskovi && verifyReg && verifyTime && verifyDo) {
            axios.post("http://localhost:5000/api/v1/registracija/new/"+carId, { dateReg, docReg, troskovi, registrovao, timeZaposleni, regDo }).then(res => {
            setSpinerOn(false)
            setValid(true)
                setOpenRegEdit(false)
            }).catch(er => {
                setSpinerOn(false)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyDate,verifyDoc,verifyTroskovi,verifyReg,verifyTime,verifyDo)
        }
    }

    
    return (
        <div className="editCont">
            {spinerOn && <Spiner/>}
            <h3 className="editTitle">Unos nove stavke</h3>
                <div className="containerInput">

                    <div className="kontejner">
                        <input type="date" name="ime" className="inp" autocomplete="off" required  ref={dateNewReg} onChange={(e)=>setDateReg(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Datum registracije</p>
                        </label>
                    </div>

                    <div className="kontejner txtc">
                        <textarea nameName="ime" className="inp" autocomplete="off" required ref={docNewReg} onChange={(e)=>setDocReg(e.target.value)}></textarea>
                        <label for="ime" class="labela">
                            <p className="sp txts">Dokumentacija</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="ime" className="inp" autocomplete="off" required  ref={trsokoviNewReg} onChange={(e)=>setTroskovi(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Troškovi registracije</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="text" name="text" className="inp" autocomplete="off" required  ref={registrovaoNewReg} onChange={(e)=>setRegistrovao(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Registrovao zaposleni</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="text" name="text" className="inp" autocomplete="off" required ref={timeNewReg} onChange={(e)=>setTimeZaposleni(e.target.value)} />
                        <label for="ime" class="labela">
                            <p className="sp">Vreme zaposlenog</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="date" name="ime" className="inp" autocomplete="off" required ref={regDoNewReg} onChange={(e)=>setRegDo(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Registrovan do</p>
                        </label>
                    </div>
                    

                </div>
                <div className="btnsContainer">
                    <button className="btn yes " onClick={handleSubmit}>SAČUVAJ</button>
                    <button className="btn no " onClick={()=>setNewOn(false)}>OTKAŽI</button>
                </div>
                {!valid && <h3 className="nonValid-new">Uneti podaci nisu validni</h3>}
            </div>
            )

}