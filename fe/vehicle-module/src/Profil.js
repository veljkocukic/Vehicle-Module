import React, { useContext, useState, useEffect, useRef } from "react"
import { DataContext } from "./Context"
import axios from "axios"
import "./Profil.css"
import { useParams } from "react-router"
import { Registracija } from "./ProfilPolja/Registacija"
import { Specifikacija } from "./ProfilPolja/Specifikacija"
import { Gorivo } from "./ProfilPolja/Gorivo"
import { Odrzavanje } from "./ProfilPolja/Odrzavanje"
import { Steta } from "./ProfilPolja/Steta"
import { Istorija } from "./ProfilPolja/Istorija"
import { Spiner } from "./ProfilPolja/Editi/Spiner"



export const Profil = () => {

    const [openSec, setOpenSec] = useState("reg")

    const [registracijaAr, setRegistracijaAr] = useState([])
    const [specifikacijaAr, setSpecifikacijaAr] = useState({})
    const [gorivoAr, setGorivoAr] = useState([])
    const [odrzavanjeAr, setOdrzavanjeAr] = useState([])
    const [stetaAr, setStetaAr] = useState([])
    const [istorijaAr, setIstorijaAr] = useState([])
    const [spinerProfile, setSpinerProfile] = useState(true)

    ///Linija ispod treba da se sredi
    let { setNewOn,setRegDo, formatDate, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, setSasija, setMotor, setGodiste, setBoja, setDateKup, setCenaVoz, setDocume, regDo } = useContext(DataContext)



    const [marka, setMarka] = useState()
    let { carId } = useParams()
    useEffect(() => {

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
                setRegDo(regPo[regPo.length - 1].registrovanDo)

                setSasija(res.data.car.specifikacijaPolje.brSasije)
                setMotor(res.data.car.specifikacijaPolje.brMotora)
                setGodiste(res.data.car.specifikacijaPolje.godiste)
                setBoja(res.data.car.specifikacijaPolje.boja)
                setDateKup(res.data.car.specifikacijaPolje.datumKupovine)
                setCenaVoz(res.data.car.specifikacijaPolje.cenaVozila)
                setDocume(res.data.car.specifikacijaPolje.dokumentacija)


            })
        }
        fetchData().then(() => setSpinerProfile(false)).catch(er => {
            console.log(er)
            setSpinerProfile(false)
        })


    }, [])


    let [imagesArray, setImagesArray] = useState(["https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg"])
    let [openImgModal, setOpenImgModal] = useState(false)

    const SveSlike = () => {
        return (
            <div className="slikeModal"><h1 onClick={() => setOpenImgModal(false)}>X</h1>
                <div className="allImgContainer" >
                    {imagesArray.map((item) => <img src={item} alt="slika auta" />)}
                </div>
            </div>
        )
    }


    useEffect(()=>setNewOn(false),[openSec])


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
                return
        }
    }


    return (
        <div className="profilPage">
            {spinerProfile && <Spiner />}
            {openImgModal && <SveSlike />}
            <div className="profilMain">
                <img src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg" alt="slika auta" />
                <div className="profilDetails">
                    <div className="profilInfo">
                        <h3>Informacije o vozilu</h3>
                        <table>
                            <tr className="detailsTr"><td><strong>Marka i tip </strong></td> <td>{marka}</td></tr>
                            <tr className="detailsTr"><td><strong>Registrovan do </strong></td> <td>{formatDate(regDo)}</td></tr>
                            <tr className="detailsTr"><td><strong>Korisnik vozila </strong> </td> <td>{korisnikMn}</td></tr>
                            <tr className="detailsTr"><td><strong>Aktivno od </strong></td> <td>{formatDate(aktivnoOd)}</td></tr>
                            <tr className="detailsTr"><td><strong>Do </strong></td> <td>/</td></tr>

                        </table>
                    </div>
                    <div className="profilImages">
                        <h3>Slike vozila</h3>
                        <div className="photoContainer">
                            {imagesArray.map((item,key) => <img key={key} src={item} alt="slika auta" />)}
                        </div>
                        <p onClick={() => setOpenImgModal(true)}>Pogledaj sve slike</p>
                    </div>
                </div>
            </div>

            <div className="profilTable">

                <ul>
                    <li onClick={() => setOpenSec("reg")}>Registracija</li>
                    <li onClick={() => setOpenSec("spec")} >Specifikacija vozila</li>
                    <li onClick={() => setOpenSec("fuel")}>Gorivo i tekući troškovi</li>
                    <li onClick={() => setOpenSec("odr")}>Održavanje</li>
                    <li onClick={() => setOpenSec("dmg")}>Šteta</li>
                    <li onClick={() => setOpenSec("ist")}>Istorija promena</li>
                </ul>
                {sectionCheck()}


            </div>
        </div>
    )
}