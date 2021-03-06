import React, { useContext,useState,useEffect } from "react"
import { DataContext } from "../Context"
import { EditGorivo } from "./Editi/EditGorivo"
import { useParams } from "react-router"
import { Dialog } from "./Editi/Dialog"
import { NovoGorivo } from "./Novo/NovoGorivo"
import { Paginacija } from "../Paginacija"


export const Gorivo = ({ gorivoAr }) => {
    let { minsToTime, setNewOn, newOn, openDialog, setOpenDialog, formatDate, openFuelEdit, setOpenFuelEdit, setId } = useContext(DataContext)
    let [sliceAr,setSliceAr] = useState(gorivoAr.slice(0,5))
    let { carId } = useParams()

    useEffect(()=>{
        setSliceAr(gorivoAr.slice(0,5))
    },[gorivoAr])



    const KoloneGorivo = (props) => {
        const handleOpen = (kid) => {
            setId(kid)
            setOpenFuelEdit(true)
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
                <td>{props.pot || "/"}</td>
                <td>{props.cena}</td>
                <td>{props.usluga || "/"}</td>
                <td>{minsToTime(props.time) || "/"}</td>
                <td><button className="btn" onClick={() => handleOpen(props._id)}><i className="fas fa-edit"></i> IZMENI</button> <button className="btn del" onClick={() => handleDelete(props._id)}> <i className="far fa-trash-alt"></i> OBRIŠI</button></td>
            </tr>)

    }

    const handleNew = () => {
        setNewOn(true)
    }
    return (
        <div>
            {openFuelEdit && <EditGorivo gorivoAr={gorivoAr} />}
        <table className="tg">
            <thead>
                <tr>
                    <th colSpan="8" >Gorivo i tekući troškovi</th>
                </tr>
                <tr className="head-table">
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Potrošnja (l) </th>
                    <th>Cena</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog</th>
                    <th className="tg-0pky"><button className="editBtn" onClick={handleNew}><i className="fas fa-plus"></i> Novo</button></th>
                </tr>
            </thead>
            <tbody>
                {sliceAr.map((item, key) => <KoloneGorivo _id={item._id} type={item.tip} date={item.datum} km={item.kilometraza} pot={item.potrosnja} cena={item.cena.toLocaleString()} usluga={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
                {newOn && <NovoGorivo />}
                {openDialog && <Dialog par={carId} polje="fuel" />}
                {gorivoAr.length>5 &&  <Paginacija sliceAr={sliceAr} setSliceAr={setSliceAr} arr={gorivoAr}/>}

        </div>
    )

}