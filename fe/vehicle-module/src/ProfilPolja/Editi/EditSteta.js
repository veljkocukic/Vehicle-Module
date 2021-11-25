import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import { Spiner } from "./Spiner"
import { ZaposleniLista } from "../Novo/ZaposleniLista"
export const EditSteta = ({ stetaAr }) => {

    let { verDate,spinerOn, setSpinerOn, formatDateEdit, setOpenDmgEdit, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, id } = useContext(DataContext)
    let [valid, setValid] = useState(true)


    let opisRef = useRef(null)
    let pokrivaRef = useRef(null)
    let datumRef = useRef(null)
    let deloviRef = useRef(null)
    let totalRef = useRef(null)
    let uslugaRef = useRef(null)
    let timeRef = useRef(null)
    let { carId } = useParams()
    let [descFalse,setDescFalse] = useState(false)
    let [dateFalse,setDateFalse] = useState(false)
    let [partsFalse,setPartsFalse] = useState(false)
    let [totalFalse,setTotalFalse] = useState(false)


    useEffect(() => {
        let steta = stetaAr.find(item => item._id === id)

        setDesc(steta.opisStete)
        setPokriva(steta.stetuPokriva)
        setDate(steta.datum)
        setParts(steta.deloviUsluga)
        setTotal(steta.cena)
        setUsluga(steta.uslugaZaposlenog)
        setTime(steta.vremeZaposlenog)

        opisRef.current.value = steta.opisStete
        pokrivaRef.current.value = steta.stetuPokriva
        datumRef.current.value = formatDateEdit(steta.datum)
        deloviRef.current.value = steta.deloviUsluga
        totalRef.current.value = steta.cena
        uslugaRef.current.value = steta.uslugaZaposlenog
        timeRef.current.value = steta.vremeZaposlenog
        setSpinerOn(false)
    }, [])

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifyDesc = desc.length > 2
        let verifyDate = date !== 0
        let verifyParts = parts.length > 2
        let verifyTotal = total > 1

        if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
            axios.patch("http://localhost:5000/api/v1/steta/" + carId, { id, desc, pokriva, date, parts, total, usluga, time }).then(res => {
                setOpenDmgEdit(false)
                setValid(true)
                setSpinerOn(false)
                window.location.reload()
            }).catch(err => {
                setSpinerOn(false)
                console.log(err)
            })
        } else {
            !verDate ? setDateFalse(true) : setDateFalse(false)
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
        setOpenDmgEdit(false)
        setValid(true)

    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Šteta</h3>
            <div className="form">

                <div className="single-input-container">
                    <label htmlFor="opis-steta" className="standard--label">Opis štete <span>*</span></label>
                    <input style={{border:descFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=4 ? setDescFalse(true) : setDescFalse(false)} ref={opisRef} type="text" onChange={(e) => setDesc(e.target.value)} className="standard--input" id="opis-steta" name="opis-steta" />
                    { descFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 3 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="steta-pokriva" className="standard--label">Štetu pokriva</label>
                    <select ref={pokrivaRef} onChange={e => setPokriva(e.target.value)} className="standard--input" id="steta-pokriva" name="steta-pokriva" >
                        <option>Zaposleni</option>
                        <option>Fima</option>
                        <option>Osiguranje</option>
                        <option>Drugo lice</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-steta" className="standard--label">Datum <span>*</span></label>
                    <input style={{border:dateFalse&&"1px solid red"}} onBlur={e=>!verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false )} ref={datumRef} type="date" onChange={(e) => setDate(e.target.value)} className="standard--input" id="datum-steta" name="datum-steta" />
                    { dateFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="delovi-steta" className="standard--label"> Delovi/Usluga <span>*</span></label>
                    <input style={{border:partsFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=3 ? setPartsFalse(true) : setPartsFalse(false)} ref={deloviRef} onChange={(e) => setParts(e.target.value)} type="text" className="standard--input" id="delovi-steta" name="delovi-steta" />
                    { partsFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 3 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="trosak-steta" className="standard--label">Ukupan trošak <span>*</span></label>
                    <input style={{border:totalFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value<=0 ? setTotalFalse(true) : setTotalFalse(false) } ref={totalRef} onChange={(e) => setTotal(e.target.value)} type="number" className="standard--input" id="trosak-steta" name="trosak-steta" />
                    {totalFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-steta" className="standard--label">Usluga zaposlenog</label>
                    <ZaposleniLista rf={uslugaRef} type="dmg"/>
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-steta" className="standard--label">Vreme zaposlenog</label>
                    <input ref={timeRef} onChange={(e) => setTime(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-steta" name="vreme-zaposlenog-steta" />
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