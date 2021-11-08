import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { DataContext } from "./Context"



export const Main = () => {
    let { id, setId, markaRef, regBrRef, tipKorRef, korVozRef, isticRef, activeRef,formatDate,verDate } = useContext(DataContext)
    let [vozila, setVozila] = useState([])
    let [zaposleniLista, setZaposleniLista] = useState([])
    let zaposleniSelect = useRef(null)


    useEffect(() => {
        const fetchData1 = async () => {
            await axios.get("http://localhost:5000/api/v1/main").then(e => {
                setVozila(e.data)
            })
        }

        const fetchData2 = async () => {
            await axios.get("http://localhost:5000/api/v1/zaposleni").then(e => {
                setZaposleniLista(e.data)
            })
        }
        fetchData1()
        fetchData2()
    }, [])



    
    let [editOn, setEditOn] = useState(false)
    
    const Edit = (props) => {
        
        const ZaposleniLista = () => {
            
            return (
                <select ref={zaposleniSelect} onChange={(e) => setKorisnikMn(e.target.value)}>
                    {zaposleniLista.map(item => <option value={item.ime}>{item.ime}</option>)}
                </select>
            )
        }
        let [valid, setValid] = useState(true)
        let [zaposleni, setZaposleni] = useState(true)
        let [marka, setMarka] = useState("")
        

        let [regBr, setRegBr] = useState(0)
        let [typeMn, setTypeMn] = useState("Zaposleni")
        let [korisnikMn, setKorisnikMn] = useState("")
        let [isticanje, setIsticanje] = useState(0)
        let [aktivnoOd, setAktivnoOd] = useState(0)

        useEffect(() => {
            let vozilo = vozila.find(item => item.id === id)
            setMarka(vozilo.markaTip)
            setRegBr(vozilo.regBroj)
            setTypeMn("Zaposleni")
            setKorisnikMn(vozilo.korisnikVozila)
            setIsticanje(vozilo.isticanje)
            setAktivnoOd(vozilo.activeFrom)
            markaRef.current.value = vozilo.markaTip
            regBrRef.current.value = vozilo.regBroj
            if (vozilo.tipKorisnika !== "Zaposleni") {
                tipKorRef.current.value = "Druga lica"
                setZaposleni(false)
            } else {
                zaposleniSelect.current.value = vozilo.korisnikVozila
            }
            try {
                isticRef.current.value = vozilo.isticanjeEdit
                activeRef.current.value = vozilo.activeFromEdit

            } catch (error) {
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
            } else {
                setZaposleni(false)
            }
        }


        let verReg = (inp) => {
            const regex = /.{2}-[0-9]{3,5}-[A-Z]{2}/gm;
            try {
                return inp.match(regex)[0] === inp
            } catch (error) {
                return false
            }
        }

        let handleSubmit = async () => {
            let verifyMarka = marka.length > 2
            let verifyReg = verReg(regBr)
            let verifyKorisnik = korisnikMn.length > 2
            let verifyIsticanje = verDate(isticanje)
            let verifyActive = verDate(aktivnoOd)
            if (verifyMarka && verifyReg && verifyKorisnik && verifyIsticanje && verifyActive) {
                await axios.patch("http://localhost:5000/api/v1/izmena", {
                    id, marka, regBr, typeMn, korisnikMn, isticanje, aktivnoOd

                }).catch(er => console.log(er))
                setEditOn(false)
                setValid(true)
            } else {
                setValid(false)
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
        }



        return (
            <table class="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr class="editTr"><td>Marka i tip</td><td><input type="text" onChange={(e) => { setMarka(e.target.value) }} ref={markaRef} /></td></tr>
                    <tr class="editTr"><td>Registracioni broj</td><td><input placeholder={"Format: \"BG-123-EF \""} type="text" onChange={(e) => { setRegBr(e.target.value) }} ref={regBrRef} /></td></tr>
                    <tr class="editTr"><td>Tip korisinika</td><td><select onChange={handleChange} ref={tipKorRef}><option >Zaposleni</option><option>Druga lica</option></select></td></tr>
                    <tr class="editTr"><td>Korisnik vozila</td><td>{zaposleni ? <ZaposleniLista /> : <input type="text" onChange={(e) => { setKorisnikMn(e.target.value) }} ref={korVozRef} />}</td></tr>
                    <tr class="editTr"><td>Isticanje registracije</td><td><input type="date" onChange={(e) => { setIsticanje(e.target.value) }} ref={isticRef} /></td></tr>
                    <tr class="editTr"><td>Vozilo aktivno od do</td><td><input type="date" onChange={(e) => { setAktivnoOd(e.target.value) }} ref={activeRef} /></td></tr>
                    <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                </tbody>
            </table>
        )
    }


    const handleEditOn = (id) => {
        setId(id)
        setEditOn(true)
    }


    const Kolona = (props) => {
        return (
            <tr>
                <td class="tg-0pky"><Link to={`/profil/${props.id}`}>{props.name}</Link></td>
                <td class="tg-0pky">{props.reg}</td>
                <td class="tg-0pky">{props.utype}</td>
                <td class="tg-0pky">{props.uname}</td>
                <td class="tg-0pky">{formatDate(props.expire)}</td>
                <td class="tg-0pky">{props.active}</td>
                <td class="tg-0pky btn"><button onClick={() => handleEditOn(props.id)}>Izmeni</button></td>
            </tr>
        )
    }

    return (
        <div>
            {editOn && <Edit />}
            <div className="tabela">
                <table class="tg">
                    <thead>
                        <tr>
                            <th class="tg-0pky">Marka i tip</th>
                            <th class="tg-0pky">Registracioni broj</th>
                            <th class="tg-0pky">Tip korisinika</th>
                            <th class="tg-0pky">Korisnik vozila</th>
                            <th class="tg-0pky">Isticanje registracije</th>
                            <th class="tg-0pky">Vozilo aktivno od do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vozila.map((item) => <Kolona key={item.id} id={item.id} name={item.markaTip} reg={item.regBroj} utype={item.tipKorisnika} uname={item.korisnikVozila} expire={item.isticanje} active={item.activeFrom} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}