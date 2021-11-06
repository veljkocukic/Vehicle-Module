import React, { useState, useContext } from "react"
import { EditRegistracija } from "./Editi/EditRegistracija"
import { DataContext } from "../Context"



export const Registracija = ({ registracijaAr, carId }) => {
    let { setId, formatDate, setOpenRegEdit, openRegEdit } = useContext(DataContext)
    let [regId, setRegId] = useState("")


    const handleRegEditOpen = (_id) => {
        setRegId(_id)
        setId(_id)
        setOpenRegEdit(true)
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
                <td><button onClick={() => handleRegEditOpen(props.kid)}>Izmeni</button><button>Obriši</button></td>
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
                {registracijaAr.map((item, key) => <Kolone kid={item._id} date={item.datumRegistracije} doc={item.dokumentacija} reg={item.troskoviRegistracije} user={item.registrovaoZaposleni} time={item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
            </tbody>
        </table>
    )
}