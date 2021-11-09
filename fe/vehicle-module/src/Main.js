import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { DataContext } from "./Context"
import { Spiner } from "./ProfilPolja/Editi/Spiner";
import "../src/style/main.css"



export const Main = () => {
    let { spinerOn,setSpinerOn, id, setId, markaRef, regBrRef, tipKorRef, korVozRef, isticRef, activeRef,formatDate,verDate } = useContext(DataContext)
    let [vozila, setVozila] = useState([])
    let [zaposleniLista, setZaposleniLista] = useState([])
    let zaposleniSelect = useRef(null)
    let [spinerMain,setSpimerMain] = useState(true)


    useEffect(() => {
        const fetchData1 = async () => {
            await axios.get("http://localhost:5000/api/v1/main").then(e => {
                setVozila(e.data)
            })
        }

        const fetchData2 = async () => {
            await axios.get("http://localhost:5000/api/v1/zaposleni").then(e => {
                setZaposleniLista(e.data)
                setSpimerMain(false)
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
            setSpinerOn(true)
            let verifyMarka = marka.length > 2
            let verifyReg = verReg(regBr)
            let verifyKorisnik = korisnikMn.length > 2
            let verifyIsticanje = verDate(isticanje)
            let verifyActive = verDate(aktivnoOd)
            if (verifyMarka && verifyReg && verifyKorisnik && verifyIsticanje && verifyActive) {
                await axios.patch("http://localhost:5000/api/v1/izmena", {
                    id, marka, regBr, typeMn, korisnikMn, isticanje, aktivnoOd

                })
                .then(()=>setSpinerOn(false))
                .catch(er => console.log(er))
                setSpinerOn(false)
                setEditOn(false)
                setValid(true)
            } else {
                setValid(false)
                setSpinerOn(false)
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


        // let red = [{ime:"Marka i tip",tip:"text",fn:setMarka,ref={markaRef},cls:"markaTip",to:"main"} ,
        // {ime:"Registracioni broj",tip:"text",fn:setRegBr,ref={regBrRef}, cls:"rebBr"},
        // {ime:"Tip korisnika",tip:"select",options:["Zaposleni","Druga lica"],ref={tipKorRef}},
        // {ime: "Korisnik vozila"},
        // {ime: "Isticanje registracije",tip:"date",fn:setIsticanje,ref={isticRef},cls="istic"},
        // {ime: "Vozilo aktivno od do",tip:"date",fn:setAktivnoOd,ref={activeRef}}]
        
        return (
             <table class="tg editTable">
                 {spinerOn && <Spiner/>}
                 <thead>
                 <th class="tg-0pky">Naziv polja</th>
                     <th class="tg-0pky">Izmena</th>
                 </thead>
                 <tbody>
                     <tr class="editTr"><td>Marka i tip</td><td><input type="text" onChange={(e) => { setMarka(e.target.value) }} ref={markaRef} /></td></tr>
                     <tr class="editTr"><td>Registracioni broj</td><td><input placeholder={"Format: \"BG-123-EF \""} type="text" onChange={(e) => { setRegBr(e.target.value) }} ref={regBrRef} /></td></tr>
                     <tr class="editTr"><td>Tip korisinika</td><td><select onChange={handleChange} ref={tipKorRef}><option >Zaposleni</option><option>Druga lica</option></select></td></tr>
                    <tr class="editTr"><td>Korisnik vozila</td><td>{zaposleni ? <ZaposleniLista /> : <input type="text" onChange={(e) => { setKorisnikMn(e.target.value) }} ref={korVozRef} />}</td></tr>
<<<<<<< Updated upstream
                     <tr class="editTr"><td>Isticanje registracije</td><td><input type="date" onChange={(e) => { setIsticanje(e.target.value) }} ref={isticRef} /></td></tr>
                     <tr class="editTr"><td>Vozilo aktivno od do</td><td><input type="date" onChange={(e) => { setAktivnoOd(e.target.value) }} ref={activeRef} /></td></tr>
                     <tr><td><button onClick={handleCancel} className="btn no">OTKAŽI</button></td><td><button type="submit" className="btn yes" onClick={handleSubmit}>SAČUVAJ</button></td></tr>
                     {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                 </tbody>
             </table>
            
=======
                    <tr class="editTr"><td>Isticanje registracije</td><td><input type="date" onChange={(e) => { setIsticanje(e.target.value) }} ref={isticRef} /></td></tr>
                    <tr class="editTr"><td>Vozilo aktivno od do</td><td><input type="date" onChange={(e) => { setAktivnoOd(e.target.value) }} ref={activeRef} /></td></tr>
                    <tr><td><button onClick={handleCancel} className="btn no"><i class="far fa-times-circle"></i> OTKAŽI</button></td><td><button type="submit" className="btn yes" onClick={handleSubmit}><i class="far fa-save"></i> SAČUVAJ</button></td></tr>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                </tbody>
            </table>


>>>>>>> Stashed changes


                           


        )
    }


    const handleEditOn = (id) => {
        setId(id)
        setEditOn(true)
    }


    const Kolona = (props) => {
        return (
            <tr>
                <th class="tg-0pky"><Link to={`/profil/${props.id}`}>{props.name}</Link></th>
                <td class="tg-0pky">{props.reg}</td>
                <td class="tg-0pky">{props.utype}</td>
                <td class="tg-0pky">{props.uname}</td>
                <td class="tg-0pky">{formatDate(props.expire)}</td>
                <td class="tg-0pky">{props.active}</td>
<<<<<<< Updated upstream
                <td class="tg-0pky btn"><button className="editBtn" onClick={() => handleEditOn(props.id)}>  <i class="fa-solid fa-pen-to-square"></i> IZMENI</button></td>
=======
                <td class="tg-0pky"><button className="btn" onClick={() => handleEditOn(props.id)}><i class="fas fa-edit"></i>   IZMENI</button></td>
>>>>>>> Stashed changes
            </tr>
        )
    }

    return (
        <div>
            {spinerMain && <Spiner />}
            {editOn && <Edit />}
            <div className="tabela">
                <table class="tg">
                    <thead>
                        <tr >
                            <th  colSpan="7" >Prikaz svih vozila</th>
                        </tr>
                        <tr  className="head-table">
                            <th className="tg-0pky">Marka i tip</th>
                            <th className="tg-0pky">Registracioni broj</th>
                            <th className="tg-0pky">Tip korisinika</th>
                            <th className="tg-0pky">Korisnik vozila</th>
                            <th className="tg-0pky">Isticanje registracije</th>
                            <th className="tg-0pky">Vozilo aktivno od do</th>
<<<<<<< Updated upstream
                            <th className="tg-0pky"><button className="new">Novo +</button></th>
=======
                            <th className="tg-0pky"><button className="editBtn"><i class="fas fa-plus"></i> NOVO</button></th>
>>>>>>> Stashed changes
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