import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import { Spiner } from "./Spiner"
export const EditSteta = ({ stetaAr }) => {

    let { spinerOn,setSpinerOn,formatDateEdit, setOpenDmgEdit, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, id } = useContext(DataContext)
    let [valid, setValid] = useState(true)


    let opisRef = useRef(null)
    let pokrivaRef = useRef(null)
    let datumRef = useRef(null)
    let deloviRef = useRef(null)
    let totalRef = useRef(null)
    let uslugaRef = useRef(null)
    let timeRef = useRef(null)
    let { carId } = useParams()


    useEffect(() => {
        let steta = stetaAr.find(item => item._id === id)

        setDesc(steta.opisStete)
        setPokriva(steta.stetuPokriva)
        setDate(steta.datum)
        setParts(steta.deloviUsluga)
        setTotal(steta.ukupanTrosak)
        setUsluga(steta.uslugaZaposlenog)
        setTime(steta.vremeZaposlenog)

        opisRef.current.value = steta.opisStete
        pokrivaRef.current.value = steta.stetuPokriva
        datumRef.current.value = formatDateEdit(steta.datum)
        deloviRef.current.value = steta.deloviUsluga
        totalRef.current.value = steta.ukupanTrosak
        uslugaRef.current.value = steta.uslugaZaposlenog
        timeRef.current.value = steta.vremeZaposlenog
        setSpinerOn(false)
    }, [])

    const handleSubmit = () => {
        let verifyDesc = desc.length > 2
        let verifyDate = date !== 0
        let verifyParts = parts.length > 2
        let verifyTotal = total > 1

        if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
            axios.patch("http://localhost:5000/api/v1/steta/" + carId, { id, desc, pokriva, date, parts, total, usluga, time }).then(res => {
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
        setOpenDmgEdit(false)
        setValid(true)

    }

    return (
        <div class="input--container">
            {spinerOn && <Spiner />}
            <h3 class="input--container__title">Šteta</h3>
            <div className="form">

            <div class="single-input-container">
                    <label for="opis-steta" class="standard--label">Opis štete</label>
                    <input ref={opisRef} type="text" onChange={(e) => setDesc(e.target.value)} class="standard--input" id="opis-steta" name="opis-steta" />
                </div>

                <div class="single-input-container">
                    <label for="steta-pokriva" class="standard--label">Štetu pokriva</label>
                    <select ref={pokrivaRef} onChange={e => setPokriva(e.target.value)} class="standard--input" id="steta-pokriva" name="steta-pokriva" >
                        <option>Zaposleni</option>
                        <option>Fima</option>
                        <option>Osiguranje</option>
                        <option>Drugo lice</option>
                    </select>
                </div>

                <div class="single-input-container">
                    <label for="datum-steta" class="standard--label">Datum</label>
                    <input ref={datumRef} type="date" onChange={(e) => setDate(e.target.value)} class="standard--input" id="datum-steta" name="datum-steta" />
                </div>

                <div class="single-input-container">
                    <label for="delovi-steta" class="standard--label"> Delovi/Usluga</label>
                    <input ref={deloviRef} onChange={(e) => setParts(e.target.value)} type="text" class="standard--input" id="delovi-steta" name="delovi-steta"/>
  
                </div>

                <div class="single-input-container">
                    <label for="trosak-steta" class="standard--label">Ukupan trošak</label>
                    <input ref={totalRef} onChange={(e) => setTotal(e.target.value)} type="number" class="standard--input" id="trosak-steta" name="trosak-steta" />
                </div>

                <div class="single-input-container">
                    <label for="usluga-zaposlenog-steta" class="standard--label">Usluga zaposlenog</label>
                    <input ref={uslugaRef} onChange={(e) => setUsluga(e.target.value)} type="text" class="standard--input" id="usluga-zaposlenog-steta" name="usluga-zaposlenog-steta" />
                </div>

                <div class="single-input-container">
                    <label for="vreme-zaposlenog-steta" class="standard--label">Vreme zaposlenog</label>
                    <input ref={timeRef} onChange={(e) => setTime(e.target.value)} type="text" class="standard--input" id="vreme-zaposlenog-steta" name="vreme-zaposlenog-steta" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
        )
}