import React, { useState, useContext } from "react"
import { EditRegistracija } from "./Editi/EditRegistracija"
import { DataContext } from "../Context"
import {Dialog} from "./Editi/Dialog.js"
import {useParams} from "react-router-dom"

export const Registracija = ({ registracijaAr}) => {
    let { setId, formatDate, setOpenRegEdit, openRegEdit,openDialog,setOpenDialog } = useContext(DataContext)
    let [regId, setRegId] = useState("")
    let {carId} = useParams()


    const handleRegEditOpen = (_id) => {
        setRegId(_id)
        setId(_id)
        setOpenRegEdit(true)
    }

    const handleDelete = (_id) => {
        setOpenDialog(true)
        setRegId(_id)
        setId(_id)
        console.log("e")
    }

    const Kolone = (props) => {
        return (
            <tr>
                <td>{formatDate(props.date)}</td>
                <td>{props.doc}</td>
                <td>{props.reg}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td>{formatDate(props.expire)}</td>
                <td><button onClick={() => handleRegEditOpen(props.kid)}>Izmeni</button><button onClick={() => handleDelete(props.kid)}>Obriši</button></td>
            </tr>
        )
    }

    return (
        <table className="tg">
            {openRegEdit && <EditRegistracija registracijaAr={registracijaAr} regId={regId} carId={carId} />}

            <thead>
                <tr>
                    
                    <th>Datum registracije</th>
                    <th>Dokumentacija</th>
                    <th>Troškovi registracije</th>
                    <th>Registrovao zaposleni</th>
                    <th>Vreme zaposlenog</th>
                    <th>Registrovan do</th>
                </tr>
            </thead>
            <tbody>
                {openDialog && <Dialog par={carId} polje="reg"/>}
                {registracijaAr.map((item, key) => <Kolone kid={item._id} date={item.datumRegistracije} doc={item.dokumentacija} reg={item.troskoviRegistracije} user={item.registrovaoZaposleni} time={item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
            </tbody>
        </table>
    )
}