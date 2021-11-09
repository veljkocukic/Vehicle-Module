import axios from "axios"
import React, { useState, useRef, useContext, useEffect } from "react"
import { DataContext } from "../../Context"
import { useParams } from "react-router"
import { Spiner } from "./Spiner"


export const EditGorivo = ({ gorivoAr }) => {
    let { spinerOn, setSpinerOn, formatDateEdit, setDateReg, dateReg, verDate, setOpenFuelEdit, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, id } = useContext(DataContext)

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
        setDateReg(fuel.datum)
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
        let verifyDateFuel = !verDate(dateFuel)
        let verifyKmFuel = kmFuel > 0
        let verifyPotrosnja = (type === "Gorivo" && potrosnja > 5) || type !== "Gorivo"
        let verifyPriceFuel = priceFuel > 100

        if (verifyDateFuel && verifyKmFuel && verifyPotrosnja && verifyPriceFuel) {
            axios.patch("http://localhost:5000/api/v1/gorivo/" + carId, { id, type, dateReg, kmFuel, potrosnja, priceFuel, uslugaFuel, timeFuel }).then(res => {
                setValid(true)
                setSpinerOn(false)
                setOpenFuelEdit(false)
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
    }




    return (
        <table className="tg editTable">
            {spinerOn && <Spiner />}
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Tip </td><td><select onChange={(e) => setType(e.target.value)} ref={tipRef} ><option>Gorivo</option><option>Tag</option><option>Pranje</option></select></td></tr>
                <tr><td>Datum </td><td><input type="date" onChange={(e) => setDateReg(e.target.value)} ref={datumRef} /></td></tr>
                <tr><td>Kilometraža </td><td><input type="number" onChange={(e) => setKmFuel(e.target.value)} ref={kmRef} /></td></tr>
                <tr><td>Potrošnja</td><td><input type="number" onChange={(e) => setPotrosnja(e.target.value)} ref={potrosnjaRef} /></td></tr>
                <tr><td>Cena</td><td><input type="number" onChange={(e) => setPriceFuel(e.target.value)} ref={cenaRef} /></td></tr>
                <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUslugaFuel(e.target.value)} ref={uslugaRef} /></td></tr>
                <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e) => setTimeFuel(e.target.value)} ref={timeRef} /></td></tr>
                <tr><td><button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button></td><td><button type="submit" className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}
