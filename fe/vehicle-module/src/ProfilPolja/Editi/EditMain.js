import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "./Spiner"
import { ZaposleniLista } from "../Novo/ZaposleniLista"
export const EditMain = ({ setEditOn, activeToRef, zaposleniLista, tipKorRef, vozila, zaposleniSelect, markaRef, regBrRef, activeFromRef, korVozRef }) => {


    let { verReg, valid, setValid, setNewOn, id, spinerOn, setSpinerOn, verDate, marka, setMarka, regBr, setRegBr, typeMn, setTypeMn, korisnikMn, setKorisnikMn, isticanje, setIsticanje, aktivnoDo, setAktivnoDo, aktivnoOd, setAktivnoOd } = useContext(DataContext)


    let [zaposleni, setZaposleni] = useState(true)


    useEffect(() => {
        let vozilo = vozila.find(item => item.id === id)
        console.log(vozilo)
        setMarka(vozilo.markaTip)
        setRegBr(vozilo.regBroj)
        setTypeMn("Zaposleni")
        setKorisnikMn(vozilo.korisnikVozila)
        setIsticanje(vozilo.isticanje)
        setAktivnoOd(vozilo.activeFrom)
        setAktivnoDo(vozilo.activeTo)
        markaRef.current.value = vozilo.markaTip
        regBrRef.current.value = vozilo.regBroj
        activeFromRef.current.value = vozilo.activeFromEdit
        if (vozilo.tipKorisnika !== "Zaposleni") {
            tipKorRef.current.value = "Druga lica"
            setZaposleni(false)
        } else {
            try {
                zaposleniSelect.current.value = vozilo.korisnikVozila
            } catch (er) {
                console.log(er)
            }

        }
        try {
            activeFromRef.current.value = vozilo.activeFromEdit
            activeToRef.current.value = vozilo.activeToEdit

        } catch (error) {
            console.log(error)
            return
        }
    }, [])

    useEffect(() => {    ////Sprečava grešku jer se padajući meni za zaposlene i unos drugih lica uslovno prikazuju
        let vozilo = vozila.find(item => item.id === id)
        try {
            korVozRef.current.value = vozilo.korisnikVozila

        } catch (error) {
            console.log(error)
        }
    }, [zaposleni])




    let handleChange = (e) => {

        if (e.target.value !== "Druga lica") {
            setZaposleni(true)
            setTypeMn("Zaposleni")
        } else {
            setZaposleni(false)
            setTypeMn("Druga lica")
        }
    }


    let handleSubmit = async () => {
        setSpinerOn(true)
        let verifyMarka = marka.length > 2
        let verifyReg = verReg(regBr)
        let verifyKorisnik = korisnikMn.length > 2
        let verifyActiveFrom = verDate(aktivnoOd)
        let verifyActiveTo = verDate(aktivnoDo)
        let verifyRazlika = new Date(aktivnoDo) > new Date(aktivnoOd)
        if (verifyMarka && verifyReg && verifyKorisnik && verifyActiveFrom && verifyActiveTo && verifyRazlika) {
            await axios.patch("http://localhost:5000/api/v1/main", {
                id, marka, regBr, typeMn, korisnikMn, isticanje, aktivnoOd, aktivnoDo

            })
                .then(() => setSpinerOn(false))
                .catch(er => console.log(er))
            setSpinerOn(false)
            setEditOn(false)
            setValid(true)
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyMarka, verifyReg, verifyKorisnik, verifyActiveFrom, verifyActiveTo, verifyRazlika)
            console.log(aktivnoOd)
            console.log(aktivnoDo)

        }



    }

    let handleCancel = () => {
        setMarka("")
        setRegBr("")
        setTypeMn("Zaposleni")
        setKorisnikMn("")
        setIsticanje(0)
        setAktivnoOd(0)
        setEditOn(false)
        setNewOn(false)
        setValid(true)
    }

    return (

        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Izmena vozila</h3>
            <form className="form">
                <div className="single-input-container">
                    <label for="marka-tip" className="standard--label">Marka i tip</label>
                    <input ref={markaRef} onChange={e => setMarka(e.target.value)} type="text" className="standard--input" id="marka-tip" name="marka-tip" />
                </div>


                <div className="single-input-container">
                    <label for="registracioni-broj" className="standard--label">Registracioni broj</label>
                    <input ref={regBrRef} onChange={e => setRegBr(e.target.value)} type="text" className="standard--input" id="registracioni-broj" name="registracioni-broj" />
                </div>

                <div className="single-input-container">
                    <label for="tip-korisnika" className="standard--label">Tip korisnika</label>
                    <select onChange={handleChange} ref={tipKorRef} className="standard--input" id="tip-korisnika" name="tip-korisnika">
                        <option>Zaposleni</option>
                        <option>Druga lica</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label for="korisnik-vozila" className="standard--label">Korisnik vozila</label>
                    {zaposleni ? <ZaposleniLista /> : <input type="text" className="standard--input" id="korisnik-vozila" name="korisnik-vozila" onChange={(e) => { setKorisnikMn(e.target.value) }} ref={korVozRef} />}
                </div>

                <div className="single-input-container">
                    <label for="aktivno-od" className="standard--label">Vozilo aktivno od</label>
                    <input ref={activeFromRef} onChange={e => setAktivnoOd(e.target.value)} type="date" className="standard--input" id="aktivno-od" name="aktivno-od" />
                </div>

                <div className="single-input-container">
                    <label for="aktivno-od" className="standard--label">Vozilo aktivno do </label>
                    <input ref={activeToRef} onChange={e => setAktivnoDo(e.target.value)} type="date" className="standard--input" id="aktivno-do" name="aktivno-do" />
                </div>



            </form>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>







    )
}