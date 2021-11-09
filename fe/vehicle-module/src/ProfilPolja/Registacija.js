import React, { useState, useContext } from "react"
import { EditRegistracija } from "./Editi/EditRegistracija"
import { DataContext } from "../Context"
import { Dialog } from "./Editi/Dialog.js"
import { useParams } from "react-router-dom"
import { NovoRegistracija } from "./Novo/NovoRegistracija"

export const Registracija = ({ registracijaAr }) => {
    let { newOn,setNewOn,setId, formatDate, setOpenRegEdit, openRegEdit, openDialog, setOpenDialog } = useContext(DataContext)
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
                <td>{formatDate(props.date)}</td>
                <td>{props.doc}</td>
                <td>{props.reg}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td>{formatDate(props.expire)}</td>
                <td><button className="btn" onClick={() => handleRegEditOpen(props.kid)}><i class="fas fa-edit"></i> IZMENI</button><button className="btn del" onClick={() => handleDelete(props.kid)}> <i class="far fa-trash-alt"></i> OBRIŠI</button></td>
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
<<<<<<< Updated upstream
                    <th className="tg-0pky"><button className="new newp">Novo +</button></th>
=======
                    <th className="tg-0pky"><button className="editBtn" onClick={()=>setNewOn(true)}><i class="fas fa-plus"></i> Novo</button></th>
>>>>>>> Stashed changes
                </tr>
            </thead>
            <tbody>
                {newOn && <NovoRegistracija />}
                {openDialog && <Dialog par={carId} polje="reg" />}
                {registracijaAr.map((item, key) => <Kolone kid={item._id} date={item.datumRegistracije} doc={item.dokumentacija} reg={item.troskoviRegistracije} user={item.registrovaoZaposleni} time={item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
            </tbody>
        </table>
    )
}