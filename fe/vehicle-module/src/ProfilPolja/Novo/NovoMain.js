import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { Spiner } from "../Editi/Spiner"
export const NovoMain = ({ zaposleniLista, setEditOn }) => {


    let { verReg, sasija, docume, setDocume, cenaVoz, setCenaVoz, dateKup, setDateKup, boja, setBoja, godiste, setGodiste, motor, setMotor, setSasija, sasijaverReg, valid, setValid, setNewOn, id, spinerOn, setSpinerOn, verDate, marka, setMarka, regBr, setRegBr, typeMn, setTypeMn, korisnikMn, setKorisnikMn, isticanje, setIsticanje, aktivnoDo, setAktivnoDo, aktivnoOd, setAktivnoOd } = useContext(DataContext)
    let [zaposleni, setZaposleni] = useState(true)
    const ZaposleniLista = () => {

        const handleC = (e) => {
            setKorisnikMn(e.target.value)
            console.log(e.target.value)
            console.log(korisnikMn)

        }

        return (
            <select onChange={(e) => handleC(e)}>
                {zaposleniLista.map(item => <option value={item.ime}>{item.ime}</option>)}
            </select>
        )
    }

    let handleSubmit = async () => {
        setSpinerOn(true)
        let verifyMarka = marka.length > 2
        let verifyReg = verReg(regBr)
        let verifyKorisnik = korisnikMn.length > 2
        let verifyActiveFrom = verDate(aktivnoOd)
        let verifyActiveTo = verDate(aktivnoDo)
        let verifyRazlika = aktivnoDo > aktivnoOd
        let verifySasija = sasija.length > 10
        let verifyMotor = motor.length > 4
        let verifyGodiste = godiste > 1950
        let verifyBoja = boja.length > 2
        let verifyDateKup = verDate(dateKup)
        let verifyCenaVoz = cenaVoz > 0
        let verifyDocume = docume.length > 5


        let cond = verifySasija && verifyMotor && verifyGodiste && verifyBoja && verifyDateKup && verifyCenaVoz && verifyDocume && verifyMarka && verifyReg && verifyKorisnik && verifyActiveFrom && verifyActiveTo && verifyRazlika
        
        if (cond) {
            await axios.post("http://localhost:5000/api/v1/main", {
                id, marka, regBr, typeMn, korisnikMn, isticanje, aktivnoOd, aktivnoDo, sasija, motor, godiste, boja, dateKup, cenaVoz, docume

            })
                .then(() => setSpinerOn(false))
                .catch(er => console.log(er))
            setSpinerOn(false)
            setEditOn(false)
            setValid(true)
            setNewOn(false)
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyMarka, verifyReg, verifyKorisnik, verifyActiveFrom, verifyActiveTo, verifyRazlika)
            console.log(korisnikMn)
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


    let handleChange = (e) => {

        if (e.target.value !== "Druga lica") {
            setZaposleni(true)
            setTypeMn("Zaposleni")
        } else {
            setZaposleni(false)
            setTypeMn("Druga lica")
        }
    }


    return (
        <div class="input--container">
            {spinerOn && <Spiner />}
            <h3 class="input--container__title">Šteta</h3>
            <form class="form">
                <div class="single-input-container">
                    <label for="marka-tip" class="standard--label">Marka i tip</label>
                    <input onChange={e => setMarka(e.target.value)} type="text" class="standard--input" id="marka-tip" name="marka-tip" />
                </div>


                <div class="single-input-container">
                    <label for="registracioni-broj" class="standard--label">Registracioni broj</label>
                    <input onChange={e => setRegBr(e.target.value)} type="text" class="standard--input" id="registracioni-broj" name="registracioni-broj" />
                </div>

                <div class="single-input-container">
                    <label for="tip-korisnika" class="standard--label">Tip korisnika</label>
                    <select onChange={handleChange} class="standard--input" id="tip-korisnika" name="tip-korisnika">
                        <option>Zaposleni</option>
                        <option>Druga lica</option>
                    </select>
                </div>

                <div class="single-input-container">
                    <label for="korisnik-vozila" class="standard--label">Korisnik vozila</label>
                    {zaposleni ? <ZaposleniLista /> : <input type="text" class="standard--input" id="korisnik-vozila" name="korisnik-vozila" onChange={(e) => { setKorisnikMn(e.target.value) }} />}
                </div>

                <div class="single-input-container">
                    <label for="aktivno-od" class="standard--label">Vozilo aktivno od</label>
                    <input onChange={e => setAktivnoOd(e.target.value)} type="date" class="standard--input" id="aktivno-od" name="aktivno-od" />
                </div>

                <div class="single-input-container">
                    <label for="aktivno-od" class="standard--label">Vozilo aktivno do </label>
                    <input onChange={e => setAktivnoDo(e.target.value)} type="date" class="standard--input" id="aktivno-do" name="aktivno-do" />
                </div>

                <div class="single-input-container">
                    <label for="broj-sasije" class="standard--label">Broj šasije</label>
                    <input type="text" onChange={(e) => setSasija(e.target.value)} class="standard--input" id="broj-sasije" name="broj-sasije" />
                </div>

                <div class="single-input-container">
                    <label for="broj-motora" class="standard--label">Broj motora</label>
                    <input type="text" onChange={e => setMotor(e.target.value)} class="standard--input" id="broj-motora" name="broj-motora" />
                </div>

                <div class="single-input-container">
                    <label for="godiste" class="standard--label">Godište</label>
                    <input type="number" onChange={(e) => setGodiste(e.target.value)} class="standard--input" id="godiste" name="godiste" />
                </div>

                <div class="single-input-container">
                    <label for="boja" class="standard--label">Boja</label>
                    <input onChange={(e) => setBoja(e.target.value)} type="text" class="standard--input" id="boja" name="boja" />
                </div>

                <div class="single-input-container">
                    <label for="datum-kupovine" class="standard--label">Datum kupovine</label>
                    <input onChange={(e) => setDateKup(e.target.value)} type="date" class="standard--input" id="datum-kupovine" name="datum-kupovine" />
                </div>

                <div class="single-input-container">
                    <label for="cena-vozila" class="standard--label">Cena vozila</label>
                    <input onChange={(e) => setCenaVoz(e.target.value)} type="number" class="standard--input" id="cena-vozila" name="cena-vozila" />
                </div>

                <div class="single-input-container">
                    <label for="dokumentacija" class="standard--label">Dokumentacija</label>
                    <textarea onChange={(e) => setDocume(e.target.value)} class="standard--input" id="dokumentacija" name="dokumentacija" />
                </div>

            </form>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button>
            </div>



            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
    )
}