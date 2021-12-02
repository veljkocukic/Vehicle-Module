import React, { useContext, useState, useEffect, useRef } from "react"
import { DataContext } from "./Context"
import axios from "axios"
import "./style/Profil.css"
import { useParams } from "react-router"
import { Registracija } from "./ProfilPolja/Registacija"
import { Specifikacija } from "./ProfilPolja/Specifikacija"
import { Gorivo } from "./ProfilPolja/Gorivo"
import { Odrzavanje } from "./ProfilPolja/Odrzavanje"
import { Steta } from "./ProfilPolja/Steta"
import { Istorija } from "./ProfilPolja/Istorija"
import { Spiner } from "./ProfilPolja/Editi/Spiner"
import slikanedostupna from '../src/images/slikanedostupna.png'
import { useHistory } from "react-router"



export const Profil = () => {


    const photoContainer = useRef(null)
    const history = useHistory()
    const [openSingleImage, setOpenSigleImage] = useState(false)
    const [spinerProfile, setSpinerProfile] = useState(true)
    const [slikaZaModal, setSlikaZaModal] = useState("")
    const [imageLeft, setImageLeft] = useState(0)
    const [imagesArray, setImagesArray] = useState([])



    let { setZaposleniLista, openSec, setOpenSec, registracijaAr, setRegistracijaAr, specifikacijaAr, setSpecifikacijaAr, gorivoAr, setGorivoAr, odrzavanjeAr, setOdrzavanjeAr, stetaAr, setStetaAr, setAktivnoDo, aktivnoDo, setNewOn, setRegDo, formatDate, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, setSasija, setMotor, setGodiste, setBoja, setDateKup, setCenaVoz, setDocume, regDo } = useContext(DataContext)



    const [marka, setMarka] = useState()
    let { carId } = useParams()
    useEffect(() => {
        const checkLogin = async () => {
            await axios.post("http://localhost:5000/api/v1/logincheck", { "token": localStorage.getItem("token") }).then(res => {
                if (res.data !== "success") {
                    history.push("/login")
                    return
                }
            })
        }

        const fetchData = async () => {
            await axios.get("http://localhost:5000/api/v1/profil/" + carId).then(res => {

                let regPo = res.data.car.registracijaPolje
                setRegistracijaAr(regPo)
                setSpecifikacijaAr(res.data.car.specifikacijaPolje)
                setGorivoAr(res.data.car.gorivoPolje)
                setOdrzavanjeAr(res.data.car.odrzavanjePolje)
                setStetaAr(res.data.car.stetaPolje)

                setMarka(res.data.car.markaTip)
                setKorisnikMn(res.data.car.korisnikVoz)
                setAktivnoOd(res.data.car.activeFrom)
                setAktivnoDo(res.data.car.activeTo)
                setRegDo(regPo[regPo.length - 1].registrovanDo)

                setSasija(res.data.car.specifikacijaPolje.brSasije)
                setMotor(res.data.car.specifikacijaPolje.brMotora)
                setGodiste(res.data.car.specifikacijaPolje.godiste)
                setBoja(res.data.car.specifikacijaPolje.boja)
                setDateKup(res.data.car.specifikacijaPolje.datumKupovine)
                setCenaVoz(res.data.car.specifikacijaPolje.cenaVozila)
                setDocume(res.data.car.specifikacijaPolje.dokumentacija)
                setImagesArray(res.data.car.slike)


            })
        }
        const fetchData2 = async () => {
            await axios.get("http://localhost:5000/api/v1/zaposleni").then(e => {
                setZaposleniLista(e.data)
            })
        }
        checkLogin()
        fetchData().then(() => setSpinerProfile(false)).catch(er => {
            console.log(er)
            setSpinerProfile(false)
        })
        fetchData2()
        setOpenSec(localStorage.getItem("section"))
    }, [])



    const handleSlikaOpen = (link) => {
        setSlikaZaModal(link)
        setOpenSigleImage(true)
    }


    const JednaSlika = () => {
        return (
            <div className="img-modal">

                <img src={slikaZaModal} alt="Slika automobila" />
                <div className="close-img" onClick={() => setOpenSigleImage(false)}><h1>X</h1></div>

            </div>
        )
    }

    let num = 150 * imagesArray.length

    const handleLeft = () => {
        if (imageLeft !== 0)
            setImageLeft(prev => prev + 150)


    }

    const handleRight = () => {
        if ((imageLeft - imageLeft - imageLeft) !== num - 150) {
            setImageLeft(prev => prev - 150)
        }
    }

    useEffect(() => setNewOn(false), [openSec])
    useEffect(() => photoContainer.current.style.left = imageLeft + "px", [imageLeft])

    const handleSec = (sec) => {

        setOpenSec(sec)
        localStorage.setItem("section", sec)

    }



    const sectionCheck = () => {

        switch (openSec) {
            case "reg":
                return <Registracija registracijaAr={registracijaAr} carId={carId} />
            case "spec":
                return <Specifikacija specifikacijaAr={specifikacijaAr} />
            case "fuel":
                return <Gorivo gorivoAr={gorivoAr} />
            case "odr":
                return <Odrzavanje odrzavanjeAr={odrzavanjeAr} />
            case "dmg":
                return <Steta stetaAr={stetaAr} />
            case "ist":
                return <Istorija />
            default:
                return <Registracija registracijaAr={registracijaAr} carId={carId} />
        }
    }


    return (
        <div className="profilPage">

            <div className="page-title">
                <h1>Profil</h1>
            </div>


            {spinerProfile && <Spiner />}
            {openSingleImage && <JednaSlika />}
            <div className="profilMain">
                <img className="main-pic" src={imagesArray.length > 0 ? imagesArray[0] : slikanedostupna} alt="slika auta" />
                <div className="profilDetails">
                    <div className="profilInfo">
                        <h3>Informacije o vozilu</h3>
                        <table>
                            <tbody>
                                <tr className="detailsTr"><td>Marka i tip</td><td><strong>{marka}</strong></td></tr>
                                <tr className="detailsTr"><td>Registrovan do</td><td><strong>{formatDate(regDo)}</strong></td></tr>
                                <tr className="detailsTr"><td>Korisnik vozila</td><td><strong>{korisnikMn}</strong></td></tr>
                                <tr className="detailsTr"><td>Aktivno od</td><td><strong>{formatDate(aktivnoOd)}</strong></td></tr>
                                <tr className="detailsTr"><td>Do</td><td><strong>{formatDate(aktivnoDo)}</strong></td></tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="profilImages">
                        <h3>Slike vozila</h3>
                        <i className="fas fa-chevron-left" onClick={handleLeft}></i>
                        <i className="fas fa-chevron-right" onClick={handleRight}></i>
                        <div ref={photoContainer} className="photoContainer">
                            {imagesArray.map((item, key) => <img className="list-img" key={key} onClick={() => handleSlikaOpen(item)} src={item} alt="slika auta" />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="profilTable">

                <ul>
                    <li onClick={() => handleSec("reg")}>Registracija</li>
                    <li onClick={() => handleSec("spec")} >Specifikacija vozila</li>
                    <li onClick={() => handleSec("fuel")}>Gorivo i tekući troškovi</li>
                    <li onClick={() => handleSec("odr")}>Održavanje</li>
                    <li onClick={() => handleSec("dmg")}>Šteta</li>
                    <li onClick={() => handleSec("ist")}>Istorija promena</li>
                </ul>
                {sectionCheck()}


            </div>
        </div>
    )
}