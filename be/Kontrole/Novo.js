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


const NovoRegistracija = async (req, res) => {
    try {
        const registracija = await CarsModel.findById(req.params.carId)
        let newR = {
            datum: req.body.dateReg,
            dokumentacija: req.body.docReg,
            cena: req.body.troskovi,
            registrovaoZaposleni: req.body.registrovao,
            vremeZaposlenog: req.body.timeZaposleni,
            registrovanDo: req.body.regDo
        }
        registracija.registracijaPolje.push(newR)
        registracija.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const NovoGorivo = async (req, res) => {

    try {
        const gorivo = await CarsModel.findById(req.params.carId)

        let newR = {
            tip: req.body.type,
            datum: req.body.dateFuel,
            kilometraza: req.body.kmFuel,
            potrosnja: req.body.potrosnja,
            cena: req.body.priceFuel,
            uslugaZaposlenog: req.body.uslugaFuel,
            vremeZaposlenog: req.body.timeFuel,
        }
        gorivo.gorivoPolje.push(newR)
        gorivo.save()
        res.send("success")

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

const NovoOdrzavanje = async (req, res) => {
    try {

        const odrzavanje = await CarsModel.findById(req.params.carId)

        let newR = {
            tip: req.body.typeOdr,
            datum: req.body.dateOdr,
            kilometraza: req.body.kmOdr,
            deloviUsluga: req.body.partsOdr,
            cena: req.body.totalOdr,
            uslugaZaposlenog: req.body.uslugaOdr,
            vremeZaposlenog: req.body.timeOdr
        }

        odrzavanje.odrzavanjePolje.push(newR)
        odrzavanje.save()
        res.send("success")


    } catch (error) {
        console.log(error)
    }
}

const NovoSteta = async (req, res) => {
    try {

        const steta = await CarsModel.findById(req.params.carId)

        let newR = {
            opisStete: req.body.desc,
            stetuPokriva: req.body.pokriva,
            datum: req.body.date,
            deloviUsluga: req.body.parts,
            cena: req.body.total,
            uslugaZaposlenog: req.body.usluga,
            vremeZaposlenog: req.body.time
        }
        steta.stetaPolje.push(newR)
        steta.save()
        res.send("success")


    } catch (error) {
        console.log(error)
    }
}

const NovoServiseri = async (req, res) => {

    try {
        let newAr = {
            sifraKlijenta: req.body.sifraS,
            nazivFirme: req.body.nazivFirme,
            tipUsluge: req.body.tipUslugeS,
            kontakt: req.body.kontaktS,
            adresa: req.body.adresaS,
            brTelefona: req.body.telS,
            email: req.body.emailS,
            website: req.body.siteS
        }
        await ServiseriModel.create(newAr)
        res.send("success")


    } catch (error) {
        console.log(error)
        res.send(error
        )

    }

}

const NovoMain = async (req, res) => {
    try {
        let newAr = {
            markaTip: req.body.marka,
            registracioniBroj: req.body.regBr,
            korisnikVoz: req.body.korisnikMn,
            tipKorisnika: req.body.typeMn,
            activeFrom: req.body.aktivnoOd,
            activeTo: req.body.aktivnoDo,
            registracijaPolje:{
                registrovanDo:req.body.regDo
            },
            slike: req.body.file.map(item=>{
                return {slika:item}
            }),
            specifikacijaPolje:{
                brSasije : "",
                brMotora : "",
                godiste : "",
                boja : "",
                datumKupovine : "",
                cenaVozila : "",
                dokumentacija : ""
            }

        }

        await CarsModel.create(newAr)
        res.send("success")

    } catch (error) {
        console.log(error)
    }
}

const AddImage = async(req,res)=>{
    try {
        const car = await CarsModel.findById(req.body.carId)
        let newAr = req.body.imgs.map(item=>{
            return {slika:item}
        })
        car.slike = car.slike.concat(newAr)
        car.save()
        res.send("success")
    } catch (error) {
        console.log(error)
    }
}


module.exports = { NovoRegistracija, NovoGorivo, NovoOdrzavanje, NovoSteta, NovoServiseri, NovoMain,AddImage }