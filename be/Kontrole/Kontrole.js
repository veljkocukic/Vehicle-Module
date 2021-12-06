let { CarsModel, ServiseriModel, ZaposleniModel,KorisniciModel,IstorijaModel } = require("../Modeli/Podaci")
let mongoose = require("mongoose")
let jwt = require("jsonwebtoken")
require("dotenv").config()



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


let formatDate = (dt) => { ///////////// Vreme za tabele
    let date = new Date(dt)
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "."
}

let formatDateEdit = (dt) => { ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth() + 1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
}

const Login = async (req, res) => {
    try {
        const user = await KorisniciModel.findOne({ username: req.body.name })
        if (!user) {
            return res.json({ "error": "user" })
        } else if (user && user.password === req.body.pass) {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.json({ "login": "yes", token })
        } else {
            return res.json({ "error": "pass" })
        }
    } catch (error) {
        res.json({catch:error})
        console.log(error)
    }
}

const CheckLogin = async(req,res) =>{
    try {
            if(!req.body.token){ 
                return res.json({"access":"denied"})
            }
            const verified = jwt.verify(req.body.token,process.env.SECRET)
            res.send("success")

    }catch (error) {
        res.send("error")
    }
}

const Main = async (req, res) => { ////Podaci za listu automobila na glavnoj strani
    try {
        const vozila = await CarsModel.find({})
        let arr = []
        for (let a of vozila) {
            let isticanje
            let isticanjeEdit
            try {
                isticanje = formatDate(a.registracijaPolje[a.registracijaPolje.length - 1].registrovanDo)
                isticanjeEdit = formatDateEdit(a.registracijaPolje[a.registracijaPolje.length - 1].registrovanDo)
            } catch (error) {
                isticanje = ""
                isticanjeEdit = ""
            }


            arr.push({
                id: a._id,
                markaTip: a.markaTip,
                regBroj: a.registracioniBroj,
                korisnikVozila: a.korisnikVoz,
                activeFrom: (a.activeFrom),
                activeFromEdit: formatDateEdit(a.activeFrom),
                tipKorisnika: a.tipKorisnika,
                activeTo: new Date(a.activeTo).getFullYear() !== 1970 ? (a.activeTo) : "",
                activeToEdit: new Date(a.activeTo).getFullYear() !== 1970 ? formatDateEdit(a.activeTo) : "",
                isticanje,
                isticanjeEdit,
                slike: a.slike,
            })
        }
        res.json(arr)

    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const Zaposleni = async (req, res) => { //////////////////Lista svih zaposlenih i podaci o njima
    try {
        const zaposleni = await ZaposleniModel.find({})
        res.send(zaposleni)
    } catch (error) {
        console.log(error)
        res.send(error)

    }
}



const EditCars = async (req, res) => {
    try {
        const car = await CarsModel.findById(req.body.id)
        let changeMarka = req.body.marka && car.markaTip !== req.body.marka ? {operater:req.body.username,izmena:"Promena marke iz "+car.markaTip+" u "+req.body.marka,promenaKreirana:new Date()} : false
        let changeRegBr = req.body.regBr && req.body.regBr !== car.registracioniBroj ? {operater:req.body.username,izmena:"Promena registracionog broja iz "+car.registracioniBroj+" u "+req.body.regBr,promenaKreirana:new Date()} : false
        let changeTipKor = req.body.typeMn && req.body.typeMn !== car.tipKorisnika ? {operater:req.body.username,izmena:"Promena tipa korisnika iz "+car.tipKorisnika+" u "+req.body.typeMn,promenaKreirana:new Date()} : false
        let changeKoris = req.body.korisnikMn && req.body.korisnikMn !== car.korisnikVoz ? {operater:req.body.username,izmena:"Promena korisnika vozika iz "+car.korisnikVoz+" u "+req.body.korisnikMn,promenaKreirana:new Date()} : false
        let changeActiveF = req.body.aktivnoOd && new Date(req.body.aktivnoOd).getTime() !== new Date(car.activeFrom).getTime() ? {operater:req.body.username,izmena:"Promena polja \"aktivno od\" iz "+formatDate(car.activeFrom)+" u "+formatDate(req.body.aktivnoOd),promenaKreirana:new Date()} : false
        let changeActiveT = req.body.aktivnoDo && new Date(req.body.aktivnoDo).getTime() !== new Date(car.activeTo).getTime() ? {operater:req.body.username,izmena:"Promena polja \"aktivno od\" iz "+formatDate(car.activeTo)+" u "+formatDate(req.body.aktivnoDo),promenaKreirana:new Date()} : false

        car.markaTip = req.body.marka
        car.registracioniBroj = req.body.regBr
        car.tipKorisnika = req.body.typeMn
        car.korisnikVoz = req.body.korisnikMn
        car.activeFrom = req.body.aktivnoOd
        car.activeTo = req.body.aktivnoDo
        changeMarka && car.istorijaPolje.push(changeMarka)
        changeRegBr && car.istorijaPolje.push(changeRegBr)
        changeTipKor && car.istorijaPolje.push(changeTipKor)
        changeKoris && car.istorijaPolje.push(changeKoris)
        changeActiveT && car.istorijaPolje.push(changeActiveT)
        changeActiveF && car.istorijaPolje.push(changeActiveF)




        car.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)

    }
}

const SingleCar = async (req, res) => {


    try {
        const car = await CarsModel.findById(req.params.carId)
        res.json({
            car
        })
    } catch (error) {
        console.log(error)
        res.send(error)

    }

}


const RegistracijaEdit = async (req, res) => {
    const registracija = await CarsModel.findById(req.params.carId)
    let reg = registracija.registracijaPolje[0]._id
    try {
        const registracija = await CarsModel.findById(req.params.carId)
        let reg = registracija.registracijaPolje.find(item => item._id.toString() === req.body.id)

        let datumChange = req.body.dateReg && new Date(reg.datum).getTime() !== new Date(req.body.dateReg).getTime() ? {operater:req.body.username,izmena:"Promena datuma registracije iz "+formatDate(reg.datum)+" u "+formatDate(req.body.dateReg),promenaKreirana:new Date()} : false
        let dokumentacijaChange = req.body.docReg && req.body.docReg !== reg.dokumentacija ? {operater:req.body.username,izmena:"Promena dokumentacije registracije iz "+reg.dokumentacija+" u "+req.body.docReg,promenaKreirana:new Date()} : false
        let cenaChange = req.body.troskovi && req.body.troskovi !== reg.cena ? {operater:req.body.username,izmena:"Promena cene registracije iz "+reg.cena+" u "+req.body.troskovi,promenaKreirana:new Date()} : false
        let regZapChange = req.body.registrovao && req.body.registrovao !== reg.registrovaoZaposleni ?  {operater:req.body.username,izmena:"Promena u polju \"Registrovao zaposleni\" iz "+reg.registrovaoZaposleni+" u "+req.body.registrovao,promenaKreirana:new Date()} : false
        let timeChange = req.body.timeZaposleni && req.body.timeZaposleni !== reg.vremeZaposlenog ? {operater:req.body.username,izmena:"Promena vremena zaposlenog pri registraciji iz "+reg.vremeZaposlenog+" u "+req.body.timeZaposleni,promenaKreirana:new Date()} : false
        let doChange = req.body.regDo && req.body.regDo !== reg.registrovanDo ? {operater:req.body.username,izmena:"Promena datuma isticanja registracije iz "+formatDate(reg.registrovanDo)+" u "+formatDate(req.body.regDo),promenaKreirana:new Date()} : false
        
        reg.datum = req.body.dateReg
        reg.dokumentacija = req.body.docReg
        reg.cena = req.body.troskovi
        reg.registrovaoZaposleni = req.body.registrovao
        reg.vremeZaposlenog = req.body.timeZaposleni
        reg.registrovanDo = req.body.regDo

        datumChange && registracija.istorijaPolje.push(datumChange)
        dokumentacijaChange && registracija.istorijaPolje.push(dokumentacijaChange)
        cenaChange && registracija.istorijaPolje.push(cenaChange)
        regZapChange && registracija.istorijaPolje.push(regZapChange)
        timeChange && registracija.istorijaPolje.push(timeChange)
        doChange && registracija.istorijaPolje.push(doChange)

        registracija.save()
        res.send("success")

    } catch (error) {
        console.log(error)
        console.log(req.body)

        console.log(reg)
        res.send(error)
    }
}

const SpecifikacijaEdit = async (req, res) => {
    try {
        const specifikacija = await CarsModel.findById(req.params.carId)
        let sasijaChange = req.body.sasija && req.body.sasija !== specifikacija.specifikacijaPolje.brSasije ? {operater:req.body.username,izmena:"Promena broja šasije iz "+specifikacija.specifikacijaPolje.brSasije+" u "+req.body.sasija,promenaKreirana:new Date()} : false
        let brMotChange = req.body.motor && req.body.motor !== specifikacija.specifikacijaPolje.brMotora ? {operater:req.body.username,izmena:"Promena broja motora iz "+specifikacija.specifikacijaPolje.brMotora+" u "+req.body.motor,promenaKreirana:new Date()} : false
        let godisteChange = req.body.godiste && req.body.godiste !== specifikacija.specifikacijaPolje.godiste ? {operater:req.body.username,izmena:"Promena godišta iz "+specifikacija.specifikacijaPolje.godiste+" u "+req.body.godiste,promenaKreirana:new Date()} : false
        let bojaChange = req.body.boja && req.body.bojaChange !== specifikacija.specifikacijaPolje.boja ? {operater:req.body.username,izmena:"Promena boje iz "+specifikacija.specifikacijaPolje.boja+" u "+req.body.boja,promenaKreirana:new Date()} : false
        let datumKupChange = req.body.dateKup && new Date(req.body.dateKup).getTime() !== new Date(specifikacija.specifikacijaPolje.datumKupovine).getTime() ? {operater:req.body.username,izmena:"Promena datuma kupovine iz "+formatDate(specifikacija.specifikacijaPolje.datumKupovine)+" u "+formatDate(req.body.dateKup),promenaKreirana:new Date()} : false
        let cenaChange = req.body.cenaVoz && req.body.cenaVoz !== specifikacija.specifikacijaPolje.cenaVozila ? {operater:req.body.username,izmena:"Promena cene vozila iz "+specifikacija.specifikacijaPolje.cenaVozila+" u "+req.body.cenaVoz,promenaKreirana:new Date()} : false
        let docChange = req.body.docume && req.body.docume !== specifikacija.specifikacijaPolje.dokumentacija ? {operater:req.body.username,izmena:"Promena dokumentacija vozila iz "+specifikacija.specifikacijaPolje.dokumentacija+" u "+req.body.docume,promenaKreirana:new Date()} : false

        specifikacija.specifikacijaPolje.brSasije = req.body.sasija
        specifikacija.specifikacijaPolje.brMotora = req.body.motor
        specifikacija.specifikacijaPolje.godiste = req.body.godiste
        specifikacija.specifikacijaPolje.boja = req.body.boja
        specifikacija.specifikacijaPolje.datumKupovine = req.body.dateKup
        specifikacija.specifikacijaPolje.cenaVozila = req.body.cenaVoz
        specifikacija.specifikacijaPolje.dokumentacija = req.body.docume

        sasijaChange && specifikacija.istorijaAr.push(sasijaChange)
        brMotChange && specifikacija.istorijaAr.push(brMotChange)
        godisteChange && specifikacija.istorijaAr.push(godisteChange)
        bojaChange && specifikacija.istorijaAr.push(bojaChange)
        datumKupChange && specifikacija.istorijaAr.push(datumKupChange)
        cenaChange && specifikacija.istorijaAr.push(cenaChange)
        docChange && specifikacija.istorijaAr.push(docChange)


        specifikacija.save()
        res.send("success")

    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const GorivoEdit = async (req, res) => {

    try {
        const gorivo = await CarsModel.findById(req.params.carId)
        let gor = gorivo.gorivoPolje.find(item => item._id.toString() === req.body.id)

        let tipChange = req.body.type && req.body.type !== gor.tip ? {operater:req.body.username,izmena:"Promena tipa tekućeg troška iz "+gor.tip+" u "+req.body.type,promenaKreirana:new Date()} : false
        let datumChange = req.body.dateFuel && new Date(req.body.dateFuel).getTime() !== new Date(gor.datum).getTime() ? {operater:req.body.username,izmena:"Promena datuma (Gorivo i t.t.) iz "+formatDate(gor.datum)+" u "+formatDate(req.body.dateFule),promenaKreirana:new Date()} : false
        let kmChange = req.body.kmFuel && req.body.kmFuel !== gor.kilometraza ? {operater:req.body.username,izmena:"Promena kilometraže (Gorivo i t.t.) iz "+gor.kilometraza+" u "+req.body.kmFuel,promenaKreirana:new Date()} : false
        let potChange = req.body.potrosnja && req.body.potrosnja !== gor.potrosnja ? {operater:req.body.username,izmena:"Promena potrošnje (Gorivo i t.t.) iz "+gor.potrošnja+" u "+req.body.potrošnja,promenaKreirana:new Date()} : false
        let cenaChange = req.body.priceFuel && req.body.priceFuel !== gor.cena ? {operater:req.body.username,izmena:"Promena cene (Gorivo i t.t.) iz "+gor.potrošnja+" u "+req.body.potrošnja,promenaKreirana:new Date()} : false
        let uslugaChange = req.body.uslugaFuel && req.body.uslugaFuel !== gor.uslugaZaposlenog ? {operater:req.body.username,izmena:"Promena usluge zaposlenog (Gorivo i t.t.) iz "+gor.uslugaZaposlenog+" u "+req.body.uslugaFuel,promenaKreirana:new Date()} : false
        let vremeChange  = req.body.timeFuel && req.body.timeFuel !== gor.vremeZaposlenog ? {operater:req.body.username,izmena:"Promena vremena zaposlenog (Gorivo i t.t.) iz "+gor.uslugaZaposlenog+" u "+req.body.uslugaFuel,promenaKreirana:new Date()} : false

        gor.tip = req.body.type
        gor.datum = req.body.dateFuel
        gor.kilometraza = req.body.kmFuel
        gor.potrosnja = req.body.potrosnja
        gor.cena = req.body.priceFuel
        gor.uslugaZaposlenog = req.body.uslugaFuel
        gor.vremeZaposlenog = req.body.timeFuel

        tipChange && gorivo.istorijaPolje.push(tipChange)
        datumChange && gorivo.istorijaPolje.push(datumChange)
        kmChange && gorivo.istorijaPolje.push(kmChange)
        potChange && gorivo.istorijaPolje.push(potChange)
        cenaChange && gorivo.istorijaPolje.push(cenaChange)
        uslugaChange && gorivo.istorijaPolje.push(uslugaChange)
        vremeChange && gorivo.istorijaPolje.push(vremeChange)


        gorivo.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const OdrzavanjeEdit = async (req, res) => {

    try {
        let odrzavanje = await CarsModel.findById(req.params.carId)
        let odr = odrzavanje.odrzavanjePolje.find(item => item._id.toString() === req.body.id)


        let tipChange = req.body.typeOdr && req.body.typeOdr !== odr.tip ? {operater:req.body.username,izmena:"Promena tipa održavanja iz "+odr.tip+" u "+req.body.typeOdr,promenaKreirana:new Date()} : false
        let datumChange = req.body.dateOdr && new Date(req.body.dateOdr).getTime() !== new date(odr.datum).getTime() ? {operater:req.body.username,izmena:"Promena datuma održavanja iz "+formatDate(odr.datum)+" u "+formatDate(req.body.dateOdr),promenaKreirana:new Date()} : false
        let kmChange = req.body.kmOdr && req.body.kmOdr !== odr.kilometraza ? {operater:req.body.username,izmena:"Promena kilometraže u polju održavanja iz "+odr.kilometraza+" u "+req.body.kmOdr,promenaKreirana:new Date()} : false
        let deloviChange = req.body.partsOdr && req.body.partsOdr !== odr.deloviUsluga ? {operater:req.body.username,izmena:"Promena delova/usluge u polju održavanja iz "+odr.deloviUsluga+" u "+req.body.partsOdr,promenaKreirana:new Date()} : false
        let cenaChange = req.body.totalOdr && req.body.totalOdr !== odr.cena ? {operater:req.body.username,izmena:"Promena cene u polju održavanja iz "+odr.cena+" u "+req.body.totalOdr,promenaKreirana:new Date()} : false
        let uslugChange = req.body.uslugaOdr && req.body.uslugaOdr !== odr.uslugaZaposlenog ? {operater:req.body.username,izmena:"Promena usluge zaposlenog u polju održavanja iz "+odr.uslugaZaposlenog+" u "+req.body.uslugaOdr,promenaKreirana:new Date()} : false
        let vremeChange = req.body.timeODr && req.body.timeOdr !== odr.vremeZaposlenog ? {operater:req.body.username,izmena:"Promena vremena zaposlenog u polju održavanja iz "+odr.vremeZaposlenog+" u "+req.body.timeOdr,promenaKreirana:new Date()} : false

        odr.tip = req.body.typeOdr
        odr.datum = req.body.dateOdr
        odr.kilometraza = req.body.kmOdr
        odr.deloviUsluga = req.body.partsOdr
        odr.cena = req.body.totalOdr
        odr.uslugaZaposlenog = req.body.uslugaOdr
        odr.vremeZaposlenog = req.body.timeOdr

        tipChange && odrzavanje.istorijaPolje.push(tipChange)
        datumChange && odrzavanje.istorijaPolje.push(datumChange)
        kmChange && odrzavanje.istorijaPolje.push(kmChange)
        deloviChange && odrzavanje.istorijaPolje.push(deloviChange)
        cenaChange && odrzavanje.istorijaPolje.push(cenaChange)
        uslugChange && odrzavanje.istorijaPolje.push(uslugChange)
        vremeChange && odrzavanje.istorijaPolje.push(vremeChange)

        odrzavanje.save()
        res.send("success")


    } catch (error) {
        console.log(error)
        res.send(error)

    }

}


const StetaEdit = async (req, res) => {

    try {

        let steta = await CarsModel.findById(req.params.carId)
        let ste = steta.stetaPolje.find(item => item._id.toString() === req.body.id)
        
        let opisChange = req.body.desc && req.body.desc !==ste.opisStete ? {operater:req.body.username,izmena:"Promena opisa štete iz  "+ste.opisStete+" u "+req.body.desc,promenaKreirana:new Date()} : false
        let pokrivaChange = req.body.pokriva && req.body.pokriva !==ste.stetuPokriva ? {operater:req.body.username,izmena:"Promena u polju \"Štetu pokriva\" iz  "+ste.stetuPokriva+" u "+req.body.pokriva,promenaKreirana:new Date()} : false 
        let dateChange = req.body.date && new Date(req.body.date).getTime() !== new Date(ste.datum).getTime() ? {operater:req.body.username,izmena:"Promena datuma štete iz  "+formatDate(ste.datum)+" u "+formatDate(req.body.date),promenaKreirana:new Date()} : false
        let deloviChange = req.body.parts && req.body.parts !== ste.deloviUsluga ? {operater:req.body.username,izmena:"Promena delova/usluge u polju štete iz "+ste.deloviUsluga+" u "+req.body.parts,promenaKreirana:new Date()} : false
        let cenaChange= req.body.total && req.body.total !== ste.cena ? {operater:req.body.username,izmena:"Promena cene štete iz "+ste.cena+" u "+req.body.total,promenaKreirana:new Date()} : false
        let uslugaChange = req.body.usluga && req.body.usluga !== ste.uslugaZaposlenog ? {operater:req.body.username,izmena:"Promena usluge zaposlenog u polju štete iz "+ste.uslugaZaposlenog+" u "+req.body.usluga,promenaKreirana:new Date()} : false
        let vremeChange = req.body.time && req.body.time !== ste.vremeZaposlenog ? {operater:req.body.username,izmena:"Promena vremena zaposlenog u polju štete iz "+ste.vremeZaposlenog+" u "+req.body.time,promenaKreirana:new Date()} : false

        ste.opisStete = req.body.desc
        ste.stetuPokriva = req.body.pokriva
        ste.datum = req.body.date
        ste.deloviUsluga = req.body.parts
        ste.cena = req.body.total
        ste.uslugaZaposlenog = req.body.usluga
        ste.vremeZaposlenog = req.body.time

        opisChange && steta.istorijaPolje.push(opisChange)
        pokrivaChange && steta.istorijaPolje.push(pokrivaChange)
        dateChange && steta.istorijaPolje.push(dateChange)
        deloviChange && steta.istorijaPolje.push(deloviChange)
        cenaChange && steta.istorijaPolje.push(cenaChange)
        uslugaChange && steta.istorijaPolje.push(uslugaChange)
        vremeChange && steta.istorijaPolje.push(vremeChange)

        steta.save()
        res.send(req.body)

    } catch (error) {
        console.log(error)
    }

}


const Serviseri = async (req, res) => {

    try {

        let serviseri = await ServiseriModel.find({})
        res.send(serviseri)

    } catch (error) {
        console.log(error)
    }

}

const ServiseriEdit = async (req, res) => {
    try {
        const serv = await ServiseriModel.findById(req.body.id)
        serv.sifraKlijenta = req.body.sifraS 
        serv.nazivFirme = req.body.nazivFirme
        serv.tipUsluge = req.body.tipUslugeS
        serv.kontakt = req.body.kontaktS || ""
        serv.adresa = req.body.adresaS|| ""
        serv.brTelefona = req.body.telS || ""
        serv.email = req.body.emailS || ""
        serv.website = req.body.siteS || ""
        serv.save()
        res.send("success")




    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const Vozila = async (req, res) => {
    try {
        const vozila = await CarsModel.find({})
        let newAr = []
        for (a of vozila) {
            newAr.push({ name: a.markaTip+" - "+a.registracioniBroj, _id: a._id })
        }
        res.send(newAr)

    } catch (error) {
        console.log(error)
    }
}

const IzvestajiPost = async (req, res) => {
    try {
        let ar = []
        let all

        for (let a of req.body.vozilaSelect) {
            ar.push(mongoose.Types.ObjectId(a))
        }
        if (ar.length === 0) {
            all = await CarsModel.find()
        } else {
            all = await CarsModel.find({ _id: ar })
        }
        if (req.body.zaposleniSelect.length > 0) {
            all = all.filter(item => req.body.zaposleniSelect.some(zaposleni => zaposleni === item.korisnikVoz))
        }

        let results = []
        let num = 0
        let meseci = razlika(req.body.menuDateFrom, req.body.menuDateTo)
        let firstMonth = new Date(req.body.menuDateFrom).getMonth() + 1
        let lastMonth = new Date(req.body.menuDateTo).getMonth() + 1
        let prviKvartal;
        let zadnjiKvartal;
        let kvartali;
        let headAr = []
        let finalType;
        let resTot = []
        let yearFrom = new Date(req.body.menuDateFrom).getFullYear()
        let yearTo = new Date(req.body.menuDateTo).getFullYear()
        let firstHalf
        let lastYearMissingHalf
        let halves
        let prvaNedelja = Math.floor(dayOfTheYear(new Date(req.body.menuDateFrom))/7)
        let zadnjaNedelja = Math.floor(dayOfTheYear(new Date(req.body.menuDateTo))/7)
        function cena(a, b) {
            return a + b.cena * (req.body.tipIzvestaja === "Potrošnja goriva " ? b.potrosnja : 1)
        }
        function litri(a, b) {
            return a + b.potrosnja
        }
        function vreme(a, b) {
            return a + b.vremeZaposlenog
        }
        switch (req.body.vrstaVrednosti) {
            case "Cena (din.)":
                finalType = cena
                break;
            case "U litrima":
                finalType = litri
                break;
            case "Vreme zaposlenog":
                finalType = vreme
            default:
                break;
        }


        let polje;
        switch (req.body.tipIzvestaja) {
            case "Troškovi registracije":
                polje = "registracijaPolje"
                break;
            case "Troškovi za tag":
                polje = "gorivoPolje"
                break;
            case "Troškovi za pranje":
                polje = "gorivoPolje"
                break;
            case "Potrošnja goriva":
                polje = "gorivoPolje"
                break;
            case "Troškovi održavanja":
                polje = "odrzavanjePolje"
                break;
            case "Troškovi štete na vozilu":
                polje = "stetaPolje"
                break;
            case "Ukupni troškovi":
                polje = "ukupniTroskovi"
                break;
            case "Ukupno vreme zaposlenog":
                polje = "vremeZaposlenog"
                break;
            default:
                polje = "registracijaPolje"
        }


        function razlika(datumOd, datumDo) {
            let t2 = new Date(datumDo)
            let t1 = new Date(datumOd)

            let mnt1 = (t1.getMonth() + 1)
            let mnt2 = (t2.getMonth() + 1)
            let year = t2.getFullYear() - t1.getFullYear()
            return year * 12 + mnt2 - mnt1
        }

        function dayOfTheYear(a){      
            let currentYear = a.getFullYear();
            let currentMonth = a.getMonth(); 
            let currentDay = a.getDate(); 
            let date365 = 0
            let monthLength = [31,28,31,30,31,30,31,31,30,31,30,31];
            
            let leapYear = new Date(currentYear, 1, 29); 
            if (leapYear.getDate() == 29) { // If it's a leap year, changes 28 to 29
                monthLength[1] = 29;
            }
            
            for ( i=0; i < currentMonth; i++ ) { 
                date365 = date365 + monthLength[i];
            }
            return date365 = date365 + currentDay; // Done!}
            }


        /////////////////////////////////////////////////////////////////////////////////KOD ISPOD JE U RADNOJ VERZIJI PA SASMIM TIM NE IZGLEDA NAJBOLJE ALI JE FUNKCIONALAN(koliko-toliko)
        
        
        function totalMonth(array, months) {
            resTot = []
            try {
                for (let i = firstMonth; i <= months + firstMonth; i++) {
                    resTot.push({
                        ukupno: array.filter(item => {
                            let yr = new Date(item.datum).getFullYear() - new Date(req.body.menuDateFrom).getFullYear()
                            return ((new Date(item.datum).getMonth()) + 1) + (yr * 12) === i && (req.body.tipIzvestaja === "Troškovi održavanja" ? item.tip === req.body.todr : true) && (req.body.tipIzvestaja === "Troškovi štete na vozilu" ? item.stetuPokriva === req.body.pokr : true)

                        }).reduce(finalType, 0), svi: array.filter(item => {
                            let yr = new Date(item.datum).getFullYear() - new Date(req.body.menuDateFrom).getFullYear()
                            return ((new Date(item.datum).getMonth()) + 1) + (yr * 12) === i && (req.body.tipIzvestaja === "Troškovi održavanja" ? item.tip === req.body.todr : true) && (req.body.tipIzvestaja === "Troškovi štete na vozilu" ? item.stetuPokriva === req.body.pokr : true)

                        }), polje
                    })
                }
                return resTot
            } catch (error) {
                for (let i = 0; i <= months; i++) {
                    resTot.push(0)
                    return resTot
                }
                console.log(error)
            }
        }


        const totalYear = (array) => {
            resTot = []
            for (let i = yearFrom; i <= yearTo; i++) {
                resTot.push(
                    {
                        ukupno: array
                            .filter((item) => new Date(item.datum).getFullYear() === i)
                            .reduce(finalType, 0)
                        , svi: array
                            .filter((item) => new Date(item.datum).getFullYear() === i), polje
                    })
            }
            return resTot
        };


        const totalHalfYear = (df, dt, array) => {
            resTot = []
            firstHalf = (new Date(df).getMonth() + 1 <= 6) ? 1 : 2
            lastYearMissingHalf = (new Date(dt).getMonth() + 1) <= 6 ? 1 : 0
            halves = (yearTo - yearFrom + 1) * 2 - lastYearMissingHalf

            for (let i = firstHalf; i <= halves; i++) {
                resTot.push({
                    ukupno: array.filter(item => {
                        let yr = (new Date(item.datum).getFullYear() - yearFrom) * 2
                        let itemI = (new Date(item.datum).getMonth() + 1) <= 6 ? 1 : 2
                        itemI += yr
                        return itemI === i
                    }).reduce(finalType, 0), svi: array.filter(item => {
                        let yr = (new Date(item.datum).getFullYear() - yearFrom) * 2
                        let itemI = (new Date(item.datum).getMonth() + 1) <= 6 ? 1 : 2
                        itemI += yr
                        return itemI === i
                    }), polje
                })


            }

            return resTot
        }


        const totalWeeks = (array) =>{
        
            resTot = []
            for(let i = prvaNedelja;i<=zadnjaNedelja;i++){

                resTot.push({ukupno:array.filter(item=>{
                    let itemNedelja = Math.floor(dayOfTheYear(new Date(item.datum))/7)
                    return itemNedelja === i
                }).reduce(finalType, 0),svi:array.filter(item=>{
                    let itemNedelja = Math.floor(dayOfTheYear(new Date(item.datum))/7)
                    return itemNedelja === i
                }),polje})
            }
            return resTot

        }



        const totalKvartal = (array) => {
            resTot = []
            kvartali = (yearTo - yearFrom + 1) * 4 - (prviKvartal - 1) - (zadnjiKvartal)
            if (firstMonth <= 3) {
                prviKvartal = 1
            } else if (firstMonth > 3 && firstMonth <= 6) {
                prviKvartal = 2
            } else if (firstMonth > 6 && firstMonth <= 9) {
                prviKvartal = 3
            } else {
                prviKvartal = 4
            }

            if (lastMonth <= 3) {
                zadnjiKvartal = 3
            } else if (lastMonth > 3 && lastMonth <= 6) {
                zadnjiKvartal = 2
            } else if (lastMonth > 6 && lastMonth <= 9) {
                zadnjiKvartal = 1
            } else {
                zadnjiKvartal = 0
            }


            for (let i = prviKvartal; i <= kvartali + (prviKvartal - 1); i++) {


                resTot.push({
                    ukupno: array.filter(item => {
                        let itemMonth = new Date(item.datum).getMonth() + 1
                        let itemKvartal;
                        if (itemMonth <= 3) {
                            itemKvartal = 1
                        } else if (itemMonth > 3 && itemMonth <= 6) {
                            itemKvartal = 2
                        } else if (itemMonth > 6 && itemMonth <= 9) {
                            itemKvartal = 3
                        } else {
                            itemKvartal = 4
                        }
                        let itemYear = new Date(item.datum).getFullYear()
                        return itemKvartal + ((itemYear - yearFrom) * 4) === i


                    }).reduce(finalType, 0), svi: array.filter(item => {
                        let itemMonth = new Date(item.datum).getMonth() + 1
                        let itemKvartal;
                        if (itemMonth <= 3) {
                            itemKvartal = 1
                        } else if (itemMonth > 3 && itemMonth <= 6) {
                            itemKvartal = 2
                        } else if (itemMonth > 6 && itemMonth <= 9) {
                            itemKvartal = 3
                        } else {
                            itemKvartal = 4
                        }

                        let itemYear = new Date(item.datum).getFullYear()
                        return itemKvartal + ((itemYear - yearFrom) * 4) === i


                    }), polje
                })
            }


            return resTot


        }

        function addAr(num) {
            let month = "";
            switch (num) {
                case 1:
                    month = "Jan";
                    break;
                case 2:
                    month = "Feb";
                    break;
                case 3:
                    month = "Mart";
                    break;
                case 4:
                    month = "Apr";
                    break;
                case 5:
                    month = "Maj";
                    break;
                case 6:
                    month = "Jun";
                    break;
                case 7:
                    month = "Jul";
                    break;
                case 8:
                    month = "Avg";
                    break;
                case 9:
                    month = "Sept";
                    break;
                case 10:
                    month = "Okt";
                    break;
                case 11:
                    month = "Nov";
                    break;
                case 12:
                    month = "Dec";
                    break;
                default:
                    month = "Jan";
            }

            return month;
        }

        function editArMonths(nm, ar, firstMonth) {

            let num = firstMonth
            for (let i = 0; i <= nm; i++) {
                if (num > 12) {
                    num = 1
                }
                ar.push(addAr(num))
                ++num
            }
        }




        for (let b of all) {
            let podaci
            if (req.body.tipIzvestaja === "Troškovi registracije") {
                let result = b.registracijaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom))
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                }else {
                    podaci = totalKvartal(result)
                }
            }
            else if (req.body.tipIzvestaja === "Potrošnja goriva") {
                let result = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Gorivo")
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            } else if (req.body.tipIzvestaja === "Troškovi za tag") {
                let result = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Tag")
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            } else if (req.body.tipIzvestaja === "Troškovi za pranje") {
                let result = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Pranje")
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            } else if (req.body.tipIzvestaja === "Troškovi održavanja") {
                let result = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === req.body.todr)
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            } else if (req.body.tipIzvestaja === "Troškovi štete na vozilu") {
                let result = b.stetaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.stetuPokriva === req.body.pokr)
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            } else if (req.body.tipIzvestaja === "Ukupni troškovi") {

                let result = []
                let troskoviRegistracije = b.registracijaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom))
                for (let a of troskoviRegistracije) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Registracija" })
                }
                let troskoviGorivo = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Gorivo")
                for (let a of troskoviGorivo) {
                    result.push({ datum: a.datum, cena: a.potrosnja * a.cena, tip: "Gorivo" })
                }
                let troskoviTag = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Tag")
                for (let a of troskoviTag) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Tekući troškovi - Tag" })
                }
                let troskoviPranje = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Pranje")
                for (let a of troskoviPranje) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Tekući troškovi - Pranje" })
                }
                let troskoviOdrzavanjeHigijena = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Higijena")
                for (let a of troskoviOdrzavanjeHigijena) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Održavanje - Higijena" })
                }
                let troskoviOdrzavanjeGume = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Gume")
                for (let a of troskoviOdrzavanjeGume) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Održavanje - Gume" })
                }
                let troskoviOdrzavanjeRedovno = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Redovno")
                for (let a of troskoviOdrzavanjeRedovno) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Održavanje - Redovno" })
                }
                let troskoviOdrzavanjeVanredno = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Vanredno")
                for (let a of troskoviOdrzavanjeVanredno) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Održavanje - Vanredno" })
                }
                let troskoviStete = b.stetaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom))
                for (let a of troskoviStete) {
                    result.push({ datum: a.datum, cena: a.cena, tip: "Šteta", pokriva: a.stetuPokriva })
                }
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else {
                    podaci = totalKvartal(result)
                }


            }else if(req.body.tipIzvestaja === "Ukupno vreme zaposlenog"){
                let result = []
                let vremeRegistracije = b.registracijaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom))
                for (let a of vremeRegistracije) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Registracija" })
                }
                let vremeGorivo = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Gorivo")
                for (let a of vremeGorivo) {
                    result.push({ datum: a.datum, cena: a.potrosnja * a.vremeZaposlenog, tip: "Gorivo" })
                }
                let vremeTag = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Tag")
                for (let a of vremeTag) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Tekući troškovi - Tag" })
                }
                let vremePranje = b.gorivoPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Pranje")
                for (let a of vremePranje) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Tekući troškovi - Pranje" })
                }
                let vremeOdrzavanjeHigijena = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Higijena")
                for (let a of vremeOdrzavanjeHigijena) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Održavanje - Higijena" })
                }
                let vremeOdrzavanjeGume = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Gume")
                for (let a of vremeOdrzavanjeGume) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Održavanje - Gume" })
                }
                let vremeOdrzavanjeRedovno = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Redovno")
                for (let a of vremeOdrzavanjeRedovno) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Održavanje - Redovno" })
                }
                let vremeOdrzavanjeVanredno = b.odrzavanjePolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom)).filter(item => item.tip === "Vanredno")
                for (let a of vremeOdrzavanjeVanredno) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Održavanje - Vanredno" })
                }
                let vremeStete = b.stetaPolje.filter(item => new Date(item.datum) <= new Date(req.body.menuDateTo) && new Date(item.datum) >= new Date(req.body.menuDateFrom))
                for (let a of vremeStete) {
                    result.push({ datum: a.datum, cena: a.vremeZaposlenog, tip: "Šteta", pokriva: a.stetuPokriva })
                }
                if (req.body.rezolucija === "Godina") {
                    podaci = totalYear(result)
                } else if (req.body.rezolucija === "Mesec") {
                    podaci = totalMonth(result, meseci)
                } else if (req.body.rezolucija === "Pola godine") {
                    podaci = totalHalfYear(req.body.menuDateFrom, req.body.menuDateTo, result)
                } else if(req.body.rezolucija ==="Nedelja"){
                    podaci = totalWeeks(result)
                } else {
                    podaci = totalKvartal(result)
                }
            }
            results.push({ rb: ++num, vozilo: b.markaTip + " - " + b.registracioniBroj, regBr: b.registracioniBroj, data: podaci, naziv: req.body.tipIzvestaja, todr: req.body.todr, pokr: req.body.pokr })
        }

        if (req.body.rezolucija === "Mesec") {
            editArMonths(meseci, headAr, firstMonth)
        } else if (req.body.rezolucija === "Godina") {
            for (let i = yearFrom; i <= yearTo; i++) {
                headAr.push(i)
            }
        } else if (req.body.rezolucija === "Pola godine") {
            let years = []
            let counter

            for (let i = yearFrom; i <= yearTo; i++) {
                years.push(i)
                years.push(i)
            }

            for (let i = firstHalf; i <= halves; i++) {
                if (i % 2 != 0) {
                    counter = 1
                } else {
                    counter = 2
                }
                headAr.push((years[i - 1] + " - " + counter))
            }
        } else if (req.body.rezolucija === "Kvartal") {
            let godine = []
            for (let i = yearFrom; i <= yearTo; i++) {
                godine.push(i)
                godine.push(i)
                godine.push(i)
                godine.push(i)
            }
            for (let i = prviKvartal; i <= kvartali + (prviKvartal - 1); i++) {
                headAr.push(godine[i - 1] + " " + i)
            }
        } else if(req.body.rezolucija === "Nedelja"){
            for(let i = prvaNedelja;i<=zadnjaNedelja;i++){
                headAr.push(i)
            }
        }


        let resp = { tableHead: headAr, dataTable: results }
        res.send(resp)
        results = []


    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

