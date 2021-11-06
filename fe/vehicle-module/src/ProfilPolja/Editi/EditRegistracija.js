import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"

export const EditRegistracija = ({ registracijaAr, regId, carId }) => {
    let { setOpenRegEdit, verDate, formatDateEdit, id, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)


    let [valid, setValid] = useState(true)
    let regDateRef = useRef(null)
    let regDocRef = useRef(null)
    let regTrosRef = useRef(null)
    let regZapRef = useRef(null)
    let regTimeRef = useRef(null)
    let regRegDoRef = useRef(null)

    useEffect(() => {
        let reg = registracijaAr.find(item => item._id === regId)
        setDateReg(reg.datumRegistracije)
        regDateRef.current.value = formatDateEdit(reg.datumRegistracije)

        setDocReg(reg.dokumentacija)
        regDocRef.current.value = reg.dokumentacija

        setTroskovi(reg.troskoviRegistracije)
        regTrosRef.current.value = reg.troskoviRegistracije

        setRegistrovao(reg.registrovaoZaposleni)
        regZapRef.current.value = reg.registrovaoZaposleni

        setTimeZaposleni(reg.vremeZaposlenog)
        regTimeRef.current.value = reg.vremeZaposlenog

        setRegDo(reg.registrovanDo)
        regRegDoRef.current.value = formatDateEdit(reg.registrovanDo)

    }, [])

    const handleSubmit = () => {
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyReg = registrovao.length > 2
        let verifyTime = timeZaposleni > 2
        let verifyDo = verDate(regDo)
        if (verifyDate && verifyDoc && verifyTroskovi && verifyReg && verifyTime && verifyDo) {
            axios.patch("http://localhost:5000/api/v1/registracija/" + carId, { id, dateReg, docReg, troskovi, registrovao, timeZaposleni, regDo }).then(res => {
                console.log(res)
                setValid(true)
                setOpenRegEdit(false)
            }).catch(er => {
                console.log(carId)
            })
        } else {
            setValid(false)
            console.log(verifyDate, verifyDo, dateReg, regDo)
        }
    }


    return (< table className="tg editTable">
        <thead>
            <th class="tg-0pky">Naziv polja</th>
            <th class="tg-0pky">Izmena</th>
        </thead>
        <tbody>
            <tr><td>Datum registracije </td><td><input ref={regDateRef} type="date" onChange={(e) => setDateReg(e.target.value)} /></td></tr>
            <tr><td>Dokumentacija </td><td><input ref={regDocRef} type="text" onChange={(e) => setDocReg(e.target.value)} /></td></tr>
            <tr><td>Troškovi registracije </td><td><input ref={regTrosRef} type="number" onChange={(e) => setTroskovi(e.target.value)} /></td></tr>
            <tr><td>Registrovao zaposleni</td><td><input ref={regZapRef} type="text" onChange={(e) => setRegistrovao(e.target.value)} /></td></tr>
            <tr><td>Vreme zaposlenog</td><td><input ref={regTimeRef} type="text" onChange={(e) => setTimeZaposleni(e.target.value)} /></td></tr>
            <tr><td>Registrovan do</td><td><input ref={regRegDoRef} type="date" onChange={(e) => setRegDo(e.target.value)} /></td></tr>
            <tr><td><button onClick={() => setOpenRegEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
        </tbody>
        {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
    </table>)
}