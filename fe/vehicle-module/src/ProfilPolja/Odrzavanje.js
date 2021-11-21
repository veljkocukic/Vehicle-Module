import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditOdrzavanje } from "./Editi/EditOdrzavanje"
import { Dialog } from "./Editi/Dialog"
import { useParams } from "react-router"
import { NovoOdrzavanje } from "./Novo/NovoOdrzavanje"


export const Odrzavanje = ({ odrzavanjeAr }) => {

    let { minsToTime, newOn, setNewOn, openDialog, setOpenDialog, openOdrEdit, setOpenOdrEdit, formatDate, setId } = useContext(DataContext)
    let { carId } = useParams()

    const KoloneOdrz = (props) => {


        const handleOpen = (id) => {

            setId(id)
            setOpenOdrEdit(true)

        }

        const handleDelete = (kid) => {
            setOpenDialog(true)
            setId(kid)
        }
        return (
            <tr>
                <td>{props.type}</td>
                <td>{formatDate(props.date)}</td>
                <td>{props.km}</td>
                <td>{props.part}</td>
                <td>{props.total}</td>
                <td>{props.user || "/"}</td>
                <td>{minsToTime(props.time) || "/"}</td>
                <td><button className="btn " onClick={() => handleOpen(props._id)}><i className="fas fa-edit"></i> IZEMNI</button><button className="btn del" onClick={() => handleDelete(props._id)}><i className="far fa-trash-alt"></i>  OBRIŠI</button></td>
            </tr>
        )

    }

    return (
        <table className="tg">
            {openOdrEdit && <EditOdrzavanje odrzavanjeAr={odrzavanjeAr} />}
            <thead>
                <tr>
                    <th colSpan="8" >Održavanje</th>
                </tr>
                <tr className="head-table">
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                    <th className="tg-0pky"><button className="editBtn" onClick={() => setNewOn(true)}><i className="fas fa-plus"></i> Novo</button></th>
                </tr>
            </thead>
            <tbody>
                {newOn && <NovoOdrzavanje />}
                {openDialog && <Dialog par={carId} polje="odr" />}
                {odrzavanjeAr.map((item, key) => < KoloneOdrz _id={item._id} type={item.tip} date={item.datum} km={item.kilometraza} part={item.deloviUsluga} total={item.cena.toLocaleString()} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}