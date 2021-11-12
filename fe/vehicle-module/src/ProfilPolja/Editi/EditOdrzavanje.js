import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Spiner } from "./Spiner"

export const EditOdrzavanje = ({ odrzavanjeAr }) => {
    let [valid, setValid] = useState(true)
    let { setNewOn, spinerOn, setSpinerOn, id, formatDateEdit, setOpenOdrEdit, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr } = useContext(DataContext)

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
        setSpinerOn(true)
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 10
        let verifyPartsOdr = partsOdr.length > 2
        let verifyTotalOdr = totalOdr > 10

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {
            axios.patch("http://localhost:5000/api/v1/odrzavanje/" + carId, { id, typeOdr, dateOdr, kmOdr, partsOdr, totalOdr, uslugaOdr, timeOdr }).then(res => {
                setValid(true)
                setSpinerOn(false)
                setOpenOdrEdit(false)
                window.location.reload()
            }).catch(err => {
                setSpinerOn(false)
                console.log(err)})
        } else {
            setSpinerOn(false)
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
        setValid(true)
        setOpenOdrEdit(false)
        setNewOn(false)
    }


    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Održavanje</h3>
            <div className="form">

                <div className="single-input-container">
                    <label for="tip-odrzavanje" className="standard--label">Tip</label>
                    <select ref={tipRef}onChange={e => setTypeOdr(e.target.value)} className="standard--input" id="tip-odrzavanje" name="tip-odrzavanje" >
                        <option>Redovno</option>
                        <option>Vanredno</option>
                        <option>Higijena</option>
                        <option>Gume</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label for="datum-odrzavanje" className="standard--label">Datum</label>
                    <input ref={dateRef} type="date" onChange={(e) => setDateOdr(e.target.value)} className="standard--input" id="datum-odrzavanje" name="datum-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label for="kilometraza-odrzavanje" className="standard--label">Kilometraža</label>
                    <input ref={kmRef} type="number" onChange={(e) => setKmOdr(e.target.value)} className="standard--input" id="kilometraza-odrzavanje" name="kilometraza-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label for="delovi-odrzavanje" className="standard--label"> Delovi/Usluga</label>
                    <input ref={partsRef} onChange={(e) => setPartsOdr(e.target.value)} type="text" className="standard--input" id="delovi-odrzavanje" name="delovi-odrzavanje"/>
  
                </div>

                <div className="single-input-container">
                    <label for="trosak-odrzavanje" className="standard--label">Ukupan trošak</label>
                    <input ref={totalRef} onChange={(e) => setTotalOdr(e.target.value)} type="number" className="standard--input" id="trosak-odrzavanje" name="trosak-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label for="usluga-zaposlenog-odrzavanje" className="standard--label">Usluga zaposlenog</label>
                    <input ref={uslugaRef} onChange={(e) => setUslugaOdr(e.target.value)} type="text" className="standard--input" id="usluga-zaposlenog-gorivo" name="usluga-zaposlenog-gorivo" />
                </div>

                <div className="single-input-container">
                    <label for="vreme-zaposlenog-odrzavanje" className="standard--label">Vreme zaposlenog</label>
                    <input ref={timeRef} onChange={(e) => setTimeOdr(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-odrzavanje" name="vreme-zaposlenog-odrzavanje" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>)
}