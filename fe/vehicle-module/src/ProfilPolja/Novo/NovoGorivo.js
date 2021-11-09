import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../../style/new.css"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import {useParams} from "react-router-dom"


export const NovoGorivo = () => {
let { valid,setValid,newOn,setNewOn, spinerOn, setSpinerOn, formatDateEdit, setDateReg, dateReg, verDate, setOpenFuelEdit, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, id} = useContext(DataContext)


    let {carId} = useParams()

    const handleSubmit = async() => {
        setSpinerOn(true)
        let verifyDateFuel = verDate(dateFuel)
        let verifyKmFuel = kmFuel > 0
        let verifyPotrosnja = (type === "Gorivo" && potrosnja > 5) || type !== "Gorivo"
        let verifyPriceFuel = priceFuel > 100

        if (verifyDateFuel && verifyKmFuel && verifyPotrosnja && verifyPriceFuel) {
            await axios.post("http://localhost:5000/api/v1/gorivo/new/" + carId, {  type, dateFuel, kmFuel, potrosnja, priceFuel, uslugaFuel, timeFuel }).then(res => {
                if(res.data!=="success"){
                    alert("error")
                    console.log(res.data)
                    return
                }
                setNewOn(false)
                setValid(true)
                setSpinerOn(false)
            }).catch(er => {
                setSpinerOn(false)
                console.log(er)
                alert(er)})
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyDateFuel,verifyKmFuel,verifyPotrosnja,verifyPriceFuel)
            
        }
    }


    const handleCancel = () => {
        setType("Gorivo")
        setDateFuel(0)
        setKmFuel("")
        setPotrosnja("")
        setPriceFuel("")
        setUslugaFuel("")
        setTimeFuel("")
        setOpenFuelEdit(false)
        setNewOn(false)
    }



    
    return (
        <div className="editCont">
            {spinerOn && <Spiner/>}
            <h3 className="editTitle">Unos nove stavke</h3>
                <div className="containerInput">

                    <div className="kontejner">
                        <select name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setType(e.target.value)}>
                            <option>Gorivo</option>
                            <option>Tag</option>
                            <option>Pranje</option>
                        </select>
                        <label for="ime" class="labela">
                            <p className="sp">Tip</p>
                        </label>
                    </div>

                    <div className="kontejner txtc">
                    <input type="date" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setDateFuel(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Datum</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="ime" className="inp" autocomplete="off" required  onChange={(e)=>setKmFuel(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Kilometraža</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="text" className="inp" autocomplete="off" required  onChange={(e)=>setPotrosnja(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Potrošnja</p>
                        </label>
                    </div>

                    <div className="kontejner">
                    <input type="number" name="text" className="inp" autocomplete="off" required onChange={(e)=>setPriceFuel(e.target.value)} />
                        <label for="ime" class="labela">
                            <p className="sp">Cena</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setUslugaFuel(e.target.value)}/>
                        <label for="ime" class="labela">
                            <p className="sp">Usluga zaposlenog</p>
                        </label>
                    </div>

                    <div className="kontejner">
                        <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e)=>setTimeFuel(e.target.value)}/>
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