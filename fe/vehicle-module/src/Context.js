import React, { createContext, useState, useRef } from "react";

export let DataContext = createContext();


export let MainProvider = (props) => {

  const [openRegEdit, setOpenRegEdit] = useState(false)
  const [openSpecEdit, setOpenSpecEdit] = useState(false)
  const [openFuelEdit, setOpenFuelEdit] = useState(false)
  const [openOdrEdit, setOpenOdrEdit] = useState(false)
  const [openDmgEdit, setOpenDmgEdit] = useState(false)


  let [marka, setMarka] = useState("")
  let [regBr, setRegBr] = useState(0)
  let [typeMn, setTypeMn] = useState("Zaposleni")
  let [korisnikMn, setKorisnikMn] = useState("")
  let [isticanje, setIsticanje] = useState(0)
  let [aktivnoOd, setAktivnoOd] = useState(0)

  let [id, setId] = useState("")
  let markaRef = useRef(null)
  let regBrRef = useRef(null)
  let tipKorRef = useRef(null)
  let korVozRef = useRef(null)
  let isticRef = useRef(null)
  let activeRef = useRef(null)



  ///REGISTRACIJA
  let [valid, setValid] = useState(true)
  let [dateReg, setDateReg] = useState(0)
  let [docReg, setDocReg] = useState("")
  let [troskovi, setTroskovi] = useState(0)
  let [registrovao, setRegistrovao] = useState("")
  let [timeZaposleni, setTimeZaposleni] = useState(0)
  let [regDo, setRegDo] = useState(0)

  ///SPECIFIKACIJA
  let [sasija, setSasija] = useState("")
  let [motor, setMotor] = useState("")
  let [godiste, setGodiste] = useState(0)
  let [boja, setBoja] = useState("")
  let [dateKup, setDateKup] = useState(0)
  let [cenaVoz, setCenaVoz] = useState(0)
  let [docume, setDocume] = useState("")

  ///GORIVO
  let [type, setType] = useState("Gorivo")
  let [dateFuel, setDateFuel] = useState(0)
  let [kmFuel, setKmFuel] = useState("")
  let [potrosnja, setPotrosnja] = useState("")
  let [priceFuel, setPriceFuel] = useState("")
  let [uslugaFuel, setUslugaFuel] = useState("")
  let [timeFuel, setTimeFuel] = useState("")

  ///ODRZAVANJE
  let [typeOdr, setTypeOdr] = useState("Redovno")
  let [dateOdr, setDateOdr] = useState(0)
  let [kmOdr, setKmOdr] = useState(0)
  let [partsOdr, setPartsOdr] = useState("")
  let [totalOdr, setTotalOdr] = useState(0)
  let [uslugaOdr, setUslugaOdr] = useState("")
  let [timeOdr, setTimeOdr] = useState(0)

  ///STETA
  let [desc, setDesc] = useState("")
  let [pokriva, setPokriva] = useState("Zaposleni")
  let [date, setDate] = useState(0)
  let [total, setTotal] = useState(0)
  let [usluga, setUsluga] = useState("/")
  let [time, setTime] = useState("/")
  let [parts, setParts] = useState("")


  let [openServEdit, setOpenServEdit] = useState(false)
  let [sifraS, setSifraS] = useState("")
  let [nazivFirme, setNazivFirme] = useState("")
  let [tipUslugeS, setTipUslugeS] = useState("")
  let [kontaktS, setKontaktS] = useState("")
  let [telS, setTelS] = useState("")
  let [emailS, setEmailS] = useState("")
  let [siteS, setSiteS] = useState("")



  let formatDateEdit = (dt) => { ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth() + 1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
  }

  function form(e) {
    if (e < 10) {
      let arr = []
      arr.push(e.toString())
      arr.unshift(0)
      arr = arr.join("")
      return arr
    }
    return e
  }

  let verDate = (dt) => {
    return ((new Date(dt) > new Date()) && dt !== 0) // <-------- NE RADI
  }
  let formatDate = (dt) => { ///////////// Vreme za tabele
    let date = new Date(dt).toLocaleDateString().replaceAll("/", ".")   ///<------------------------------------- Ne prikazuje nas format
    return date + "."
  }

  return (
    <DataContext.Provider
      value={{ kontaktS, setKontaktS, telS, setTelS, emailS, setEmailS, siteS, setSiteS, sifraS, setSifraS, nazivFirme, setNazivFirme, tipUslugeS, setTipUslugeS, openServEdit, setOpenServEdit, openRegEdit, setOpenRegEdit, openDmgEdit, setOpenDmgEdit, openOdrEdit, setOpenOdrEdit, formatDate, verDate, form, formatDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, valid, setValid, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo, id, setId, marka, setMarka, regBr, setRegBr, typeMn, setTypeMn, korisnikMn, setKorisnikMn, isticanje, setIsticanje, aktivnoOd, setAktivnoOd, markaRef, regBrRef, tipKorRef, korVozRef, isticRef, activeRef }}
    >
      {props.children}
    </DataContext.Provider>
  );
};