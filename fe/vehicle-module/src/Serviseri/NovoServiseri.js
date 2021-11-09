import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "../style/new.css"
import { DataContext } from "../Context"
import { Spiner } from "../ProfilPolja/Editi/Spiner"
import { useParams } from "react-router-dom"


export const NovoServiseri = () => {
    let { valid, setValid, spinerOn, setSpinerOn, setNewOn, newOn, setOpenDialog, openDialog, openServEdit, setOpenServEdit, setId, setAdresaS, adresaS, id, kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS, } = useContext(DataContext)



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
    }




    return (
        <div className="editCont">
            {spinerOn && <Spiner />}
            <h3 className="editTitle">Unos nove stavke</h3>
            <div className="containerInput">

                <div className="kontejner txtc">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setSifraS(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">Šifra klijenta</p>
                    </label>
                </div>

                <div className="kontejner txtc">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setNazivFirme(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">Naziv firme</p>
                    </label>
                </div>

                <div className="kontejner">
                    <select name="ime" className="inp" autocomplete="off" required onChange={(e) => setTipUslugeS(e.target.value)}>
                        <option>Pumpa</option>
                        <option>Delovi</option>
                        <option>Mehanika</option>
                        <option>Elektrika</option>
                        <option>Farbanje</option>
                        <option>Limarija</option>

                    </select>
                    <label for="ime" class="labela">
                        <p className="sp">Tip usluge</p>
                    </label>
                </div>



                <div className="kontejner">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setKontaktS(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">Kontakt</p>
                    </label>
                </div>

                <div className="kontejner">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setAdresaS(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">Adresa</p>
                    </label>
                </div>

                <div className="kontejner">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setEmailS(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">E-mail</p>
                    </label>
                </div>

                <div className="kontejner">
                    <input type="text" name="ime" className="inp" autocomplete="off" required onChange={(e) => setSiteS(e.target.value)} />
                    <label for="ime" class="labela">
                        <p className="sp">Website</p>
                    </label>
                </div>

            </div>
            <div className="btnsContainer">
                <button className="btn yes " onClick={handleSubmit}>SAČUVAJ</button>
                <button className="btn no " onClick={handleCancel}>OTKAŽI</button>
            </div>
            {!valid && <h3 className="nonValid-new">Uneti podaci nisu validni</h3>}
        </div>
    )

}