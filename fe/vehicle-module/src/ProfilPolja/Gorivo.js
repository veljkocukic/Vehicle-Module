import React, { useContext } from "react"
import { DataContext } from "../Context"
import { EditGorivo } from "./Editi/EditGorivo"



export const Gorivo = ({ gorivoAr }) => {
    let { formatDate, openFuelEdit, setOpenFuelEdit, setId } = useContext(DataContext)



    const KoloneGorivo = (props) => {
        const handleOpen = (_id) => {
            setId(_id)
            setOpenFuelEdit(true)
        }


        return (
            <tr>
                <td>{props.type}</td>
                <td>{formatDate(props.date)}</td>
                <td>{props.km}</td>
                <td>{props.pot}</td>
                <td>{props.cena}</td>
                <td>{props.usluga}</td>
                <td>{props.time}</td>
                <td><button onClick={() => handleOpen(props._id)}>IZMENI</button> <button>OBRIŠI</button></td>
            </tr>)

    }
    return (
        <table className="tg">
            {openFuelEdit && <EditGorivo gorivoAr={gorivoAr} />}
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Potrošnja (l) </th>
                    <th>Cena</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog</th>
                </tr>
            </thead>
            <tbody>
                {gorivoAr.map((item, key) => <KoloneGorivo _id={item._id} type={item.tip} date={item.datum} km={item.kilometraza} pot={item.potrosnja} cena={item.cena} usluga={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )

}