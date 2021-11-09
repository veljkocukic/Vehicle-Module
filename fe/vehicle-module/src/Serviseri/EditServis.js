import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { Spiner } from "../ProfilPolja/Editi/Spiner"

export const EditServis = ({ serviseriAr }) => {

    let {setAdresaS,adresaS, valid, setValid, spinerOn, setSpinerOn, id, setOpenServEdit, kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS, } = useContext(DataContext)

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
        adresaRef.current.value=serv.adresa

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
            axios.patch("http://localhost:5000/api/v1/serviseri", { id, sifraS, adresaS,nazivFirme, tipUslugeS, kontaktS, telS, emailS, siteS }).then(res => {
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
            console.log(verifySifra,verifyNaziv,verifyTip)
        }

    }


    return (
        <table className="tg editTable">
            {spinerOn && <Spiner />}
            <thead>
                <th class="tg-0pky">Naziv polja</th>
                <th class="tg-0pky">Izmena</th>
            </thead>
            <tbody>
                <tr><td>Šifra klijenta </td><td><input type="text" onChange={e => setSifraS(e.target.value)} ref={sifraRef} /></td></tr>
                <tr><td>Naziv firme </td><td><input type="text" onChange={e => setNazivFirme(e.target.value)} ref={nazivRef} /></td></tr>
                <tr><td>Tip usluge</td><td><select onChange={e => setTipUslugeS(e.target.value)} ref={tipRef}><option>Pumpa</option><option>Delovi</option><option>Mehanika</option><option>Elektrika</option><option>Farbanje</option><option>Limarija</option></select></td></tr>
                <tr><td>Kontakt</td><td><input type="text" onChange={e => setKontaktS(e.target.value)} ref={kontaktRef} /></td></tr>
                <tr><td>Broj telefona</td><td><input type="text" onChange={e => setTelS(e.target.value)} ref={telRef} /></td></tr>
                <tr><td>Adresa</td><td><input type="text" onChange={e => setAdresaS(e.target.value)} ref={adresaRef} /></td></tr>
                <tr><td>E-mail</td><td><input type="text" onChange={e => setEmailS(e.target.value)} ref={emailRef} /></td></tr>
                <tr><td>Website</td><td><input type="text" onChange={e => setSiteS(e.target.value)} ref={siteRef} /></td></tr>
                <tr><td><button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button></td><td><button className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button></td></tr>
            </tbody>
            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </table>)
}