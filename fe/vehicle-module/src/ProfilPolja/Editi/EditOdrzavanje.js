import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { useParams } from "react-router-dom"

export const EditOdrzavanje = ({ odrzavanjeAr }) => {
    let [valid, setValid] = useState(true)
    let { id, formatDateEdit, setOpenOdrEdit, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr } = useContext(DataContext)

    let tipRef = useRef(null)
    let dateRef = useRef(null)
    let kmRef = useRef()
    let partsRef = useRef()
    let totalRef = useRef()
    let uslugaRef = useRef()
    let timeRef = useRef()
    let { carId } = useParams()

    useEffect(() => {
        console.log(id)
        let odr = odrzavanjeAr.find(item => item._id === id)

        setTypeOdr(odr.tip)
        setDateOdr(odr.datum)
        setKmOdr(odr.kilometraza)
        setPartsOdr(odr.deloviUsluga)
        setTotalOdr(odr.ukupanTrosak)
        setUslugaOdr(odr.uslugaZaposlenog)
        setTimeOdr(odr.vremeZaposlenog)

        tipRef.current.value = odr.tip
        dateRef.current.value = formatDateEdit(odr.datum)
        kmRef.current.value = odr.kilometraza
        partsRef.current.value = odr.deloviUsluga
        totalRef.current.value = odr.ukupanTrosak
        uslugaRef.current.value = odr.uslugaZaposlenog
        timeRef.current.value = odr.vremeZaposlenog


    }, [])

    const handleSubmit = () => {

        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 10
        let verifyPartsOdr = partsOdr.length > 2
        let verifyTotalOdr = totalOdr > 10

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {
            axios.patch("http://localhost:5000/api/v1/odrzavanje/" + carId, { id, typeOdr, dateOdr, kmOdr, partsOdr, totalOdr, uslugaOdr, timeOdr }).then(res => {
                setValid(true)
                setOpenOdrEdit(false)
                console.log(res)
            }).catch(err => console.log(err))
        } else {
            setValid(false)
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

        setOpenOdrEdit(false)
    }


    return (
        <table className="tg editTable">
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Tip </td><td><select onChange={(e) => setTypeOdr(e.target.value)} ref={tipRef} ><option>Redovno</option><option>Vanredno</option><option>Higijena</option><option>Gume</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDateOdr(e.target.value)} ref={dateRef} /></td></tr>
                <tr><td>Kilometraža </td><td><input type="number" onChange={(e) => setKmOdr(e.target.value)} ref={kmRef} /></td></tr>
                <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e) => setPartsOdr(e.target.value)} ref={partsRef} /></td></tr>
                <tr><td>Ukupan trošak</td><td><input type="text" onChange={(e) => setTotalOdr(e.target.value)} ref={totalRef} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUslugaOdr(e.target.value)} ref={uslugaRef} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="text" onChange={(e) => setTimeOdr(e.target.value)} ref={timeRef} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}