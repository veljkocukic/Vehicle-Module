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
    const [istorijaAr,setIstorijaAr] = useState([])
    const [doneLoad,setDoneLoad] = useState(false)
    const [imgs,setImgs] = useState([])
    const [uploadDone,setUploadDone] = useState(false)


    let {setZaposleniLista, openSec, setOpenSec, registracijaAr, setRegistracijaAr, specifikacijaAr, setSpecifikacijaAr, gorivoAr, setGorivoAr, odrzavanjeAr, setOdrzavanjeAr, stetaAr, setStetaAr, setAktivnoDo, aktivnoDo, setNewOn, setRegDo, formatDate, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, setSasija, setMotor, setGodiste, setBoja, setDateKup, setCenaVoz, setDocume, regDo } = useContext(DataContext)



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
                setIstorijaAr(res.data.car.istorijaPolje)

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
        fetchData().then(() => {
            setDoneLoad(true)
            setSpinerProfile(false)
        }).catch(er => {
            console.log(er)
            setSpinerProfile(false)
        })
        fetchData2()
        setOpenSec(localStorage.getItem("section"))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



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

    useEffect(() => setNewOn(false), [openSec]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => photoContainer.current.style.left = imageLeft + "px", [imageLeft]) // eslint-disable-line react-hooks/exhaustive-deps

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
                return <Istorija istorijaAr={istorijaAr} />
            default:
                return <Registracija registracijaAr={registracijaAr} carId={carId} />
        }
    }

    const deleteImage = (imgId) =>{
        setSpinerProfile(true)
         axios.post("http://localhost:5000/api/v1/imagedel",{carId,imgId}).then(res=>{
            
            setTimeout(()=>{
                setSpinerProfile(false)
                window.location.reload()
            },1000)
            
        }
        )
    }

    function getBase64(file) {         ///////////PRIVREMENO REŠENJE
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }



    const handleImgs = (img) => {
        for (let a of img) {
            getBase64(a).then(data => {
                setImgs(prev=>[...prev,data])
            })
        }
        setUploadDone(true)
    }

    const submitImages = () =>{
        setSpinerProfile(true)
        axios.post("http://localhost:5000/api/v1/imageadd",{carId,imgs}).then(()=>{
            setTimeout(()=>{
                window.location.reload()
            },1000)
        })
    }

    return (
        <div className="profilPage">

            <div className="page-title">
                <h1>Profil</h1>
            </div>


            {spinerProfile && <Spiner />}
            {openSingleImage && <JednaSlika />}
            <div className="profilMain">
                <img className="main-pic" src={imagesArray.length > 0 ? imagesArray[0].slika : slikanedostupna} alt="slika auta" />
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
                            {imagesArray.map((item, key) => <div style={{position:"relative"}}><img className="list-img" key={key} onClick={() => handleSlikaOpen(item.slika)} id={item._id} src={item.slika} alt="slika auta"/>
                                <div className="delete-pic" onClick={()=>deleteImage(item._id)} >
                                    <i className="fas fa-trash"></i>
                                </div>
                            </div>)}
                        </div>
                        {/* <button className="btn add-imgs" ><i className="fas fa-file-image"></i> Dodaj slike</button> */}
                        <label htmlFor="slike" className="standard--label file-input__label add-imgs btn"></label>
                        <input type="file" className="file-input" id="slike" accept="image/*" multiple onChange={(e) => handleImgs(e.target.files)} />
                        {uploadDone && <div onClick={submitImages}className="send-images"><i className="far fa-check-circle"></i></div>}
                    </div>
                </div>
            </div>

            {doneLoad && <div className="profilTable">

                <ul>
                    <li onClick={() => handleSec("reg")}>Registracija</li>
                    <li onClick={() => handleSec("spec")} >Specifikacija vozila</li>
                    <li onClick={() => handleSec("fuel")}>Gorivo i tekući troškovi</li>
                    <li onClick={() => handleSec("odr")}>Održavanje</li>
                    <li onClick={() => handleSec("dmg")}>Šteta</li>
                    <li onClick={() => handleSec("ist")}>Istorija promena</li>
                </ul>
                {sectionCheck()}
                
            </div>}
        </div>
    )
}