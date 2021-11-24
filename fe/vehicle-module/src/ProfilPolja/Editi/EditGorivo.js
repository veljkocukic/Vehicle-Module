import axios from "axios"
import React, { useState, useRef, useContext, useEffect } from "react"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import { Spiner } from "./Spiner"


export const EditGorivo = ({ gorivoAr }) => {
    let { setNewOn,spinerOn, setSpinerOn, formatDateEdit, dateReg, verDate, setOpenFuelEdit, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, id } = useContext(DataContext)

    let [valid, setValid] = useState(true)
    let tipRef = useRef(null)
    let datumRef = useRef(null)
    let kmRef = useRef(null)
    let potrosnjaRef = useRef(null)
    let cenaRef = useRef(null)
    let uslugaRef = useRef(null)
    let timeRef = useRef(null)
    let { carId } = useParams()



    useEffect(() => {
        let fuel = gorivoAr.find(item => item._id === id)

        setType(fuel.tip)
        setDateFuel(fuel.datum)
        setKmFuel(fuel.kilometraza)
        setPotrosnja(fuel.potrosnja)
        setPriceFuel(fuel.cena)
        setUslugaFuel(fuel.uslugaZaposlenog)
        setTimeFuel(fuel.vremeZaposlenog)

        tipRef.current.value = fuel.tip
        datumRef.current.value = formatDateEdit(fuel.datum)
        kmRef.current.value = fuel.kilometraza
        potrosnjaRef.current.value = fuel.potrosnja
        cenaRef.current.value = fuel.cena
        uslugaRef.current.value = fuel.uslugaZaposlenog
        timeRef.current.value = fuel.vremeZaposlenog

    }, [])

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifyDateFuel = verDate(dateFuel)
        let verifyKmFuel = kmFuel > 0
        let verifyPotrosnja = (type === "Gorivo" && potrosnja > 5) || type !== "Gorivo"
        let verifyPriceFuel = priceFuel > 100

        if (verifyDateFuel && verifyKmFuel && verifyPotrosnja && verifyPriceFuel) {
            axios.patch("http://localhost:5000/api/v1/gorivo/" + carId, { id, type, dateReg, kmFuel, potrosnja, priceFuel, uslugaFuel, timeFuel }).then(res => {
                setValid(true)
                setSpinerOn(false)
                setOpenFuelEdit(false)
                window.location.reload()
            }).catch(er => {
                setSpinerOn(false)
                console.log(er)})
        } else {
            setValid(false)
            setSpinerOn(false)
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
        setValid(true)

    }




    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Gorivo i tekući troškovi</h3>
            <div className="form">

                <div className="single-input-container">
                    <label htmlFor="tip-gorivo" className="standard--label">Tip <span>*</span></label>
                    <select ref={tipRef} onChange={e => setType(e.target.value)} className="standard--input" id="tip-gorivo" name="tip-gorivo" >
                        <option>Gorivo</option>
                        <option>Tag</option>
                        <option>Pranje</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-gorivo" className="standard--label">Datum <span>*</span></label>
                    <input onBlur={e=>!verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={datumRef} type="date" onChange={(e) => setDateFuel(e.target.value)} className="standard--input" id="datum-gorivo" name="datum-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="kilometraza-gorivo" className="standard--label">Kilometraža <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={kmRef} type="number" onChange={(e) => setKmFuel(e.target.value)} className="standard--input" id="kilometraza-gorivo" name="kilometraza-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="potrosnja-gorivo" className="standard--label"> Potrošnja <span color="grey">*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={potrosnjaRef} onChange={(e) => setPotrosnja(e.target.value)} type="number" className="standard--input" id="potrosnja-gorivo" name="potrosnja-gorivo"/>
  
                </div>

                <div className="single-input-container">
                    <label htmlFor="cena-gorivo" className="standard--label">Cena <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={cenaRef} onChange={(e) => setPriceFuel(e.target.value)} type="number" className="standard--input" id="cena-gorivo" name="cena-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-gorivo" className="standard--label">Usluga zaposlenog</label>
                    <input ref={uslugaRef} onChange={(e) => setUslugaFuel(e.target.value)} type="text" className="standard--input" id="usluga-zaposlenog-gorivo" name="usluga-zaposlenog-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-gorivo" className="standard--label">Vreme zaposlenog</label>
                    <input ref={timeRef} onChange={(e) => setTimeFuel(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-gorivo" name="vreme-zaposlenog-gorivo" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
        )
}
