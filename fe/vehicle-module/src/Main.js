import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { DataContext } from "./Context"
import { Spiner } from "./ProfilPolja/Editi/Spiner";
import "../src/style/main.css"
import { EditMain } from "./ProfilPolja/Editi/EditMain";
import { NovoMain } from "./ProfilPolja/Novo/NovoMain";
import slikanedostupna from '../src/images/slikanedostupna.png'
import { useHistory } from "react-router";




export const Main = () => {
    let { formatDate, zaposleniLista, setZaposleniLista, newOn, setNewOn, setId, markaRef, regBrRef, tipKorRef, korVozRef, isticRef, activeFromRef, activeToRef } = useContext(DataContext)
    let [vozila, setVozila] = useState([])
    let zaposleniSelect = useRef(null)
    let [spinerMain, setSpinerMain] = useState(true)
    let history = useHistory()


    useEffect(() => {
        setSpinerMain(true)
        const checkLogin = async () => {
            await axios.post("http://localhost:5000/api/v1/logincheck", { "token": localStorage.getItem("token") }).then(res => {
                if (res.data !== "success") {
                    history.push("/login")
                    return
                }
            })
        }
        const fetchData1 = async () => {
            await axios.get("http://localhost:5000/api/v1/main").then(e => {
                setVozila(e.data)

            })
        }

        const fetchData2 = async () => {
            await axios.get("http://localhost:5000/api/v1/zaposleni").then(e => {
                setZaposleniLista(e.data)
            })
        }
        checkLogin()
        fetchData1()
        fetchData2() 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps




    let [editOn, setEditOn] = useState(false)



    const handleEditOn = (id) => {
        setId(id)
        setEditOn(true)
    }


    const Kolona = (props) => {

        useEffect(() => setSpinerMain(false), [])
        return (
            <div className="single-car-container">

                <img src={props.img.length !== undefined ? props.img : slikanedostupna} className="single-car-container__image" alt="slika auta" />

                <div className="single-car-container__info">

                    <div className="info-top">
                        <h1>{props.name}</h1>
                        <p>{props.reg}</p>
                        <div>
                            <div className="info-bottom">

                                <div className="info-bottom__item">
                                    <h5>Korisnik vozila</h5>
                                    <p>{props.uname}</p>
                                </div>

                                <div className="info-bottom__item">
                                    <h5>Tip korisnika</h5>
                                    <p>{props.utype}</p>
                                </div>

                                <div className="info-bottom__item">
                                    <h5>Isticanje registracije</h5>
                                    <p>{props.expire}</p>
                                </div>

                                <div className="info-bottom__item">
                                    <h5>Vozilo aktivno od</h5>
                                    <p>{formatDate(props.activeFrom)}</p>
                                </div>

                                <div className="info-bottom__item">
                                    <h5>Vozilo aktivno do</h5>
                                    <p>{props.activeTo ? formatDate(props.activeTo) : "/"}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="single-car-container__buttons">
                        <button className="car-button" onClick={() => handleEditOn(props.id)}><i className="fa-solid fa-pen-to-square"></i> IZMENI</button>
                        <Link className="car-link" to={`/profil/${props.id}`}><button className="car-button details"> DETALJI</button></Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="all-cars">
            <div className="page-title">
                <h1>Pregled svih vozila</h1>
                <button className="car-button car-title" onClick={() => setNewOn(true)} >+ NOVO VOZILO</button>
            </div>
            {spinerMain && <Spiner />}
            {editOn && <EditMain setEditOn={setEditOn} vozila={vozila} zaposleniSelect={zaposleniSelect} markaRef={markaRef} regBrRef={regBrRef} isticRef={isticRef} tipKorRef={tipKorRef} activeToRef={activeToRef} activeFromRef={activeFromRef} zaposleniLista={zaposleniLista} korVozRef={korVozRef} />}
            {newOn && <NovoMain zaposleniLista={zaposleniLista} setEditOn={setEditOn} />}
            {vozila.map((item) => <Kolona key={item.id} img={item.slike[0] ? item.slike[0].slika : slikanedostupna} id={item.id} name={item.markaTip} reg={item.regBroj} utype={item.tipKorisnika} uname={item.korisnikVozila} expire={item.isticanje} activeTo={item.activeTo} activeFrom={item.activeFrom} />)}

        </div>
    )
}