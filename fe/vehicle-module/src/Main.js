import React, { useState,useEffect,useRef,useContext } from "react";
import axios from "axios"
import {DataContext} from "./Context"




let vozilaa = [{ name: "Audi A4", registration: "BG-1009-XP", userType: "Zaposleni", userName: "Tanja Milinkovic", expire: "19.07.2021.", active: "15.07.2016." },
{ name: "Audi A4", registration: "BG-1793-GK", userType: "Zaposleni", userName: "Marko Jovanovic", expire: "20.01.2020.", active: "22.10.2019." }]






export const Main = () => {
    let { marka,setMarka,regBr,setRegBr,typeMn,setTypeMn,korisnikMn,setKorisnikMn,isticanje,setIsticanje,aktivnoOd,setAktivnoOd,markaRef,regBrRef,tipKorRef,korVozRef,isticRef,activeRef } = useContext(DataContext)
    let [vozila,setVozila] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/api/v1/main").then(e=>{ 
                setVozila(e.data)
                console.log(e.data)
             })
        }
        fetchData()
    }, [])





    let [editOn,setEditOn] = useState(false)

    const Edit = (props) => {
        
        let [valid,setValid] = useState(true)
        let [zaposleni,setZaposleni] = useState(true)


        let [marka,setMarka] = useState("")
        let [regBr,setRegBr] = useState(0)
        let [typeMn,setTypeMn] = useState("Zaposleni")
        let [korisnikMn,setKorisnikMn] = useState("")
        let [isticanje,setIsticanje] = useState(0)
        let [aktivnoOd,setAktivnoOd] = useState(0)


        let handleChange = (e) =>{
            if(e.target.value === "Zaposleni"){
                setZaposleni(true)
            }else{
                setZaposleni(false)
            }
        }

        let verDate = (dt) =>{
          return ((new Date(dt) > new Date()) && dt!==0)
     }


        let verReg = (inp) =>{
            const regex = /.{2}-[0-9]{3,5}-[A-Z]{2}/gm;
            try {
                return inp.match(regex)[0]===inp 
            } catch (error) {
                return false
            }
        }

        let handleSubmit = () => {
            let verifyMarka = marka.length>2
            let verifyReg = verReg(regBr)
            let verifyKorisnik = korisnikMn.length>2
            let verifyIsticanje = verDate(isticanje)
            let verifyActive = verDate(aktivnoOd)
            if(verifyMarka&&verifyReg&&verifyKorisnik&&verifyIsticanje&&verifyActive){

                setValid(true)
                setEditOn(false)
            }else{
                setValid(false)
            }
        }
    
        let handleCancel = () =>{
            setMarka("")
            setRegBr("")
            setTypeMn("Zaposleni")
            setKorisnikMn("")
            setIsticanje(0)
            setAktivnoOd(0)
            setEditOn(false)
        }

        return(
            <table class="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr class="editTr"><td>Marka i tip</td><td><input type="text" onChange={(e)=>{setMarka(e.target.value)}} ref={markaRef}/></td></tr>
                    <tr class="editTr"><td>Registracioni broj</td><td><input placeholder={"Format: \"BG-123-EF \""} type="text" onChange={(e)=>{setRegBr(e.target.value)}} ref={regBrRef}/></td></tr>
                    <tr class="editTr"><td>Tip korisinika</td><td><select onChange={(handleChange)} ><option ref={tipKorRef}>Zaposleni</option><option>Druga lica</option></select></td></tr>
                    <tr class="editTr"><td>Korisnik vozila</td><td>{zaposleni ? "iz baze" : <input type="text" onChange={(e)=>{setKorisnikMn(e.target.value)}} ref={korVozRef}/>}</td></tr>
                    <tr class="editTr"><td>Isticanje registracije</td><td><input type="date" onChange={(e)=>{setIsticanje(e.target.value)}} ref={isticRef}/></td></tr>
                    <tr class="editTr"><td>Vozilo aktivno od do</td><td><input type="date" onChange={(e)=>{setAktivnoOd(e.target.value)}} ref={activeRef}/></td></tr>
                    <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                </tbody>
            </table>
        )
    }
    

    const handleEditOn = (id) =>{
        let vozilo = vozila.find(item=>item.id===id)
        console.log(vozilo)
        setMarka(vozilo.markaTip)
        setRegBr(vozilo.regBroj)
        setTypeMn("Zaposleni")
        setKorisnikMn(vozilo.korisnikVozila)
        setIsticanje(vozilo.isticanje)
        setAktivnoOd(vozilo.activeFrom)
        //markaRef.current.value=vozilo.markaTip 
        //regBrRef.current.value=vozilo.regBr 
        //tipKorRef
        //korVozRef.current.value=vozilo.korisnikVozila
        //isticRef.current.value=vozilo.isticanje
        ///activeRef.current.value=vozilo.activeFrom
        setEditOn(true)
    }


    const Kolona = (props) => {

        let id = props.id
        return (
            <tr>
                <td class="tg-0pky">{props.name}</td>
                <td class="tg-0pky">{props.reg}</td>
                <td class="tg-0pky">{props.utype}</td>
                <td class="tg-0pky">{props.uname}</td>
                <td class="tg-0pky">{props.expire}</td>
                <td class="tg-0pky">{props.active}</td>
                <td class="tg-0pky btn"><button onClick={()=>handleEditOn(id)}>Izmeni</button></td>
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