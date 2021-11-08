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
    }

    return (
        <table className="tg editTable">
            {spinerOn && <Spiner />}
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Opis štete </td><td><input type="text" onChange={(e) => setDesc(e.target.value)} ref={opisRef} /></td></tr>
                <tr><td>Štetu pokriva </td><td><select onChange={(e) => setPokriva(e.target.value)} ref={pokrivaRef}><option>Zaposleni</option><option>Firma</option><option>Osiguranje</option><option>Drugo lice</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDate(e.target.value)} ref={datumRef} /></td></tr>
                <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e) => setParts(e.target.value)} ref={deloviRef} /></td></tr>
                <tr><td>Ukupan trošak</td><td><input type="number" onChange={(e) => setTotal(e.target.value)} ref={totalRef} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUsluga(e.target.value)} ref={uslugaRef} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e) => setTime(e.target.value)} ref={timeRef} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}