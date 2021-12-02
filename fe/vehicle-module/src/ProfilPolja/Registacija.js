import React, { useState, useContext, useEffect } from "react"
import { EditRegistracija } from "./Editi/EditRegistracija"
import { DataContext } from "../Context"
import { Dialog } from "./Editi/Dialog.js"
import { useParams } from "react-router-dom"
import { NovoRegistracija } from "./Novo/NovoRegistracija"
import { Paginacija } from "../Paginacija"
import { ZaposleniLista } from "./Novo/ZaposleniLista"

export const Registracija = ({ registracijaAr }) => {
    let { verDate, minsToTime, newOn, setNewOn, setId, formatDate, setOpenRegEdit, openRegEdit, openDialog, setOpenDialog } = useContext(DataContext)
    let [sliceAr, setSliceAr] = useState(registracijaAr.slice(0, 5))
    let [regId, setRegId] = useState("")
    let [filterOn, setFilterOn] = useState("")
    let { carId } = useParams()


    useEffect(() => {
        setSliceAr(registracijaAr.slice(0, 5))
        console.log(2)

    }, [registracijaAr])

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
                <td>{!verDate(props.date) ? "/" : formatDate(props.date)}</td>
                <td>{props.doc}</td>
                <td>{props.reg}</td>
                <td>{props.user}</td>
                <td>{props.time === "/" ? "/" : minsToTime(props.time)}</td>
                <td>{!verDate(props.expire) ? "/" : formatDate(props.expire)}</td>
                <td><button className="btn" onClick={() => handleRegEditOpen(props.kid)}><i className="fas fa-edit"></i> IZMENI</button><button className="btn del" onClick={() => handleDelete(props.kid)}> <i className="far fa-trash-alt"></i> OBRIŠI</button></td>
            </tr>
        )
    }
    let cond = registracijaAr.length === 1

    return (
        <div>
            {openRegEdit && <EditRegistracija registracijaAr={registracijaAr} regId={regId} carId={carId} />}
            <table className="tg">

                <thead>
                    <tr>
                        <div className="filter-toggle" onClick={() => setFilterOn(prev => !prev)}><i class="fas fa-filter"></i> Filter
                        </div>
                        <th colSpan="7" >Registracija</th>
                    </tr>
                    <th> {filterOn && <Filter />}</th>
                    <tr className="head-table" >
                        <th>Datum registracije</th>
                        <th>Dokumentacija</th>
                        <th>Troškovi registracije</th>
                        <th>Registrovao zaposleni</th>
                        <th>Vreme zaposlenog</th>
                        <th>Registrovan do</th>
                        <th className="tg-0pky"><button className="editBtn" onClick={() => setNewOn(true)}><i className="fas fa-plus"></i>Novo</button></th>
                    </tr>
                </thead>
                <tbody>
                    {sliceAr.map((item, key) => <Kolone kid={cond ? "/" : item._id} date={cond ? "/" : item.datum} doc={cond ? "/" : item.dokumentacija} reg={cond ? "/" : item.cena.toLocaleString()} user={cond ? "/" : item.registrovaoZaposleni} time={cond ? "/" : item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
                </tbody>
            </table>
            {newOn && <NovoRegistracija />}
            {openDialog && <Dialog par={carId} polje="reg" />}
            <Paginacija sliceAr={sliceAr} setSliceAr={setSliceAr} arr={registracijaAr} />
        </div>
    )
}

const Filter = () => {
    return (
        <div className="input--container filter-container" >
            <h3 className="input--container__title">Filter</h3>
            <div className="form" >


                <div className="single-input-container">
                    <label htmlFor="datum-registracije-od-fil" className="standard--label">Datum registracije od<span>*</span></label>
                    <input type="date" className="standard--input" id="datum-registracije-oo-fil" name="datum-registracije-od-fil" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-registracije-do-fil" className="standard--label">Datum registracije do<span>*</span></label>
                    <input type="date" className="standard--input" id="datum-registracije-do-fil" name="datum-registracije-do-fil" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-registracije-do-fil" className="standard--label">Dokumentacija<span>*</span></label>
                    <input type="text" className="standard--input" id="dokum-fil" name="dokum-fil" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="tros-fill-od" className="standard--label">Troškovi od<span>*</span></label>
                    <input type="number" className="standard--input" id="tros-fill-od" name="tros-fill-od" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="tros-fill-do" className="standard--label">Troškovi do<span>*</span></label>
                    <input type="number" className="standard--input" id="tros-fill-do" name="tros-fill-do" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="reg-fill" className="standard--label">Registrovao zaposleni<span>*</span></label>
                    <ZaposleniLista />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-fill-od" className="standard--label">Vreme zaposlenog od<span>*</span></label>
                    <input type="number" className="standard--input" id="vreme-fill-od" name="vreme-fill-od" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-fill-do" className="standard--label">Vreme zaposlenog do<span>*</span></label>
                    <input type="number" className="standard--input" id="vreme-fill-do" name="vreme-fill-do" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="exp-fill" className="standard--label">Registrovan do<span>*</span></label>
                    <input type="date" className="standard--input" id="exp-fill" name="exp-fill" />
                </div>

                <button className="btn yes" ><i className="far fa-save"></i> PRIMENI</button>







            </div>

        </div>

    )
}