const Tabela = async (req, res) => {
    try {


        let car = await CarsModel.findOne({ registracioniBroj: req.body.regBr })
        let polje
        switch (req.body.polje) {
            case "registracijaPolje":
                polje = car.registracijaPolje
                break;
            case "gorivoPolje":
                polje = car.gorivoPolje
                break;
            case "stetaPolje":
                polje = car.stetaPolje
                break;
            case "odrzavanjePolje":
                polje = car.odrzavanjePolje;
                break;
        }

        function getTip(item) {
            let trosak
            switch (req.body.polje) {
                case "registracijaPolje":
                    trosak = "Registracija"
                    break;
                case "gorivoPolje":
                    trosak = item.tip
                    break;
                case "stetaPolje":
                    trosak = "Šteta"
                    break;
                case "odrzavanjePolje":
                    trosak = item.tip
                    break;
            }
            return trosak
        }




        if(req.body.polje==="ukupniTroskovi"){
             res.send({
                 name: car.markaTip + " " + req.body.regBr, dateFrom: req.body.firstDate, dateTo: req.body.lastDate, data: req.body.date.map(item=>{
                     return {trosak:item.tip,datum:item.datum,vreme:item.cena}
                 })
             })
             return
        }

        if(req.body.polje==="vremeZaposlenog"){
             res.send({
                 name: car.markaTip + " " + req.body.regBr, dateFrom: req.body.firstDate, dateTo: req.body.lastDate, data: req.body.date.map(item=>{
                 return {trosak:item.tip,datum:item.datum,vreme:item.cena}
                })
             })
            return
       }


        let fltr = polje.filter(item => new Date(item.datum) <= new Date(req.body.lastDate.datum) && new Date(item.datum) >= new Date(req.body.firstDate))
        if (req.body.naziv === "Troškovi održavanja") {
            fltr = fltr.filter(item => item.tip === req.body.todr)
        } else if (req.body.naziv === "Troškovi štete na vozilu") {
            fltr = fltr.filter(item => item.stetuPokriva === req.body.pokr)
        }
        res.send({
            name: car.markaTip + " " + req.body.regBr, dateFrom: req.body.firstDate, dateTo: req.body.lastDate, data: fltr.map(item => {
                return { trosak: getTip(item), datum: item.datum, potrosnja: item.potrosnja, cena: item.cena, ukupno: item.cena * (item.potrosnja || 1) }
            }), naziv: req.body.polje
        })
    } catch (error) {
        console.log(error)
    }




}

module.exports = { CheckLogin,Login,Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri, ServiseriEdit, Vozila, IzvestajiPost, Tabela }