import React, { useContext, useState,useEffect,useRef } from "react"
import { DataContext } from "./Context"
import axios from "axios"
import "./Profil.css"
import { useParams } from "react-router"



export const Profil = () => {
    
    const [openRegEdit, setOpenRegEdit] = useState(false)
    const [openSec, setOpenSec] = useState("reg")
    
    let formatDate = (dt)=>{ ///////////// Vreme za tabele
        let date =  new Date(dt).toLocaleDateString().replaceAll("/",".")   ///<------------------------------------- Ne prikazuje nas format
        return date+"."
    }
    
    
    
    const [registracijaAr,setRegistracijaAr] = useState([])
    const [specifikacijaAr,setSpecifikacijaAr] = useState({})
    const [gorivoAr,setGorivoAr] = useState([])
    const [odrzavanjeAr,setOdrzavanjeAr] = useState([])
    const [stetaAr,setStetaAr] = useState([])
    

    ///Linija ispod treba da se sredi
    let {id,setId,korisnikMn,setKorisnikMn,aktivnoOd,setAktivnoOd,typeOdr,setTypeOdr,dateOdr,setDateOdr,kmOdr,setKmOdr,partsOdr,setPartsOdr,totalOdr,setTotalOdr,uslugaOdr,setUslugaOdr,timeOdr,setTimeOdr,desc,setDesc,pokriva,setPokriva,date,setDate,total,setTotal,usluga,setUsluga,time,setTime,parts,setParts,type,setType,dateFuel,setDateFuel,kmFuel,setKmFuel,potrosnja,setPotrosnja,priceFuel,setPriceFuel,uslugaFuel,setUslugaFuel,timeFuel,setTimeFuel,sasija,setSasija,motor,setMotor,godiste,setGodiste,boja,setBoja,dateKup,setDateKup,cenaVoz,setCenaVoz,docume,setDocume,valid,setValid,dateReg,setDateReg,docReg,setDocReg,troskovi,setTroskovi,registrovao,setRegistrovao,timeZaposleni,setTimeZaposleni,regDo,setRegDo} = useContext(DataContext)
    let verDate = (dt) =>{
        return ((new Date(dt) > new Date()) && dt!==0)
    }

    function form(e){
        if(e<10){
        let arr=[]
        arr.push(e.toString())
        arr.unshift(0)
        arr=arr.join("")
        return arr} 
        return e
    }

    let formatDateEdit = (dt) =>{ ////////////////////// Vreme za unos
        let t = new Date(dt)
        let month = form(t.getMonth()+1)
        let day = form(t.getDate())
        return `${t.getFullYear()}-${month}-${day}`
    }

    const [marka,setMarka] = useState()
    let {carId} = useParams()
    useEffect(()=>{

        const fetchData = () =>{
            axios.get("http://localhost:5000/api/v1/profil/"+carId).then(res=>{

                setRegistracijaAr(res.data.car.registracijaPolje)
                setSpecifikacijaAr(res.data.car.specifikacijaPolje)
                setGorivoAr(res.data.car.gorivoPolje)
                setOdrzavanjeAr(res.data.car.odrzavanjePolje)
                setStetaAr(res.data.car.stetaPolje)

                setMarka(res.data.car.markaTip)
                setKorisnikMn(res.data.car.korisnikVoz)
                setAktivnoOd(res.data.car.activeFrom)

                setSasija(res.data.car.specifikacijaPolje.brSasija)
                setMotor(res.data.car.specifikacijaPolje.brMotora)
                setGodiste(res.data.car.specifikacijaPolje.godiste)
                setBoja(res.data.car.specifikacijaPolje.setBoja)
                setDateKup(res.data.car.specifikacijaPolje.datumKupovine)
                setCenaVoz(res.data.car.specifikacijaPolje.cenaVozila)
                setDocume(res.data.car.specifikacijaPolje.dokumentacija)  

                
            })
        }

        fetchData()

    },[])


    const Registracija = () => {

        const EditRegistracija = () => {
            let [valid,setValid] = useState(true)

            let regDateRef = useRef(null)
            let regDocRef = useRef(null)
            let regTrosRef = useRef(null)
            let regZapRef = useRef(null)
            let regTimeRef = useRef(null)
            let regRegDoRef = useRef(null)

            useEffect(()=>{
                
                let reg = registracijaAr.find(item=> item._id===id)
                setDateReg(reg.datumRegistracije)
                regDateRef.current.value=formatDateEdit(reg.datumRegistracije)

                setDocReg(reg.dokumentacija)
                regDocRef.current.value=reg.dokumentacija

                setTroskovi(reg.troskoviRegistracije)
                regTrosRef.current.value=reg.troskoviRegistracije

                setRegistrovao(reg.registrovaoZaposleni)
                regZapRef.current.value=reg.registrovaoZaposleni

                setTimeZaposleni(reg.vremeZaposlenog)
                regTimeRef.current.value=reg.vremeZaposlenog

                setRegDo(reg.registrovanDo)
                regRegDoRef.current.value=formatDateEdit(reg.registrovanDo)
                console.log("s")


            })

            const handleSubmit = () =>{
                let verifyDate = !verDate(dateReg)
                let verifyDoc = docReg.length>2
                let verifyTroskovi = troskovi>2
                let verifyReg = registrovao.length>2
                let verifyTime = timeZaposleni>2
                let verifyDo = verDate(regDo)
                if(verifyDate&&verifyDoc&&verifyTroskovi&&verifyReg&&verifyTime&&verifyDo){
                    axios.patch("http://localhost:5000/api/v1/registracija"+carId,{id,dateReg,docReg,troskovi,registrovao,timeZaposleni,regDo}).then(res=>console.log(res))

                    setValid(true)
                    setOpenRegEdit(false)
                }else{
                    setValid(false)
                }
            }

            
            return (< table className="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr><td>Datum registracije </td><td><input ref={regDateRef} type="date" onChange={(e)=>setDateReg(e.target.value)}/></td></tr>
                    <tr><td>Dokumentacija </td><td><input ref={regDocRef} type="text" onChange={(e)=>setDocReg(e.target.value)} /></td></tr>
                    <tr><td>Troškovi registracije </td><td><input ref={regTrosRef} type="number" onChange={(e)=>setTroskovi(e.target.value)} /></td></tr>
                    <tr><td>Registrovao zaposleni</td><td><input ref={regZapRef} type="text" onChange={(e)=>setRegistrovao(e.target.value)}/></td></tr>
                    <tr><td>Vreme zaposlenog</td><td><input ref={regTimeRef} type="text" onChange={(e)=>setTimeZaposleni(e.target.value)}/></td></tr>
                    <tr><td>Registrovan do</td><td><input ref={regRegDoRef} type="date" onChange={(e)=>setRegDo(e.target.value)}/></td></tr>
                    <tr><td><button onClick={() => setOpenRegEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                </tbody>
                {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
            </table>)
        }

        const handleRegEditOpen = (_id) =>{
            setId(_id)
            setOpenRegEdit(true)
        }


        const Kolone = (props) => {
            return (
                <tr>
                    <td>{formatDate(props.date)}</td>
                    <td>{props.doc}</td>
                    <td>{props.reg}</td>
                    <td>{props.user}</td>
                    <td>{props.time}</td>
                    <td>{formatDate(props.expire)}</td>
                    <td><button onClick={() => handleRegEditOpen(props._id)}>Izmeni</button><button>Obriši</button></td>
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
                    {registracijaAr.map((item, key) => <Kolone _id={item._id} date={item.datumRegistracije} doc={item.dokumentacija} reg={item.troskoviRegistracije} user={item.registrovaoZaposleni} time={item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
                </tbody>
            </table>
        )
    }

    const Specifikacija = () => {

        const [openSpecEdit, setOpenSpecEdit] = useState(false)
        const EditSpecifikacija = () => {
            
            let [valid,setValid] = useState(true)
            let sasijaRef = useRef(null)
            let brMotRef = useRef(null)
            let godisteRef = useRef(null)
            let bojaRef = useRef(null)
            let datumRef = useRef(null)
            let cenaRef = useRef(null)
            let documRef = useRef(null)

            let handleSubmit = () =>{
                let verifySasija = sasija.length > 10
                let verifyMotor = motor.length>4
                let verifyGodiste = godiste>1950
                let verifyBoja = boja.length>2
                let verifyDateKup = !verDate(dateKup)
                let verifyCenaVoz = cenaVoz>0
                let verifyDocume = docume.length>5
                if(verifySasija&&verifyMotor&&verifyGodiste&&verifyBoja&&verifyDateKup&&verifyCenaVoz&&verifyDocume){
                    setValid(true)
                    setOpenSpecEdit(false)
                }else{
                    setValid(false)
                }
            }

            let handleCancel = () =>{
                setSasija("")
                setMotor("")
                setGodiste(0)
                setBoja("")
                setDateKup(0)
                setCenaVoz(0)
                setDocume("")
                setOpenSpecEdit(false)
            }
            let [d,s]=useState("")
            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Broj šasije </td><td>< input ref={sasijaRef} type="text" onChange={(e)=>s(e.target.value)}/></td></tr>
                        <tr><td>Broj motora </td><td><input ref={brMotRef} type="text" onChange={(e)=>setMotor(e.target.value)} /></td></tr>
                        <tr><td>Godište </td><td><input ref={godisteRef} type="text" onChange={(e)=>setGodiste(e.target.value)}/></td></tr>
                        <tr><td>Boja</td><td><input ref={bojaRef} type="text" onChange={(e)=>setBoja(e.target.value)}/></td></tr>
                        <tr><td>Datum kupovine</td><td><input ref={datumRef} type="date" onChange={(e)=>setDateKup(e.target.value)}/></td></tr>
                        <tr><td>Cena vozila</td><td><input ref={cenaRef} type="text" onChange={(e)=>setCenaVoz(e.target.value)}/></td></tr>
                        <tr><td>Dokumentacija</td><td><textarea ref={documRef} onChange={(e)=>setDocume(e.target.value)} ></textarea></td></tr>
                        <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn" onClick={handleSubmit} >Sačuvaj</button></td></tr>
                        {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
                    </tbody>
                </table>)
        }


        return (
            <table className="tg">
                {openSpecEdit && <EditSpecifikacija />}
                <tbody>
                    <tr><th>Br. šasija</th><td>{specifikacijaAr.brSasije}</td><th>Br. motora</th><td>{specifikacijaAr.brMotora}</td></tr>
                    <tr><th>Godište</th><td>{specifikacijaAr.godiste}</td><th>Boja</th><td>{specifikacijaAr.boja}</td></tr>
                    <tr><th>Datum kupovine</th><td>{formatDate(specifikacijaAr.datumKupovine)}</td><th>Cena vozila</th><td>{specifikacijaAr.cenaVozila}</td></tr>
                    <tr className="docum"><th>Dokumentacija</th><td>{specifikacijaAr.dokumentacija}</td></tr>
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



            let [valid,setValid] = useState(true)
 

            const handleSubmit = () => {
                let verifyDateFuel = !verDate(dateFuel)
                let verifyKmFuel = kmFuel>0
                let verifyPotrosnja = (type==="Gorivo" && potrosnja>5) || type !== "Gorivo"
                let verifyPriceFuel = priceFuel>100

                if(verifyDateFuel&&verifyKmFuel&&verifyPotrosnja&&verifyPriceFuel){
                    setValid(true)
                    setOpenFuelEdit(false)
                }else{
                    setValid(false)
                }
            }

            const handleCancel = () =>{
                setType("Gorivo")
                setDateFuel(0)
                setKmFuel("")
                setPotrosnja("")
                setPriceFuel("")
                setUslugaFuel("")
                setTimeFuel("")
                setOpenFuelEdit(false)
            }



            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Tip </td><td><select onChange={(e)=>setType(e.target.value)}><option>Gorivo</option><option>Tag</option><option>Pranje</option></select></td></tr>
                        <tr><td>Datum </td><td><input type="date" onChange={(e)=>setDateFuel(e.target.value)} /></td></tr>
                        <tr><td>Kilometraža </td><td><input type="number" onChange={(e)=>setKmFuel(e.target.value)} /></td></tr>
                        <tr><td>Potrošnja</td><td><input type="number" onChange={(e)=>setPotrosnja(e.target.value)}/></td></tr>
                        <tr><td>Cena</td><td><input type="number" onChange={(e)=>setPriceFuel(e.target.value)}/></td></tr>
                        <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e)=>setUslugaFuel(e.target.value)}/></td></tr>
                        <tr><td>Vreme zaposlenog</td><td><input type="number" onChange={(e)=>setTimeFuel(e.target.value)}/></td></tr>
                        <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                    </tbody>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
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
                    {gorivoAr.map((item, key) => <KoloneGorivo type={item.tip} date={item.datum} km={item.kilometraza} pot={item.potrosnja} cena={item.cena} usluga={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
                </tbody>
            </table>
        )

    }


    const Odrzavanje = () => {
        let dataOdrz = [{ type: "Redovno", date: "14.08.2019", km: "143.000", part: "Ulje, filteri, pločice, akumulator", total: "18.343,00", user: "Nenad Kljajić", time: "160" },
        { type: "Vanredno", date: "16.08.2020", km: "156.343", part: "Zamena klime", total: "56.232,00", user: "Nenad Kljajić", time: "320" }]

        let [openOdrEdit, setOpenOdrEdit] = useState(false)


        const EditOdrzavanje = () => {


            let [valid,setValid] = useState(true)


            const handleSubmit = () =>{
                let verifyDateOdr = dateOdr!==0
                let verifyKmOdr = kmOdr>10
                let verifyPartsOdr = partsOdr.length>2
                let verifyTotalOdr = totalOdr>10

                if(verifyDateOdr&&verifyKmOdr&&verifyPartsOdr&&verifyTotalOdr){

                    setValid(true)
                    setOpenOdrEdit(false)
                }else{
                    setValid(false)
                }
            }

            const handleCancel = () =>{
                setTypeOdr("Redovno")
                setDateOdr(0)
                setKmOdr(0)
                setPartsOdr("")
                setTotalOdr(0)
                setUslugaOdr(0)
                setTimeOdr(0)

                setOpenOdrEdit(false)
            }


            return (
                <table className="tg editTable">
                    <thead>
                        <th class="tg-0pky">Naziv polja</th>
                        <th class="tg-0pky">Izmena</th>
                    </thead>
                    <tbody>
                        <tr><td>Tip </td><td><select onChange={(e)=>setTypeOdr(e.target.value)} ><option>Redovno</option><option>Vanredno</option><option>Higijena</option><option>Gume</option></select></td></tr>
                        <tr><td>Datum </td><td><input type="date" onChange={(e)=>setDateOdr(e.target.value)}/></td></tr>
                        <tr><td>Kilometraža </td><td><input type="number" onChange={(e)=>setKmOdr(e.target.value)}/></td></tr>
                        <tr><td>Delovi/Usluga</td><td><input type="text" onChange={(e)=>setPartsOdr(e.target.value)}/></td></tr>
                        <tr><td>Ukupan trošak</td><td><input type="text" onChange={(e)=>setTotalOdr(e.target.value)}/></td></tr>
                        <tr><td>Usluga zaposlenog</td><td><input type="text" onChange={(e)=>setUslugaOdr(e.target.value)}/></td></tr>
                        <tr><td>Vreme zaposlenog</td><td><input type="text" onChange={(e)=>setTimeOdr(e.target.value)}/></td></tr>
                        <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
                    </tbody>
                    {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
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
                    {odrzavanjeAr.map((item, key) => <KoloneOdrz type={item.tip} date={item.datum} km={item.kilometraza} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
                </tbody>
            </table>
        )
    }

    const Steta = () => {

        let dataSteta = [{ desc: "Oštećeno levo krilo i branik", cover: "Zaposleni", date: "26.09.2020.", part: "Zamena delova i farbanje", total: "72.546,00", user: "Nenad Kljajić", time: "160" }]
        let [openDmgEdit, setOpenDmgEdit] = useState(false)


        const EditSteta = () => {
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

            const handleCancel = () =>{
                setDesc("")
                setPokriva("Zaposleni")
                setDate(0)
                setTotal(0)
                setUsluga("/")
                setTime("/")
                setParts("")
                setOpenDmgEdit(false)
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
                        <tr><td><button onClick={handleCancel} className="cancelBtn">Otkaži</button></td><td><button type="submit" className="saveBtn" onClick={handleSubmit}>Sačuvaj</button></td></tr>
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
                    {stetaAr.map((item, key) => <KoloneSteta desc={item.opisStete} cover={item.stetuPokriva} date={item.datum} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
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
                            <tr className="detailsTr"><td>MARKA I TIP</td> <td>{marka}</td></tr>
                            <tr className="detailsTr"><td>REGISTROVAN DO</td> <td>{formatDate(regDo)}</td></tr>
                            <tr className="detailsTr"><td>KORISNIK VOZILA </td> <td>{korisnikMn}</td></tr>
                            <tr className="detailsTr"><td>AKTIVNO OD</td> <td>{formatDate(aktivnoOd)}</td></tr>
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