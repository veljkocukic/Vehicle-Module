import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { Spiner } from "../ProfilPolja/Editi/Spiner"

export const EditServis = ({ serviseriAr }) => {

    let { setAdresaS, adresaS, valid, setValid, spinerOn, setSpinerOn, id, setOpenServEdit, kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS } = useContext(DataContext)

    let sifraRef = useRef(null)
    let nazivRef = useRef(null)
    let tipRef = useRef(null)
    let kontaktRef = useRef(null)
    let telRef = useRef(null)
    let emailRef = useRef(null)
    let siteRef = useRef(null)
    let adresaRef = useRef(null)



    useEffect(() => {

        let serv = serviseriAr.find(item => item._id === id)
        setSifraS(serv.sifraKlijenta)
        setNazivFirme(serv.nazivFirme)
        setTipUslugeS(serv.tipUsluge)
        setKontaktS(serv.kontakt)
        setTelS(serv.brTelefona)
        setKontaktS(serv.kontakt)
        setEmailS(serv.email)
        setSiteS(serv.webiste)
        setAdresaS(serv.adresa)

        sifraRef.current.value = serv.sifraKlijenta
        nazivRef.current.value = serv.nazivFirme
        tipRef.current.value = serv.tipUsluge
        kontaktRef.current.value = serv.kontakt
        telRef.current.value = serv.brTelefona
        emailRef.current.value = serv.email
        siteRef.current.value = serv.website
        adresaRef.current.value = serv.adresa

    }, [])


    const handleCancel = () => {
        setSifraS("")
        setNazivFirme("")
        setTipUslugeS("")
        setKontaktS("")
        setTelS("")
        setEmailS("")
        setSiteS("")
        setAdresaS("")
        setOpenServEdit(false)
    }


    const handleSubmit = () => {
        setSpinerOn(true)
        let verifySifra = sifraS.length > 10
        let verifyNaziv = nazivFirme.length > 5
        let verifyTip = tipUslugeS.length > 1

        if (verifySifra && verifyNaziv && verifyTip) {
            axios.patch("http://localhost:5000/api/v1/serviseri", { id, sifraS, adresaS, nazivFirme, tipUslugeS, kontaktS, telS, emailS, siteS }).then(res => {
                console.log(res.data)
                setValid(true)
                setSpinerOn(false)
                setOpenServEdit(false)

            }).catch(er => {
                setSpinerOn(false)
                alert(er)
                console.log(er)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifySifra, verifyNaziv, verifyTip)
        }

    }


    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Održavanje</h3>
            <div className="form">


                <div className="single-input-container">
                    <label for="sifra-klijenta" className="standard--label">Šifra klijenta</label>
                    <input ref={sifraRef} type="text" onChange={(e) => setSifraS(e.target.value)} className="standard--input" id="sifra-klijenta" name="sifra-klijenta" />
                </div>

                <div className="single-input-container">
                    <label for="naziv-firme" className="standard--label">Naziv firme</label>
                    <input ref={nazivRef} type="text" onChange={(e) => setNazivFirme(e.target.value)} className="standard--input" id="naziv-firme" name="naziv-fitme" />
                </div>


                <div className="single-input-container">
                    <label for="tip-usluge" className="standard--label">Tip usluge</label>
                    <select ref={tipRef} onChange={e => setTipUslugeS(e.target.value)} className="standard--input" id="tip-usluge" name="tip-usluge" >
                        <option>Pumpa</option>
                        <option>Delovi</option>
                        <option>Mehanika</option>
                        <option>Elektrika</option>
                        <option>Farbanje</option>
                        <option>Limarija</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label for="kontakt-serviseri" className="standard--label">Kontakt</label>
                    <input ref={kontaktRef} type="text" onChange={(e) => setKontaktS(e.target.value)} className="standard--input" id="kontakt-serviseri" name="kontakt-serviseri" />
                </div>


                <div className="single-input-container">
                    <label for="adresa-serviseri" className="standard--label">Adresa</label>
                    <input ref={adresaRef} type="text" onChange={(e) => setAdresaS(e.target.value)} className="standard--input" id="adresa-serviseri" name="adresa-serviseri" />
                </div>

                <div className="single-input-container">
                    <label for="broj-telefona" className="standard--label">Broj telefona</label>
                    <input ref={telRef} type="text" onChange={(e) => setTelS(e.target.value)} className="standard--input" id="broj-telefona" name="broj-telefona" />
                </div>

                <div className="single-input-container">
                    <label for="mail-serviseri" className="standard--label">E-mail</label>
                    <input ref={emailRef} onChange={(e) => setEmailS(e.target.value)} type="text" className="standard--input" id="mail-serviseri" name="mail-serviseri" />

                </div>

                <div className="single-input-container">
                    <label for="sajt-servisi" className="standard--label">Website</label>
                    <input ref={siteRef} onChange={(e) => setSiteS(e.target.value)} type="text" className="standard--input" id="sajt-servisi" name="sajt-servisi" />
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