import React, { useState, useContext } from "react"
import { EditRegistracija } from "./Editi/EditRegistracija"
import { DataContext } from "../Context"
import { Dialog } from "./Editi/Dialog.js"
import { useParams } from "react-router-dom"
import { NovoRegistracija } from "./Novo/NovoRegistracija"

export const Registracija = ({ registracijaAr }) => {
    let { minsToTime, newOn, setNewOn, setId, formatDate, setOpenRegEdit, openRegEdit, openDialog, setOpenDialog } = useContext(DataContext)
    let [regId, setRegId] = useState("")
    let { carId } = useParams()


    const handleRegEditOpen = (_id) => {
        setRegId(_id)
        setId(_id)
        setOpenRegEdit(true)
    }

    const handleDelete = (_id) => {
        setOpenDialog(true)
        setRegId(_id)
        setId(_id)
    }

    const Kolone = (props) => {
        return (
            <tr>
                <td>{!props.date==="/" ? formatDate(props.date):"/"}</td>
                <td>{props.doc}</td>
                <td>{props.reg}</td>
                <td>{props.user}</td>
                <td>{!props.time==="/" ? minsToTime(props.time) : "/"}</td>
                <td>{formatDate(props.expire)}</td>
                <td><button className="btn" onClick={() => handleRegEditOpen(props.kid)}><i className="fas fa-edit"></i> IZMENI</button><button className="btn del" onClick={() => handleDelete(props.kid)}> <i className="far fa-trash-alt"></i> OBRIŠI</button></td>
            </tr>
        )
    }
    let cond = registracijaAr.length===1

    return (
        <div>
            {openRegEdit && <EditRegistracija registracijaAr={registracijaAr} regId={regId} carId={carId} />}
        <table className="tg">

            <thead>
                <tr>
                    <th colSpan="7" >Registracija</th>
                </tr>
                <tr className="head-table" >
                    <th>Datum registracije</th>
                    <th>Dokumentacija</th>
                    <th>Troškovi registracije</th>
                    <th>Registrovao zaposleni</th>
                    <th>Vreme zaposlenog</th>
                    <th>Registrovan do</th>
                    <th className="tg-0pky"><button className="editBtn" onClick={() => setNewOn(true)}><i className="fas fa-plus"></i>Novo</button></th>
                </tr>
            </thead>
            <tbody>
                {registracijaAr.map((item, key) => <Kolone kid={cond ? "/" : item._id} date={cond ? "/" : item.datum} doc={cond ? "/" : item.dokumentacija} reg={cond ? "/" : item.cena.toLocaleString()} user={cond ? "/" : item.registrovaoZaposleni} time={cond ? "/" : item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
            </tbody>
        </table>
                {newOn && <NovoRegistracija />}
                {openDialog && <Dialog par={carId} polje="reg" />}
        </div>
    )
}