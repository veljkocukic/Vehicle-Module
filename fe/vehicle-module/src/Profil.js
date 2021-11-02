import React, { useState } from "react"
import "./Profil.css"








export const Profil = () => {

    const [openRegEdit, setOpenRegEdit] = useState(false)
    const [openSec, setOpenSec] = useState("reg")


    const Registracija = () => {

        const EditRegistracija = () => {
            let [valid,setValid] = useState(true)


            let [dateReg,setDateReg] = useState(0)
            let [docReg,setDocReg] = useState("")
            let [troskovi,setTroskovi] = useState(0)
            let [registrovao,setRegistrovao] = useState("")
            let [timeZaposleni,setTimeZaposleni] = useState(0)
            let [regDo,setRegDo] = useState(0)

            const handleSubmit = () =>{
                let verifyDate = dateReg !==0
                let verifyDoc = docReg.length>2
                let verifyTroskovi = troskovi>2
                let verifyReg = registrovao.length>2
                let verifyTime = timeZaposleni>2
                let verifyDo = regDo!==0

                if(verifyDate&&verifyDoc&&verifyTroskovi&&verifyReg&&verifyTime&&verifyDo){
                    setValid(true)
                    setOpenRegEdit(false)
                    console.log(dateReg,docReg,troskovi,registrovao,timeZaposleni,regDo)
                }else{
                    setValid(false)
                }
            }









            return (<table className="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr><td>Datum registracije </td><td><input type="date" onChange={(e)=>setDateReg(e.target.value)}/></td></tr>
                    <tr><td>Dokumentacija </td><td><input type="text" onChange={(e)=>setDocReg(e.target.value)} /></td></tr>
                    <tr><td>Troškovi registracije </td><td><input type="number" onChange={(e)=>setTroskovi(e.target.value)} /></td></tr>
                    <tr><td>Registrovao zaposleni</td><td><input type="text" onChange={(e)=>setRegistrovao(e.target.value)}/></td></tr>
                    <tr><td>Vreme zaposlenog</td><td><input type="text" onChange={(e)=>setTimeZaposleni(e.target.value)}/></td></tr>
                    <tr><td>Registrovan do</td><td><input type="date" onChange={(e)=>setRegDo(e.target.value)}/></td></tr>
                    <tr><td><button onClick={() => setOpenRegEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                </tbody>
                {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
            </table>)
        }

        let dataReg = [{ date: "25.02.2018.", doc: "Ovlašćenje, APR, Potvrda iz banke", reg: "26542 din.", user: "Nenad Kljajić", time: "3h 45min", expire: "20.11.2020" },
        { date: "22.02.2017", doc: "Ovlašćenje, APR, Potvrda iz banke", reg: "27343 din.", user: "Nenad Kljajić", time: "3h 15min", expire: "20.11.2019" }]


        const Kolone = (props) => {
            return (
                <tr>
                    <td>{props.date}</td>
                    <td>{props.doc}</td>
                    <td>{props.reg}</td>
                    <td>{props.user}</td>
                    <td>{props.time}</td>
                    <td>{props.expire}</td>
                    <td><button onClick={() => setOpenRegEdit(true)}>Izmeni</button><button>Obriši</button></td>
                </tr>
            )
        }

        return (
            <table className="tg">
                {openRegEdit && <EditRegistracija />}
                <thead>
                    <tr>
                        <th>Datum registracije</th>
                        <th>Dokumentacija</th>
                        <th>Troškovi registracije</th>
                        <th>Registrovao zaposleni</th>
                        <th>Vreme zaposlenog</th>
                        <th>Registrovan do</th>
                    </tr>
                </thead>
                <tbody>
                    {dataReg.map((item, key) => <Kolone date={item.date} doc={item.doc} reg={item.reg} user={item.user} time={item.time} expire={item.expire} key={key} />)}
                </tbody>
            </table>
        )
    }

    const Specifikacija = (props) => {

        const [openSpecEdit, setOpenSpecEdit] = useState(false)

        const EditSpecifikacija = () => {
            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Broj šasije </td><td><input type="text" /></td></tr>
                        <tr><td>Broj motora </td><td><input type="text" /></td></tr>
                        <tr><td>Godište </td><td><input type="text" /></td></tr>
                        <tr><td>Boja</td><td><input type="text" /></td></tr>
                        <tr><td>Datum kupovine</td><td><input type="date" /></td></tr>
                        <tr><td>Cena vozila</td><td><input type="text" /></td></tr>
                        <tr><td>Dokumentacija</td><td><textarea></textarea></td></tr>
                        <tr><td><button onClick={() => setOpenSpecEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn">Sačuvaj</button></td></tr>
                    </tbody>
                </table>)
        }


        return (
            <table className="tg">
                {openSpecEdit && <EditSpecifikacija />}
                <tbody>
                    <tr><th>Br. šasija</th><td>WAUZZZ8K9A035589</td><th>Br. motora</th><td>28103373N</td></tr>
                    <tr><th>Godište</th><td>2012</td><th>Boja</th><td>7D SIVA MET.</td></tr>
                    <tr><th>Datum kupovine</th><td>01.02.2017</td><th>Cena vozila</th><td>1.201.544</td></tr>
                    <tr className="docum"><th>Dokumentacija</th><td>- Kupoprodajni ugovor</td></tr>
                    <tr><td><button className="changeSpec" onClick={() => setOpenSpecEdit(true)}>Izmeni</button></td></tr>
                </tbody>
            </table>
        )
    }

    const Gorivo = () => {

        let fuelData = [{ type: "Gorivo", date: "14.08.2020", km: "143.000", pot: "33,13", cena: "142.53", usluga: "/", time: "/" },
        { type: "Tag", date: "30.08.2020", km: "145.443", pot: "/", cena: "2.500,00", usluga: "Nenad Kljajić", time: "60" }]

        let [openFuelEdit, setOpenFuelEdit] = useState(false)


        const EditGorivo = () => {
            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Tip </td><td><input type="text" /></td></tr>
                        <tr><td>Datum </td><td><input type="date" /></td></tr>
                        <tr><td>Kilometraža </td><td><input type="text" /></td></tr>
                        <tr><td>Potrošnja</td><td><input type="text" /></td></tr>
                        <tr><td>Cena</td><td><input type="text" /></td></tr>
                        <tr><td>Usluga zaposlenog</td><td><input type="text" /></td></tr>
                        <tr><td>Vreme zaposlenog</td><td><input type="text" /></td></tr>
                        <tr><td><button onClick={() => setOpenFuelEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn">Sačuvaj</button></td></tr>
                    </tbody>
                </table>)
        }



        const KoloneGorivo = (props) => {


            return (<tr>
                <td>{props.type}</td>
                <td>{props.date}</td>
                <td>{props.km}</td>
                <td>{props.pot}</td>
                <td>{props.cena}</td>
                <td>{props.usluga}</td>
                <td>{props.time}</td>
                <td><button onClick={() => setOpenFuelEdit(true)}>IZMENI</button> <button>OBRIŠI</button></td>
            </tr>)

        }
        return (
            <table className="tg">
                {openFuelEdit && <EditGorivo />}
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
                    {fuelData.map((item, key) => <KoloneGorivo type={item.type} date={item.date} km={item.km} pot={item.pot} cena={item.cena} usluga={item.usluga} time={item.time} key={key} />)}
                </tbody>
            </table>
        )

    }


    const Odrzavanje = () => {
        let dataOdrz = [{ type: "Redovno", date: "14.08.2019", km: "143.000", part: "Ulje, filteri, pločice, akumulator", total: "18.343,00", user: "Nenad Kljajić", time: "160" },
        { type: "Vanredno", date: "16.08.2020", km: "156.343", part: "Zamena klime", total: "56.232,00", user: "Nenad Kljajić", time: "320" }]

        let [openOdrEdit, setOpenOdrEdit] = useState(false)


        const EditOdrzavanje = () => {
            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Tip </td><td><input type="text" /></td></tr>
                        <tr><td>Datum </td><td><input type="date" /></td></tr>
                        <tr><td>Kilometraža </td><td><input type="number" /></td></tr>
                        <tr><td>Delovi/Usluga</td><td><input type="text" /></td></tr>
                        <tr><td>Ukupan trošak</td><td><input type="text" /></td></tr>
                        <tr><td>Usluga zaposlenog</td><td><input type="text" /></td></tr>
                        <tr><td>Vreme zaposlenog</td><td><input type="text" /></td></tr>
                        <tr><td><button onClick={() => setOpenOdrEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn">Sačuvaj</button></td></tr>
                    </tbody>
                </table>)
        }



        const KoloneOdrz = (props) => {

            return (
                <tr>
                    <td>{props.type}</td>
                    <td>{props.date}</td>
                    <td>{props.km}</td>
                    <td>{props.part}</td>
                    <td>{props.total}</td>
                    <td>{props.user}</td>
                    <td>{props.time}</td>
                    <td><button onClick={() => setOpenOdrEdit(true)}>IZEMNI</button><button>OBRIŠI</button></td>
                </tr>
            )

        }

        return (
            <table className="tg">
                {openOdrEdit && <EditOdrzavanje />}
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
                    {dataOdrz.map((item, key) => <KoloneOdrz type={item.type} date={item.type} km={item.km} part={item.part} total={item.total} user={item.user} time={item.time} key={key} />)}
                </tbody>
            </table>
        )
    }

    const Steta = () => {

        let dataSteta = [{ desc: "Oštećeno levo krilo i branik", cover: "Zaposleni", date: "26.09.2020.", part: "Zamena delova i farbanje", total: "72.546,00", user: "Nenad Kljajić", time: "160" }]
        let [openDmgEdit, setOpenDmgEdit] = useState(false)


        const EditSteta = () => {

            let [desc, setDesc] = useState("")
            let [pokriva, setPokriva] = useState("Zaposleni")
            let [date, setDate] = useState(0)
            let [total, setTotal] = useState(0)
            let [usluga, setUsluga] = useState("/")
            let [time, setTime] = useState("/")
            let [parts, setParts] = useState("")
            let [valid, setValid] = useState(true)

            const handleSubmit = () => {
                let verifyDesc = desc.length > 2
                let verifyDate = date !== 0
                let verifyParts = parts.length > 2
                let verifyTotal = total > 1

                if (verifyDesc && verifyDate && verifyParts && verifyTotal) {
                    setValid(true)
                } else {
                    setValid(false)
                }
            }

            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Opis štete </td><td><input type="text" onChange={(e) => setDesc(e.target.value)} /></td></tr>
                        <tr><td>Štetu pokriva </td><td><select onChange={(e) => setPokriva(e.target.value)}><option>Zaposleni</option><option>Firma</option><option>Osiguranje</option><option>Drugo lice</option></select></td></tr>
                        <tr><td>Datum </td><td><input type="date" onChange={(e) => setDate(e.target.value)} /></td></tr>
                        <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e) => setParts(e.target.value)} /></td></tr>
                        <tr><td>Ukupan trošak</td><td><input type="number" onChange={(e) => setTotal(e.target.value)} /></td></tr>
                        <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e) => setUsluga(e.target.value)} /></td></tr>
                        <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e) => setTime(e.target.value)} /></td></tr>
                        <tr><td><button onClick={() => setOpenDmgEdit(false)} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                    </tbody>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                </table>)
        }


        const KoloneSteta = (props) => {
            return (
                <tr>
                    <td>{props.desc}</td>
                    <td>{props.cover}</td>
                    <td>{props.date}</td>
                    <td>{props.part}</td>
                    <td>{props.total}</td>
                    <td>{props.user}</td>
                    <td>{props.time}</td>
                    <td><button onClick={() => setOpenDmgEdit(true)}>IZEMNI</button><button>OBRIŠI</button></td>
                </tr>
            )
        }


        return (
            <table className="tg">
                {openDmgEdit && <EditSteta />}
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
                    {dataSteta.map((item, key) => <KoloneSteta desc={item.desc} cover={item.cover} date={item.date} part={item.part} total={item.total} user={item.user} time={item.time} key={key} />)}
                </tbody>
            </table>
        )
    }

    const Istorija = () => {

        let dataIst = [{ name: "Nenad Kljajić", chan: "Dodata nova registracija", time: "26.09.2020 10:12:33" }, { name: "Nenad Kljajić", chan: "Izmena tekućeg troška gorivo iz 27,650 din. u 28,360 din.", time: "27.09.2020 11:22:33" }]

        const KoloneIst = (props) => {
            return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.time}</td>
                    <td>{props.chan}</td>
                </tr>
            )
        }


        return (
            <table className="tg">
                <thead>
                    <tr>
                        <th>Operater</th>
                        <th>Izmena</th>
                        <th>Promena kreirana</th>
                    </tr>
                </thead>
                <tbody>
                    {dataIst.map((item, key) => <KoloneIst name={item.name} time={item.time} chan={item.chan} key={key} />)}
                </tbody>
            </table>
        )
    }

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

    const sectionCheck = () => {

        switch (openSec) {
            case "reg":
                return <Registracija />
            case "spec":
                return <Specifikacija />
            case "fuel":
                return <Gorivo />
            case "odr":
                return <Odrzavanje />
            case "dmg":
                return <Steta />
            case "ist":
                return <Istorija />
            default:
                return
        }
    }


    return (
        <div className="profilPage">
            {openImgModal && <SveSlike />}
            <div className="profilMain">
                <img src="https://cdn.pixabay.com/photo/2015/09/02/12/25/bmw-918408_960_720.jpg" alt="slika auta" />
                <div className="profilDetails">
                    <div className="profilInfo">
                        <h3>Informacije o vozilu</h3>
                        <table>
                            <tr className="detailsTr"><td>MARKA I TIP</td> <td>Audi A4</td></tr>
                            <tr className="detailsTr"><td>REGISTROVAN DO</td> <td>20.11.2020.</td></tr>
                            <tr className="detailsTr"><td>KORISNIK VOZILA </td> <td>Marko Jovanovic</td></tr>
                            <tr className="detailsTr"><td>AKTIVNO OD</td> <td>15.07.2016</td></tr>
                            <tr className="detailsTr"><td>DO</td> <td>/</td></tr>
                        </table>
                    </div>
                    <div className="profilImages">
                        <h3>Slike vozila</h3>
                        <div className="photoContainer">,
                            {imagesArray.map((item) => <img src={item} alt="slika auta" />)}
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