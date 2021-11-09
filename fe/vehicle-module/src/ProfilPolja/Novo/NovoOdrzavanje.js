import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../../style/new.css"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import {useParams} from "react-router-dom"


export const NovoOdrzavanje = () => {
let { valid,setValid,newOn,setNewOn, spinerOn, setSpinerOn, id, formatDateEdit, setOpenOdrEdit, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr} = useContext(DataContext)


    let {carId} = useParams()

    const handleSubmit = async() => {
        setSpinerOn(true)
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 10
        let verifyPartsOdr = partsOdr.length > 2
        let verifyTotalOdr = totalOdr > 10

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {
            await axios.post("http://localhost:5000/api/v1/odrzavanje/new/" + carId, { typeOdr, dateOdr, kmOdr, partsOdr, totalOdr, uslugaOdr, timeOdr }).then(res => {
                if(res.data!=="success"){
                    alert("error")
                    console.log(res.data)
                    return
                }
                setValid(true)
                setSpinerOn(false)
                setNewOn(false)
            }).catch(err => {
                setSpinerOn(false)
                console.log(err)})
        } else {
            setSpinerOn(false)
            setValid(false)
            console.log(verifyDateOdr,verifyKmOdr,verifyPartsOdr,verifyTotalOdr)
        }
    }


    const handleCancel = () => {
        setTypeOdr("Redovno")
        setDateOdr(0)
        setKmOdr(0)
        setPartsOdr("")
        setTotalOdr(0)
        setUslugaOdr(0)
        setTimeOdr(0)
        setNewOn(false)
    }



    
    return (
        <div className="editCont">
            {spinerOn && <Spiner/>}
            <h3 className="editTitle">Unos nove stavke</h3>
                <div className="containerInput">

                    <div className="kontejner">
                        <select name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setTypeOdr(e.target.value)}>
                            <option>Redovno</option>
                            <option>Vanredno</option>
                            <option>Higijena</option>
                            <option>Gume</option>
                        </select>
                        <label for="ime" class="labela">
                            <p className="sp">Tip</p>
                        </label>
                    </div>

                    <div className="kontejner txtc">
                    <input type="date" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setDateOdr(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Datum</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setKmOdr(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Kilometraža</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="text" name="text" className="inp" autocomplete="off" required  onChange={(e)=>setPartsOdr(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Delovi / Usluga</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="text" className="inp" autocomplete="off" required onChange={(e)=>setTotalOdr(e.target.value)} />
                        <label for="ime" class="labela">
                            <p className="sp">Ukupan trošak</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setUslugaOdr(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Usluga zaposlenog</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setTimeOdr(e.target.value)}/>
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