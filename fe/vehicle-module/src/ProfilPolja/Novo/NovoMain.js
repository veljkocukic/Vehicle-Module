import React, { useState, useContext,useRef } from "react"
import { DataContext } from "../../Context"
import axios from "axios"
import { Spiner } from "../Editi/Spiner"
import { ZaposleniLista } from "./ZaposleniLista"
export const NovoMain = ({ setEditOn }) => {


    let { verReg,valid, setValid, setNewOn, spinerOn, setSpinerOn, verDate, marka, setMarka, regBr, setRegBr, typeMn, setTypeMn, korisnikMn, setKorisnikMn, isticanje, setIsticanje, aktivnoDo, setAktivnoDo, aktivnoOd, setAktivnoOd,dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)
    let [zaposleni, setZaposleni] = useState(true)
    let [file, setFile] = useState([])


    let handleSubmit = async () => {
        setSpinerOn(true)
        let verifyMarka = marka.length > 2
        let verifyReg = verReg(regBr)
        let verifyKorisnik = korisnikMn.length > 2
        let verifyActiveFrom = verDate(aktivnoOd)
        //let verifyActiveTo = verDate(aktivnoDo)
        let verifyDo = verDate(regDo)



        if (verifyMarka && verifyReg && verifyKorisnik && verifyActiveFrom && verifyDo) {
            await axios.post("http://localhost:5000/api/v1/main", {
            marka,regBr,korisnikMn,aktivnoOd,aktivnoDo,regDo,typeMn
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
            console.log(verifyMarka , verifyReg , verifyKorisnik , verifyActiveFrom , verifyDo)
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

    const handleBlurReg = (e) =>{

        if(!verReg(e.target.value)){
            e.target.style.border="1px solid red"
        }else{
            e.target.style.border="none"

        }

    }

    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Novo vozilo</h3>
            <form className="form" encType="multipart/form-data">
                <div className="single-input-container">
                    <label htmlFor="marka-tip" className="standard--label">Marka i tip <span>*</span></label>
                    <input onBlur={e=>e.target.value.length<4 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={e => setMarka(e.target.value)} type="text" className="standard--input" id="marka-tip" name="marka-tip" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="registracioni-broj" className="standard--label">Registracioni broj <span>*</span></label>
                    <input onBlur={e=>handleBlurReg(e)} onChange={e => setRegBr(e.target.value)} type="text" className="standard--input" id="registracioni-broj" name="registracioni-broj" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="tip-korisnika" className="standard--label">Tip korisnika <span>*</span></label>
                    <select onChange={handleChange} className="standard--input" id="tip-korisnika" name="tip-korisnika">
                        <option>Zaposleni</option>
                        <option>Druga lica</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="korisnik-vozila" className="standard--label">Korisnik vozila <span>*</span></label>
                    {zaposleni ? <ZaposleniLista /> : <input type="text" className="standard--input" id="korisnik-vozila" name="korisnik-vozila" onChange={(e) => setKorisnikMn(e.target.value)} />}
                </div>

                <div className="single-input-container">
                    <label htmlFor="registrovan-do" className="standard--label">Registrovano do <span>*</span></label>
                    <input onBlur={e=>e.target.value === "" ? e.target.style.border = "1px solid red" : e.target.value = "none"  } onChange={e => setRegDo(e.target.value)} type="date" className="standard--input" id="registrovan-do" name="registrovan-do" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="aktivno-od" className="standard--label">Vozilo aktivno od <span>*</span></label>
                    <input onBlur={e=>e.target.value === "" ? e.target.style.border = "1px solid red" : e.target.value = "none"  } onChange={e => setAktivnoOd(e.target.value)} type="date" className="standard--input" id="aktivno-od" name="aktivno-od" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="aktivno-do" className="standard--label">Vozilo aktivno do </label>
                    <input onChange={e => setAktivnoDo(e.target.value)} type="date" className="standard--input" id="aktivno-do" name="aktivno-do" />
                </div>
                

                <div className="single-input-container">
                    <label htmlFor="slike" className="standard--label file-input__label">Slike vozila</label>
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