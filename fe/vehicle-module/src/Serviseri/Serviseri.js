import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { EditServis } from "./EditServis"
import { Spiner } from "../ProfilPolja/Editi/Spiner"


export const Serviseri = () => {
    const [serviseriAr, setServiseriAr] = useState([])
    let { openServEdit, setOpenServEdit, setId } = useContext(DataContext)
    let [spinerServ,setSpinerServ] = useState(true)

    useEffect(() => {
        const fetchData = async() => {
            await axios.get("http://localhost:5000/api/v1/serviseri").then(res => setServiseriAr(res.data)).catch(err => console.log(err))
        }
        fetchData().then(()=>setSpinerServ(false)).catch(er=>{
            console.log(er)
            setSpinerServ(false)
        })
    }, [])

    const KoloneServiseri = (props) => {

        const handleOpen = (i) => {

            setId(i)
            setOpenServEdit(true)

        }

        return (
            <tr>
                <td>{props.sifraKlijenta}</td>
                <td>{props.nazivFirme}</td>
                <td>{props.tipUsluge}</td>
                <td>{props.kontakt}</td>
                <td>{props.adresa}</td>
                <td>{props.brTelefona}</td>
                <td>{props.email}</td>
                <td>{props.website}</td>
                <td><button className="btn" onClick={() => handleOpen(props.id)} >IZMENI</button><button className="btn del">OBRIŠI</button></td>
            </tr>
        )

    }
    return (
        <table className="tg servt">
            {spinerServ && <Spiner />}
            {openServEdit && <EditServis serviseriAr={serviseriAr} />}
            <thead>
                <tr>
                    <th>Šifra klijenta</th>
                    <th>Naziv firme</th>
                    <th>Tip usluge</th>
                    <th>Kontakt</th>
                    <th>Adresa</th>
                    <th>Br. telefona</th>
                    <th>E-mail</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody>
                {serviseriAr.map((item, key) => <KoloneServiseri id={item._id} sifraKlijenta={item.sifraKlijenta} nazivFirme={item.nazivFirme} tipUsluge={item.tipUsluge} kontakt={item.kontakt} adresa={item.adresa} brTelefona={item.brTelefona} email={item.email} website={item.website} key={key} />)}
            </tbody>
        </table>
    )
}