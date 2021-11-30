import React, { useRef, useEffect, useContext, useState } from "react"
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
        setEmailS(serv.email || "")
        setSiteS(serv.website || "")
        setAdresaS(serv.adresa)

        sifraRef.current.value = serv.sifraKlijenta
        nazivRef.current.value = serv.nazivFirme
        tipRef.current.value = serv.tipUsluge
        kontaktRef.current.value = serv.kontakt || ""
        telRef.current.value = serv.brTelefona || ""
        emailRef.current.value = serv.email || ""
        siteRef.current.value = serv.website || "" 
        adresaRef.current.value = serv.adresa || ""

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
        setValid(true)
    }

    function checkMail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
        return (false)
    }

    function checkSite(site){
        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);
        if(site.match(regex)){
            return true
        }else{
            return false
        }
    }

    let [sifraFalse,setSifraFalse] = useState(false)
    let [nazivFalse,setNazivFalse] = useState(false)
    let [mailFalse,setMailFalse] = useState(false)
    let [siteFalse,setSiteFalse] = useState(false)

    const handleSubmit = () => {
        setSpinerOn(true)
        let verifySifra = sifraS.length > 10
        let verifyNaziv = nazivFirme.length > 5
        let verifyMail = (emailS.length>=0 ? checkMail(emailS) : true)
        let verifySite = (siteS.length>=0 ? checkSite(siteS) : true)



        if (verifySifra && verifyNaziv &&verifySite&&verifyMail) {
            console.log("Site: "+siteS + "\n mail: "+emailS)
            axios.patch("http://localhost:5000/api/v1/serviseri", { id, sifraS, adresaS, nazivFirme, tipUslugeS, kontaktS, telS, emailS, siteS }).then(res => {
                setValid(true)
                setSpinerOn(false)
                setOpenServEdit(false)
                window.location.reload()

            }).catch(er => {
                setSpinerOn(false)
                alert(er)
                console.log(er)
            })
        } else {
            !verifySifra ? setSifraFalse(true) : setSifraFalse(false)
            !verifyNaziv ? setNazivFalse(true) : setNazivFalse(false)
            !verifyMail ? setMailFalse(true) : setMailFalse(false)
            !verifySite ? setSiteFalse(true) : setSiteFalse(false)
            setValid(false)
            setSpinerOn(false)
            console.log("Site: "+siteS + "\n mail: "+emailS)
            console.log(siteS)
            console.log(verifySifra, verifyNaziv,verifyMail,verifySite)
        }

    }


    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Serviseri i ekstreni saradnici</h3>
            <div className="form">


                <div className="single-input-container">
                    <label htmlFor="sifra-klijenta" className="standard--label">Šifra klijenta <span>*</span></label>
                    <input style={{border: sifraFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=10 ? setSifraFalse(true) : setSifraFalse(false)} ref={sifraRef} type="text" onChange={(e) => setSifraS(e.target.value)} className="standard--input" id="sifra-klijenta" name="sifra-klijenta" />
                    {sifraFalse && <p style={{color:"red",fontSize:"0.8em"}}>Unos mora biti duži od 10 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="naziv-firme" className="standard--label">Naziv firme <span>*</span></label>
                    <input style={{border: nazivFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=5 ? setNazivFalse(true):setNazivFalse(false)} ref={nazivRef} type="text" onChange={(e) => setNazivFirme(e.target.value)} className="standard--input" id="naziv-firme" name="naziv-fitme" />
                    {nazivFalse && <p style={{color:"red",fontSize:"0.8em"}}>Unos mora biti duži od 5 karaktera</p>}
                </div>


                <div className="single-input-container">
                    <label htmlFor="tip-usluge" className="standard--label">Tip usluge <span>*</span></label>
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
                    <label htmlFor="kontakt-serviseri" className="standard--label">Kontakt</label>
                    <input onBlur={e=>e.target.value.length<6 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={kontaktRef} type="text" onChange={(e) => setKontaktS(e.target.value)} className="standard--input" id="kontakt-serviseri" name="kontakt-serviseri" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="adresa-serviseri" className="standard--label">Adresa</label>
                    <input onBlur={e=>e.target.value.length<8 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={adresaRef} type="text" onChange={(e) => setAdresaS(e.target.value)} className="standard--input" id="adresa-serviseri" name="adresa-serviseri" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="broj-telefona" className="standard--label">Broj telefona</label>
                    <input onBlur={e=>e.target.value.length<7 ? e.target.style.border="1px solid red" : e.target.style.border="none"} ref={telRef} type="text" onChange={(e) => setTelS(e.target.value)} className="standard--input" id="broj-telefona" name="broj-telefona" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="mail-serviseri" className="standard--label">E-mail</label>
                    <input style={{border:mailFalse&&"1px solid red"}} onBlur={e=>(e.target.value.length>0 && checkMail(e.target.value)) ? setMailFalse(false) : setMailFalse(true)}ref={emailRef} onChange={(e) => setEmailS(e.target.value)} type="text" className="standard--input" id="mail-serviseri" name="mail-serviseri" />
                    {(mailFalse) && <p style={{fontSize:"0.8em",color:"red"}}>Neispravan format e-mail adrese</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="sajt-servisi" className="standard--label">Website</label>
                    <input style={{border:siteFalse&&"1px solid red"}} onBlur={e=>(e.target.value.length>0 && checkSite(e.target.value)) ? setSiteFalse(false) : setSiteFalse(true)} ref={siteRef} onChange={(e) => setSiteS(e.target.value)} type="text" className="standard--input" id="sajt-servisi" name="sajt-servisi" />
                    {(siteFalse) && <p style={{fontSize:"0.8em",color:"red"}}>Neispravan format sajta</p>}
                </div>

            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu bili validni</h3>}
        </div>
    )
}