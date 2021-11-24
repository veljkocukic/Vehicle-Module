import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { Spiner } from "../ProfilPolja/Editi/Spiner"


export const NovoServiseri = () => {
    let { valid, setValid, spinerOn, setSpinerOn, setNewOn, setAdresaS, adresaS, id, kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS } = useContext(DataContext)



    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifySifra = sifraS.length > 10
        let verifyNaziv = nazivFirme.length > 5
        let verifyTip = tipUslugeS.length > 1

        if (verifySifra && verifyNaziv && verifyTip) {
            await axios.post("http://localhost:5000/api/v1/serviseri", { id, sifraS, adresaS, nazivFirme, tipUslugeS, kontaktS, telS, emailS, siteS }).then(res => {
                if (res.data !== "success") {
                    alert("error")
                    console.log(res.data)
                    return
                }
                setValid(true)
                setSpinerOn(false)
                setNewOn(false)
                window.location.reload()

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


    const handleCancel = () => {
        setSifraS("")
        setNazivFirme("")
        setTipUslugeS("Pumpa")
        setKontaktS("")
        setTelS("")
        setEmailS("")
        setSiteS("")
        setAdresaS("")
        setNewOn(false)
        setValid(true)
    }




    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Serviseri i eksterni saradnici</h3>
            <div className="form">


                <div className="single-input-container">
                    <label htmlFor="sifra-klijenta" className="standard--label">Šifra klijenta</label>
                    <input type="text" onChange={(e) => setSifraS(e.target.value)} className="standard--input" id="sifra-klijenta" name="sifra-klijenta" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="naziv-firme" className="standard--label">Naziv firme</label>
                    <input type="text" onChange={(e) => setNazivFirme(e.target.value)} className="standard--input" id="naziv-firme" name="naziv-fitme" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="tip-usluge" className="standard--label">Tip usluge</label>
                    <select onChange={e => setTipUslugeS(e.target.value)} className="standard--input" id="tip-usluge" name="tip-usluge" >
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
                    <input type="text" onChange={(e) => setKontaktS(e.target.value)} className="standard--input" id="kontakt-serviseri" name="kontakt-serviseri" />
                </div>


                <div className="single-input-container">
                    <label htmlFor="adresa-serviseri" className="standard--label">Adresa</label>
                    <input type="text" onChange={(e) => setAdresaS(e.target.value)} className="standard--input" id="adresa-serviseri" name="adresa-serviseri" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="broj-telefona" className="standard--label">Broj telefona</label>
                    <input type="text" onChange={(e) => setTelS(e.target.value)} className="standard--input" id="broj-telefona" name="broj-telefona" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="mail-serviseri" className="standard--label">E-mail</label>
                    <input onChange={(e) => setEmailS(e.target.value)} type="text" className="standard--input" id="mail-serviseri" name="mail-serviseri" />

                </div>

                <div className="single-input-container">
                    <label htmlFor="sajt-servisi" className="standard--label">Website</label>
                    <input onChange={(e) => setSiteS(e.target.value)} type="text" className="standard--input" id="sajt-servisi" name="sajt-servisi" />
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