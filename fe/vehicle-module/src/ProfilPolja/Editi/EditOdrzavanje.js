import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Spiner } from "./Spiner"
import { ZaposleniLista } from "../Novo/ZaposleniLista"

export const EditOdrzavanje = ({ odrzavanjeAr }) => {
    let [valid, setValid] = useState(true)
    let { verDate,setNewOn, spinerOn, setSpinerOn, id, formatDateEdit, setOpenOdrEdit, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr } = useContext(DataContext)

    let tipRef = useRef(null)
    let dateRef = useRef(null)
    let kmRef = useRef()
    let partsRef = useRef()
    let totalRef = useRef()
    let uslugaRef = useRef()
    let timeRef = useRef()
    let { carId } = useParams()
    let [dateFalse,setDateFalse] = useState(false)
    let [kmFalse,setKmFalse] = useState(false)
    let [partsFalse,setPartsFalse] = useState(false)
    let [totalFalse,setTotalFalse] = useState(false)

    useEffect(() => {
        let odr = odrzavanjeAr.find(item => item._id === id)

        setTypeOdr(odr.tip)
        setDateOdr(odr.datum)
        setKmOdr(odr.kilometraza)
        setPartsOdr(odr.deloviUsluga)
        setTotalOdr(odr.cena)
        setUslugaOdr(odr.uslugaZaposlenog || "")
        setTimeOdr(odr.vremeZaposlenog || "")

        tipRef.current.value = odr.tip
        dateRef.current.value = formatDateEdit(odr.datum)
        kmRef.current.value = odr.kilometraza
        partsRef.current.value = odr.deloviUsluga
        totalRef.current.value = odr.cena
        uslugaRef.current.value = odr.uslugaZaposlenog || ""
        timeRef.current.value = odr.vremeZaposlenog || ""


    }, [])

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 0
        let verifyPartsOdr = partsOdr.length > 4
        let verifyTotalOdr = totalOdr > 0

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {
            axios.patch("http://localhost:5000/api/v1/odrzavanje/" + carId, { id, typeOdr, dateOdr, kmOdr, partsOdr, totalOdr, uslugaOdr, timeOdr }).then(res => {
                setValid(true)
                setSpinerOn(false)
                setOpenOdrEdit(false)
                window.location.reload()
            }).catch(err => {
                setSpinerOn(false)
                console.log(err)
            })
        } else {
            !verifyDateOdr ? setDateFalse(true) : setDateFalse(false)
            !verifyKmOdr ? setKmFalse(true) : setKmFalse(false)
            !verifyPartsOdr ? setPartsFalse(true) : setPartsFalse(false)
            !verifyTotalOdr ? setTotalFalse(true) : setTotalFalse(false)
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
                    <label htmlFor="tip-odrzavanje" className="standard--label">Tip <span>*</span></label>
                    <select ref={tipRef} onChange={e => setTypeOdr(e.target.value)} className="standard--input" id="tip-odrzavanje" name="tip-odrzavanje" >
                        <option>Redovno</option>
                        <option>Vanredno</option>
                        <option>Higijena</option>
                        <option>Gume</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-odrzavanje" className="standard--label">Datum <span>*</span></label>
                    <input style={{border:dateFalse&&"1px solid red"}} onBlur={e=> !verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false)} ref={dateRef} type="date" onChange={(e) => setDateOdr(e.target.value)} className="standard--input" id="datum-odrzavanje" name="datum-odrzavanje" />
                    { dateFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="kilometraza-odrzavanje" className="standard--label">Kilometraža <span>*</span></label>
                    <input style={{border:kmFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value===0 ? setKmFalse(true) : setKmFalse(false)} ref={kmRef} type="number" onChange={(e) => setKmOdr(e.target.value)} className="standard--input" id="kilometraza-odrzavanje" name="kilometraza-odrzavanje" />
                    { kmFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="delovi-odrzavanje" className="standard--label"> Delovi/Usluga <span>*</span></label>
                    <input style={{border:partsFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=4 ? setPartsFalse(true) : setPartsFalse(false)} ref={partsRef} onChange={(e) => setPartsOdr(e.target.value)} type="text" className="standard--input" id="delovi-odrzavanje" name="delovi-odrzavanje" />
                    { partsFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 4 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="trosak-odrzavanje" className="standard--label">Ukupan trošak <span>*</span></label>
                    <input style={{border:totalFalse&&"1px solid red"}} onBlur={e=>e.target.value==="" || e.target.value===0 ? setTotalFalse(true) : setTotalFalse(false) } ref={totalRef} onChange={(e) => setTotalOdr(e.target.value)} type="number" className="standard--input" id="trosak-odrzavanje" name="trosak-odrzavanje" />
                    { totalFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-odrzavanje" className="standard--label">Usluga zaposlenog</label>
                    <ZaposleniLista type="odr" rf={uslugaRef} />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-odrzavanje" className="standard--label">Vreme zaposlenog</label>
                    <input ref={timeRef} onChange={(e) => setTimeOdr(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-odrzavanje" name="vreme-zaposlenog-odrzavanje" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu bili validni</h3>}
        </div>)
}