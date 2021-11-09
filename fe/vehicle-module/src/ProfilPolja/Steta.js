import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditSteta } from "./Editi/EditSteta"
import { Dialog } from "./Editi/Dialog"
import { useParams } from "react-router"



export const Steta = ({ stetaAr }) => {

    let {openDialog,setOpenDialog, openDmgEdit, setOpenDmgEdit, setId, formatDate } = useContext(DataContext)
    let {carId} = useParams()


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
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td><button className="btn" onClick={() => handleOpen(props._id)}><i class="fas fa-edit"></i>IZEMNI</button><button className="btn del" onClick={()=>handleDelete(props._id)}><i class="far fa-trash-alt"></i> OBRIŠI</button></td>
            </tr>
        )
    }


    return (
        <table className="tg">
            {openDmgEdit && <EditSteta stetaAr={stetaAr} />}
            <thead>
                <tr>
                    <th>Opis štete</th>
                    <th>Štetu pokriva</th>
                    <th>Datum</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                    <th className="tg-0pky"><button className="editBtn"><i class="fas fa-plus"></i> Novo</button></th>
                </tr>
            </thead>
            <tbody>
            {openDialog && <Dialog par={carId} polje="dmg" />}
                {stetaAr.map((item, key) => <KoloneSteta _id={item._id} desc={item.opisStete} cover={item.stetuPokriva} date={item.datum} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}