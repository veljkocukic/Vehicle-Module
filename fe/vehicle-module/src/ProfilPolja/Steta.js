import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditSteta } from "./Editi/EditSteta"



export const Steta = ({ stetaAr }) => {

    let { openDmgEdit, setOpenDmgEdit, setId, formatDate } = useContext(DataContext)



    const KoloneSteta = (props) => {

        const handleOpen = (id) => {
            setId(id)
            setOpenDmgEdit(true)
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
                <td><button className="btn" onClick={() => handleOpen(props._id)}>IZEMNI</button><button className="btn del">OBRIŠI</button></td>
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
                </tr>
            </thead>
            <tbody>
                {stetaAr.map((item, key) => <KoloneSteta _id={item._id} desc={item.opisStete} cover={item.stetuPokriva} date={item.datum} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}