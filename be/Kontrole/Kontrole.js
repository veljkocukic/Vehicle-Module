let { CarsModel, ServiseriModel, CommentsModel, ZaposleniModel } = require("../Modeli/Podaci")



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
    let date = new Date(dt).toLocaleDateString().replaceAll("/", ".")   ///<------------------------------------- Ne prikazuje nas format
    return date + "."
}

let formatDateEdit = (dt) => { ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth() + 1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
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
                activeFrom: formatDate(a.activeFrom),
                activeFromEdit: formatDateEdit(a.activeFrom),
                tipKorisnika: a.tipKorisnika,
                activeTo: formatDate(a.activeTo),
                activeToEdit: formatDateEdit(a.activeTo),
                isticanje,
                isticanjeEdit,
                slike: a.slike
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
        car.markaTip = req.body.marka
        car.registracioniBroj = req.body.regBr
        car.tipKorisnika = req.body.typeMn
        car.korisnikVoz = req.body.korisnikMn
        car.registrovanDo = req.body.isticanje
        car.activeFrom = req.body.aktivnoOd
        car.activeTo = req.body.aktivnoDo
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
        reg.datumRegistracije = req.body.dateReg
        reg.dokumentacija = req.body.docReg
        reg.troskoviRegistracije = req.body.troskovi
        reg.registrovaoZaposleni = req.body.registrovao
        reg.vremeZaposlenog = req.body.timeZaposleni
        reg.registrovanDo = req.body.regDo

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

        specifikacija.specifikacijaPolje.brSasije = req.body.sasija
        specifikacija.specifikacijaPolje.brMotora = req.body.motor
        specifikacija.specifikacijaPolje.godiste = req.body.godiste
        specifikacija.specifikacijaPolje.boja = req.body.boja
        specifikacija.specifikacijaPolje.datumKupovine = req.body.dateKup
        specifikacija.specifikacijaPolje.cenaVozila = req.body.cenaVoz
        specifikacija.specifikacijaPolje.dokumentacija = req.body.docume

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

        gor.tip = req.body.type
        gor.datum = req.body.dateFuel
        gor.kilometraza = req.body.kmFuel
        gor.potrosnja = req.body.potrosnja
        gor.cena = req.body.priceFuel
        gor.uslugaZaposlenog = req.body.uslugaFuel
        gor.vremeZaposlenog = req.body.timeFuel
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

        odr.tip = req.body.typeOdr
        odr.datum = req.body.dateOdr
        odr.kilometraza = req.body.kmOdr
        odr.deloviUsluga = req.body.partsOdr
        odr.ukupanTrosak = req.body.totalOdr
        odr.uslugaZaposlenog = req.body.uslugaOdr
        odr.vremeZaposlenog = req.body.timeOdr

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

        ste.opisStete = req.body.desc
        ste.stetuPokriva = req.body.pokriva
        ste.datum = req.body.date
        ste.deloviUsluga = req.body.parts
        ste.ukupanTrosak = req.body.total
        ste.uslugaZaposlenog = req.body.usluga
        ste.vremeZaposlenog = req.body.time

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
        serv.kontakt = req.body.kontaktS
        serv.adresa = req.body.adresaS
        serv.brTelefona = req.body.telS
        serv.email = req.body.mailS
        serv.website = req.body.siteS

        serv.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


module.exports = { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri, ServiseriEdit }