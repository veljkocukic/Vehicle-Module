import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"

export const EditServis = ({ serviseriAr }) => {

    let [valid, setValid] = useState("")
    let [sifra, setSifra] = useState("")
    let [naziv, setNaziv] = useState("")
    let [typeServ, setTypeServ] = useState("Pumpa")
    let { id, setOpenServEdit, kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS, } = useContext(DataContext)

    let sifraRef = useRef(null)
    let nazivRef = useRef(null)
    let tipRef = useRef(null)
    let kontaktRef = useRef(null)
    let telRef = useRef(null)
    let emailRef = useRef(null)
    let siteRef = useRef(null)



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

        sifraRef.current.value = serv.sifraKlijenta
        nazivRef.current.value = serv.nazivFirme
        tipRef.current.value = serv.tipUsluge
        kontaktRef.current.value = serv.kontakt
        telRef.current.value = serv.brTelefona
        emailRef.current.value = serv.email
        siteRef.current.value = serv.website

    }, [])


    const handleCancel = () => {

        setSifraS("")
        setNazivFirme("")
        setTipUslugeS("")
        setKontaktS("")
        setTelS("")
        setEmailS("")
        setSiteS("")
        setOpenServEdit(false)

    }

    return (
        <table className="tg editTable">
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
                <tr><td>E-mail</td><td><input type="text" onChange={e => setEmailS(e.target.value)} ref={emailRef} /></td></tr>
                <tr><td>Website</td><td><input type="text" onChange={e => setSiteS(e.target.value)} ref={siteRef} /></td></tr>
                <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" >Sačuvaj</button></td></tr>
            </tbody>
        </table>)
}