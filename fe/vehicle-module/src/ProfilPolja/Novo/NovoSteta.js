import React, { useContext, useState } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"
import { ZaposleniLista } from "./ZaposleniLista"

export const NovoSteta = () => {
    let { verDate,setNewOn, valid, setValid, spinerOn, setSpinerOn, setOpenDmgEdit, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts } = useContext(DataContext)


    let { carId } = useParams()
    let [descFalse,setDescFalse] = useState(false)
    let [dateFalse,setDateFalse] = useState(false)
    let [partsFalse,setPartsFalse] = useState(false)
    let [totalFalse,setTotalFalse] = useState(false)

    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDesc = desc.length > 3
        let verifyDate = verDate(date)
        let verifyParts = parts.length > 3
        let verifyTotal = total > 0

        if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
            await axios.post("http://localhost:5000/api/v1/steta/new/" + carId, { desc, pokriva, date, parts, total, usluga, time }).then(res => {
                if (res.data !== "success") {
                    alert("error")
                    console.log(res.data)
                    return
                }
                setOpenDmgEdit(false)
                setValid(true)
                setSpinerOn(false)
                window.location.reload()

            }).catch(err => {
                setSpinerOn(false)
                console.log(err)
            })
        } else {
            !verifyDate ? setDateFalse(true) : setDateFalse(false)
            !verifyDesc ? setDescFalse(true) : setDescFalse(false)
            !verifyParts ? setPartsFalse(true) : setPartsFalse(false)
            !verifyTotal ? setTotalFalse(true) : setTotalFalse(false)
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
        setValid(true)

    }




    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Šteta</h3>
            <div className="form">

                <div className="single-input-container">
                    <label htmlFor="opis-steta" className="standard--label">Opis štete <span>*</span> </label>
                    <input style={{border:descFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=4 ? setDescFalse(true) : setDescFalse(false)} type="text" onChange={(e) => setDesc(e.target.value)} className="standard--input" id="opis-steta" name="opis-steta" />
                    { descFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 3 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="steta-pokriva" className="standard--label">Štetu pokriva <span>*</span></label>
                    <select onChange={e => setPokriva(e.target.value)} className="standard--input" id="steta-pokriva" name="steta-pokriva" >
                        <option>Zaposleni</option>
                        <option>Fima</option>
                        <option>Osiguranje</option>
                        <option>Drugo lice</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-steta" className="standard--label">Datum <span>*</span></label>
                    <input style={{border:dateFalse&&"1px solid red"}} onBlur={e=>!verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false )} type="date" onChange={(e) => setDate(e.target.value)} className="standard--input" id="datum-steta" name="datum-steta" />
                    { dateFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="delovi-steta" className="standard--label"> Delovi/Usluga <span>*</span></label>
                    <input style={{border:partsFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=3 ? setPartsFalse(true) : setPartsFalse(false)} onChange={(e) => setParts(e.target.value)} type="text" className="standard--input" id="delovi-steta" name="delovi-steta" />
                    { partsFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 3 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="trosak-steta" className="standard--label">Ukupan trošak <span>*</span></label>
                    <input style={{border:totalFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value<=0 ? setTotalFalse(true) : setTotalFalse(false) } onChange={(e) => setTotal(e.target.value)} type="number" className="standard--input" id="trosak-steta" name="trosak-steta" />
                    {totalFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-steta" className="standard--label">Usluga zaposlenog</label>
                    <ZaposleniLista type="dmg" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-steta" className="standard--label">Vreme zaposlenog</label>
                    <input onChange={(e) => setTime(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-steta" name="vreme-zaposlenog-steta" />
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