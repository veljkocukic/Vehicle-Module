import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditOdrzavanje } from "./Editi/EditOdrzavanje"

export const Odrzavanje = ({ odrzavanjeAr }) => {

    let { openOdrEdit, setOpenOdrEdit, formatDate, setId } = useContext(DataContext)




    const KoloneOdrz = (props) => {


        const handleOpen = (id) => {

            setId(id)
            setOpenOdrEdit(true)

        }

        return (
            <tr>
                <td>{props.type}</td>
                <td>{formatDate(props.date)}</td>
                <td>{props.km}</td>
                <td>{props.part}</td>
                <td>{props.total}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td><button className="btn " onClick={() => handleOpen(props._id)}>IZEMNI</button><button className="btn del">OBRIŠI</button></td>
            </tr>
        )

    }

    return (
        <table className="tg">
            {openOdrEdit && <EditOdrzavanje odrzavanjeAr={odrzavanjeAr} />}
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                </tr>
            </thead>
            <tbody>
                {odrzavanjeAr.map((item, key) => < KoloneOdrz _id={item._id} type={item.tip} date={item.datum} km={item.kilometraza} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}