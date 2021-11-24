import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditSteta } from "./Editi/EditSteta"
import { Dialog } from "./Editi/Dialog"
import { useParams } from "react-router"
import { NovoSteta } from "./Novo/NovoSteta"



export const Steta = ({ stetaAr }) => {

    let { minsToTime, newOn, setNewOn, openDialog, setOpenDialog, openDmgEdit, setOpenDmgEdit, setId, formatDate } = useContext(DataContext)
    let { carId } = useParams()


    const KoloneSteta = (props) => {

        const handleOpen = (kid) => {
            setId(kid)
            setOpenDmgEdit(true)
        }

        const handleDelete = (kid) => {
            setOpenDialog(true)
            setId(kid)
        }

        return (
            <tr>
                <td>{props.desc}</td>
                <td>{props.cover}</td>
                <td>{formatDate(props.date)}</td>
                <td>{props.part}</td>
                <td>{props.total}</td>
                <td>{props.user || "/"}</td>
                <td>{minsToTime(props.time) || "/"}</td>
                <td><button className="btn" onClick={() => handleOpen(props._id)}><i className="fas fa-edit"></i>IZEMNI</button><button className="btn del" onClick={() => handleDelete(props._id)}><i className="far fa-trash-alt"></i> OBRIŠI</button></td>
            </tr>
        )
    }


    return (
        <div>
            {openDmgEdit && <EditSteta stetaAr={stetaAr} />}
        <table className="tg">
            <thead>
                <tr>
                    <th colSpan="8" >Šteta</th>
                </tr>
                <tr className="head-table">
                    <th>Opis štete</th>
                    <th>Štetu pokriva</th>
                    <th>Datum</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                    <th className="tg-0pky"><button className="editBtn" onClick={() => setNewOn(true)}><i className="fas fa-plus"></i> Novo</button></th>
                </tr>
            </thead>
            <tbody>
                {stetaAr.map((item, key) => <KoloneSteta _id={item._id} desc={item.opisStete} cover={item.stetuPokriva} date={item.datum} part={item.deloviUsluga} total={item.cena.toLocaleString()} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
                {newOn && <NovoSteta />}
                {openDialog && <Dialog par={carId} polje="dmg" />}
        </div>
    )
}