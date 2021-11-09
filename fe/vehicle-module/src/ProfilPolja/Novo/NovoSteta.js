import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../../style/new.css"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import {useParams} from "react-router-dom"


export const NovoSteta = () => {
let { newOn,setNewOn,valid,setValid, spinerOn, setSpinerOn,formatDateEdit, setOpenDmgEdit, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, id } = useContext(DataContext)


    let {carId} = useParams()

    const handleSubmit = async() => {
        let verifyDesc = desc.length > 2
        let verifyDate = date !== 0
        let verifyParts = parts.length > 2
        let verifyTotal = total > 1

        if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
            await axios.post("http://localhost:5000/api/v1/steta/new/" + carId, { desc, pokriva, date, parts, total, usluga, time }).then(res => {
                if(res.data!=="success"){
                    alert("error")
                    console.log(res.data)
                    return
                }
                setOpenDmgEdit(false)
                setValid(true)
                setSpinerOn(false)
                console.log(res.data)
            }).catch(err => {
                setSpinerOn(false)
                console.log(err)
            })
        } else {
            setSpinerOn(false)
            setValid(false)
        }
    }


    const handleCancel = () => {
        setDesc("")
        setPokriva("Zaposleni")
        setDate(0)
        setTotal(0)
        setUsluga("/")
        setTime("/")
        setParts("")
        setNewOn(false)
    }



    
    return (
        <div className="editCont">
            {spinerOn && <Spiner/>}
            <h3 className="editTitle">Unos nove stavke</h3>
                <div className="containerInput">


                <div className="kontejner txtc">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setDesc(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Opis štete</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <select name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setPokriva(e.target.value)}>
                            <option>Zaposleni</option>
                            <option>Firma</option>
                            <option>Osiguranje</option>
                            <option>Drugo lice</option>
                        </select>
                        <label for="ime" class="labela">
                            <p className="sp">Štetu pokriva</p>
                        </label>
                    </div>


                    <div className="kontejner">
                    <input type="date" name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setDate(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Datum</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="text" className="inp" autocomplete="off" required  onChange={(e)=>setParts(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Delovi/Usluga</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="text" className="inp" autocomplete="off" required onChange={(e)=>setTotal(e.target.value)} />
                        <label for="ime" class="labela">
                            <p className="sp">Ukupan trošak</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setUsluga(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Usluga zaposlenog</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setTime(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Vreme zaposlenog</p>
                        </label>
                    </div>
                    

                </div>
                <div className="btnsContainer">
                    <button className="btn yes " onClick={handleSubmit}>SAČUVAJ</button>
                    <button className="btn no " onClick={handleCancel}>OTKAŽI</button>
                </div>
                {!valid && <h3 className="nonValid-new">Uneti podaci nisu validni</h3>}
            </div>
            )

}