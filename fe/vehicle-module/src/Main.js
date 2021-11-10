import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { DataContext } from "./Context"
import { Spiner } from "./ProfilPolja/Editi/Spiner";
import "../src/style/main.css"
import { EditMain } from "./ProfilPolja/Editi/EditMain";
import { NovoMain } from "./ProfilPolja/Novo/NovoMain";



export const Main = () => {
    let { newOn,setNewOn,spinerOn, setSpinerOn, id, setId, markaRef, regBrRef, tipKorRef, korVozRef, isticRef, activeFromRef,activeToRef, formatDate, verDate } = useContext(DataContext)
    let [vozila, setVozila] = useState([])
    let [zaposleniLista, setZaposleniLista] = useState([])
    let zaposleniSelect = useRef(null)
    let [spinerMain, setSpimerMain] = useState(true)


    useEffect(() => {
        const fetchData1 = async () => {
            await axios.get("http://localhost:5000/api/v1/main").then(e => {
                setVozila(e.data)
                console.log(e.data.activeTo)
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
                <td class="tg-0pky">{props.activeFrom}</td>
                <td class="tg-0pky">{props.activeTo}</td>
                <td class="tg-0pky"><button className="btn" onClick={() => handleEditOn(props.id)}><i class="fas fa-edit"></i>IZMENI</button></td>
            </tr>
        )
    }

    return (
        <div>
            {spinerMain && <Spiner />}
            {editOn && <EditMain setEditOn={setEditOn} vozila={vozila} zaposleniSelect={zaposleniSelect} markaRef={markaRef} regBrRef={regBrRef} isticRef={isticRef } tipKorRef={tipKorRef} activeToRef={activeToRef} activeFromRef={activeFromRef} zaposleniLista={zaposleniLista}  korVozRef={korVozRef} />}
            {newOn && <NovoMain zaposleniLista={zaposleniLista} setEditOn={setEditOn}/>}
            <div className="tabela">
                <table class="tg">
                    <thead>
                        <tr >
                            <th colSpan="8" >Prikaz svih vozila</th>
                        </tr>
                        <tr className="head-table">
                            <th className="tg-0pky">Marka i tip</th>
                            <th className="tg-0pky">Registracioni broj</th>
                            <th className="tg-0pky">Tip korisinika</th>
                            <th className="tg-0pky">Korisnik vozila</th>
                            <th className="tg-0pky">Isticanje registracije</th>
                            <th className="tg-0pky">Vozilo aktivno od</th>
                            <th className="tg-0pky">Vozilo aktivno do</th>
                            <th className="tg-0pky"><button className="editBtn" onClick={()=>setNewOn(true)}><i class="fas fa-plus"></i> NOVO</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vozila.map((item) => <Kolona key={item.id} id={item.id} name={item.markaTip} reg={item.regBroj} utype={item.tipKorisnika} uname={item.korisnikVozila} expire={item.isticanje} activeTo={item.activeTo} activeFrom={item.activeFrom} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}