import React, { useState, useContext } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { Spiner } from "../Editi/Spiner"
import { ZaposleniLista } from "./ZaposleniLista"
export const NovoMain = ({ setEditOn }) => {


    let { verReg, sasija, docume, setDocume, cenaVoz, setCenaVoz, dateKup, setDateKup, boja, setBoja, godiste, setGodiste, motor, setMotor, setSasija, sasijaverReg, valid, setValid, setNewOn, id, spinerOn, setSpinerOn, verDate, marka, setMarka, regBr, setRegBr, typeMn, setTypeMn, korisnikMn, setKorisnikMn, isticanje, setIsticanje, aktivnoDo, setAktivnoDo, aktivnoOd, setAktivnoOd, setOpenRegEdit, formatDateEdit, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)
    let [zaposleni, setZaposleni] = useState(true)
    let [file, setFile] = useState([])


    let handleSubmit = async () => {
        setSpinerOn(true)
        let verifyMarka = marka.length > 2
        let verifyReg = verReg(regBr)
        let verifyKorisnik = korisnikMn.length > 2
        let verifyActiveFrom = verDate(aktivnoOd)
        //let verifyActiveTo = verDate(aktivnoDo)
        let verifyRazlika = aktivnoDo!==0 ? aktivnoDo > aktivnoOd : true
        let verifySasija = sasija.length > 10
        let verifyMotor = motor.length > 4
        let verifyGodiste = godiste > 1950
        let verifyBoja = boja.length > 2
        let verifyDateKup = verDate(dateKup)
        let verifyCenaVoz = cenaVoz > 0
        // let verifyDocume = docume.length > 5
        let verifyDate = verDate(dateReg)
        let verifyDoc = docReg.length > 2
        let verifyTroskovi = troskovi > 2
        let verifyRegistrovao = registrovao.length > 2
        let verifyTime = timeZaposleni.length > 2
        let verifyDo = verDate(regDo)


        let cond = verifySasija && verifyMotor && verifyGodiste && verifyBoja && verifyDateKup && verifyCenaVoz && verifyMarka && verifyRegistrovao && verifyKorisnik && verifyActiveFrom && verifyRazlika && verifyDate && verifyDoc && verifyTroskovi && verifyReg && verifyTime && verifyDo

        if (cond) {
            await axios.post("http://localhost:5000/api/v1/main", {
                id, marka, regBr, typeMn, korisnikMn, isticanje, aktivnoOd, aktivnoDo, sasija, motor, godiste, boja, dateKup, cenaVoz, docume, file,dateReg,regDo,troskovi,registrovao,timeZaposleni,docReg

            })
                .then(() => setSpinerOn(false))
                .catch(er => console.log(er))
            setSpinerOn(false)
            setEditOn(false)
            setValid(true)
            setNewOn(false)
            window.location.reload()
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifySasija , verifyMotor , verifyGodiste , verifyBoja , verifyDateKup , verifyCenaVoz , verifyMarka , verifyRegistrovao , verifyKorisnik , verifyActiveFrom , verifyRazlika , verifyDate , verifyDoc , verifyTroskovi , verifyReg , verifyTime , verifyDo)
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
    function getBase64(file) {         ///////////PRIVREMENO REŠENJE
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    const handleFile = (img) => {
        for (let a of img) {
            getBase64(a).then(data => {
                setFile(prev => [...prev, data])
            })
        }
    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Novo vozilo</h3>
            <form className="form mainForm" enctype="multipart/form-data">
                <div className="single-input-container">
                    <label for="marka-tip" className="standard--label">Marka i tip <span>*</span></label>
                    <input onChange={e => setMarka(e.target.value)} type="text" className="standard--input" id="marka-tip" name="marka-tip" />
                </div>


                <div className="single-input-container">
                    <label for="registracioni-broj" className="standard--label">Registracioni broj <span>*</span></label>
                    <input onChange={e => setRegBr(e.target.value)} type="text" className="standard--input" id="registracioni-broj" name="registracioni-broj" />
                </div>

                <div className="single-input-container">
                    <label for="tip-korisnika" className="standard--label">Tip korisnika <span>*</span></label>
                    <select onChange={handleChange} className="standard--input" id="tip-korisnika" name="tip-korisnika">
                        <option>Zaposleni</option>
                        <option>Druga lica</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label for="korisnik-vozila" className="standard--label">Korisnik vozila <span>*</span></label>
                    {zaposleni ? <ZaposleniLista /> : <input type="text" className="standard--input" id="korisnik-vozila" name="korisnik-vozila" onChange={(e) => { setKorisnikMn(e.target.value) }} />}
                </div>

                <div className="single-input-container">
                    <label for="aktivno-od" className="standard--label">Vozilo aktivno od <span>*</span></label>
                    <input onChange={e => setAktivnoOd(e.target.value)} type="date" className="standard--input" id="aktivno-od" name="aktivno-od" />
                </div>

                <div className="single-input-container">
                    <label for="aktivno-od" className="standard--label">Vozilo aktivno do </label>
                    <input onChange={e => setAktivnoDo(e.target.value)} type="date" className="standard--input" id="aktivno-do" name="aktivno-do" />
                </div>

                <div className="single-input-container">
                    <label for="broj-sasije" className="standard--label">Broj šasije <span>*</span></label>
                    <input type="text" onChange={(e) => setSasija(e.target.value)} className="standard--input" id="broj-sasije" name="broj-sasije" />
                </div>

                <div className="single-input-container">
                    <label for="broj-motora" className="standard--label">Broj motora <span>*</span></label>
                    <input type="text" onChange={e => setMotor(e.target.value)} className="standard--input" id="broj-motora" name="broj-motora" />
                </div>

                <div className="single-input-container">
                    <label for="godiste" className="standard--label">Godište <span>*</span></label>
                    <input type="number" onChange={(e) => setGodiste(e.target.value)} className="standard--input" id="godiste" name="godiste" />
                </div>

                <div className="single-input-container">
                    <label for="boja" className="standard--label">Boja <span>*</span></label>
                    <input onChange={(e) => setBoja(e.target.value)} type="text" className="standard--input" id="boja" name="boja" />
                </div>

                <div className="single-input-container">
                    <label for="datum-kupovine" className="standard--label">Datum kupovine <span>*</span></label>
                    <input onChange={(e) => setDateKup(e.target.value)} type="date" className="standard--input" id="datum-kupovine" name="datum-kupovine" />
                </div>

                <div className="single-input-container">
                    <label for="cena-vozila" className="standard--label">Cena vozila <span>*</span></label>
                    <input onChange={(e) => setCenaVoz(e.target.value)} type="number" className="standard--input" id="cena-vozila" name="cena-vozila" />
                </div>

                <div className="single-input-container">
                    <label for="datum-registracije" className="standard--label">Datum registracije <span>*</span></label>
                    <input onChange={e => setDateReg(e.target.value)} type="date" className="standard--input" id="datum-registracije" name="datum-registracije" />
                </div>

                <div className="single-input-container">
                    <label for="registrovan-do" className="standard--label">Registrovan do <span>*</span></label>
                    <input onChange={(e) => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>


                <div className="single-input-container">
                    <label for="troskovi-registracije" className="standard--label">Troškovi registracije <span>*</span></label>
                    <input type="number" onChange={(e) => setTroskovi(e.target.value)} className="standard--input" id="troskovi-registracije" name="troskovi-registracije" />
                </div>

                <div className="single-input-container">
                    <label for="registrovao-zaposleni" className="standard--label">Registrovao zaposleni <span>*</span></label>
                    <input onChange={(e) => setRegistrovao(e.target.value)} type="text" className="standard--input" id="registrovao-zaposleni" name="registrova-zaposleni" />

                </div>


                <div className="single-input-container">
                    <label for="dokumentacija-vozila" className="standard--label">Dokumentacija vozila</label>
                    <textarea onChange={(e) => setDocume(e.target.value)} className="standard--input" id="dokumentacija-vozila" name="dokumentacija-vozila" />
                </div>


                <div className="single-input-container">
                    <label for="dokumentacija-registracije" className="standard--label">Dokumentacija registracije<span>*</span></label>
                    <textarea onChange={(e) => setDocReg(e.target.value)} className="standard--input" id="dokumentacija-registracije" name="dokumentacija-registracije" ></textarea>
                </div>

                <div className="single-input-container">
                    <label for="vreme-zaposlenog" className="standard--label">Vreme zaposlenog (reg.) <span>*</span></label>
                    <input onChange={(e) => setTimeZaposleni(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog" name="vreme-zaposlenog" />
                </div>
                

                <div className="single-input-container">
                    <label for="slike" className="standard--label file-input__label">Slike vozila <span>*</span></label>
                    <input type="file" className="file-input" id="slike" multiple onChange={(e) => handleFile(e.target.files)} />
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