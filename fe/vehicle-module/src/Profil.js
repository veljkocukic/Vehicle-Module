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
    const photoContainer = useRef(null)
    const [registracijaAr, setRegistracijaAr] = useState([])
    const [specifikacijaAr, setSpecifikacijaAr] = useState({})
    const [gorivoAr, setGorivoAr] = useState([])
    const [odrzavanjeAr, setOdrzavanjeAr] = useState([])
    const [stetaAr, setStetaAr] = useState([])
    const [istorijaAr, setIstorijaAr] = useState([])
    const [openSingleImage, setOpenSigleImage] = useState(false)
    const [spinerProfile, setSpinerProfile] = useState(true)
    const [slikaZaModal, setSlikaZaModal] = useState("")
    const [imageLeft, setImageLeft] = useState(0)
    ///Linija ispod treba da se sredi
    let { setAktivnoDo,aktivnoDo,setNewOn, setRegDo, formatDate, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, setSasija, setMotor, setGodiste, setBoja, setDateKup, setCenaVoz, setDocume, regDo } = useContext(DataContext)



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
                setAktivnoDo(res.data.car.activeTo)
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


    let [imagesArray, setImagesArray] = useState(["https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg", "https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg"])

    const handleSlikaOpen = (link) => {
        setSlikaZaModal(link)
        setOpenSigleImage(true)
        console.log(link)
    }


    const JednaSlika = () => {
        return (
            <div className="img-modal">

                <img src={slikaZaModal} />
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
        if ((imageLeft-imageLeft-imageLeft) !== num - 150) {
            setImageLeft(prev => prev - 150)
            console.log("imageLeft: "+imageLeft,"num: "+num)
            console.log(imageLeft-imageLeft-imageLeft , num - 150)
        }
    }

    useEffect(() => setNewOn(false), [openSec])
    useEffect(() => photoContainer.current.style.left = imageLeft + "px", [imageLeft])


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

            <div className="page-title">
                <h1>Profil</h1>
            </div>


            {spinerProfile && <Spiner />}
            {openSingleImage && <JednaSlika />}
            <div className="profilMain">
                <img className="main-pic" src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg" alt="slika auta" />
                <div className="profilDetails">
                    <div className="profilInfo">
                        <h3>Informacije o vozilu</h3>
                        <table>
                            <tr className="detailsTr"><td>Marka i tip </td> <td><strong>{marka}</strong></td></tr>
                            <tr className="detailsTr"><td>Registrovan do </td> <td><strong>{formatDate(regDo)}</strong></td></tr>
                            <tr className="detailsTr"><td>Korisnik vozila  </td> <td><strong>{korisnikMn}</strong></td></tr>
                            <tr className="detailsTr"><td>Aktivno od </td> <td><strong>{formatDate(aktivnoOd)}</strong></td></tr>
                            <tr className="detailsTr"><td>Do </td> <td><strong>{formatDate(aktivnoDo)}</strong></td></tr>

                        </table>
                    </div>
                    <div className="profilImages">
                        <h3>Slike vozila</h3>
                        <i class="fas fa-chevron-left" onClick={handleLeft}></i>
                        <i class="fas fa-chevron-right" onClick={handleRight}></i>
                        <div ref={photoContainer} className="photoContainer">
                            {imagesArray.map((item, key) => <img className="list-img" key={key} onClick={() => handleSlikaOpen(item)} src={item} alt="slika auta" />)}
                        </div>
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