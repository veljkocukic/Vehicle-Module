let mongoose = require("mongoose")

const RegistracijaSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    datumRegistracije: { type: Date, required: true },
    dokumentacija: { type: String, required: true },
    troskoviRegistracije: { type: Number, required: true },
    registrovaoZaposleni: { type: String, required: true },
    vremeZaposlenog: { type: String, required: true },
    registrovanDo: { type: String, required: true }
})

const SpecifikacijaSchema = new mongoose.Schema({
    brSasije: { type: String, required: true },
    brMotora: { type: String, required: true },
    godiste: { type: Number, required: true },
    boja: { type: String, required: true },
    datumKupovine: { type: Date, required: true },
    cenaVozila: { type: Number, required: true },
    dokumentacija: { type: String, required: true }
})

const GorivoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    tip: { type: String, required: true },
    datum: { type: Date, required: true },
    kilometraza: { type: Number, required: true },
    potrosnja: { type: Number, default: 0 },
    cena: { type: Number, required: true },
    uslugaZaposlenog: { type: String, default: "/" },
    vremeZaposlenog: { type: Number, default: 0 }
})


const OdrzavanjeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    tip: { type: String, required: true },
    datum: { type: Date, required: true },
    ukupanTrosak: { type: Number, required: true },
    kilometraza: { type: Number, required: true },
    deloviUsluga: { type: String, required: true },
    ukupanTrosak: { type: Number, required: true },
    uslugaZaposlenog: { type: String, required: true },
    vremeZaposlenog: { type: Number, required: true }
})


const StetaSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    opisStete: { type: String, required: true },
    stetuPokriva: { type: String, required: true },
    datum: { type: Date, required: true },
    deloviUsluga: { type: String, required: true },
    ukupanTrosak: { type: Number, required: true },
    uslugaZaposlenog: { type: String, required: true },
    vremeZaposlenog: { type: Number, required: true }
})


const IstorijaSchema = new mongoose.Schema({
    operater: { type: String, required: true },
    izmena: { type: String, required: true },
    promenaKreirana: { type: Date }
})


const CarsSchema = new mongoose.Schema({
    markaTip: { type: String, required: true },
    registracioniBroj: { type: String, required: true },
    korisnikVoz: { type: String, required: true },
    tipKorisnika: { type: String, required: true },
    activeFrom: { type: Date, required: true },
    activeTo: { type: Date },
    registracijaPolje: [RegistracijaSchema],
    specifikacijaPolje: SpecifikacijaSchema,
    gorivoPolje: [GorivoSchema],
    odrzavanjePolje: [OdrzavanjeSchema],
    stetaPolje: [StetaSchema],
    istorijaPolje: [IstorijaSchema]
})

const ServiseriSchema = new mongoose.Schema({
    sifraKlijenta: { type: String, required: true },
    nazivFirme: { type: String, required: true },
    tipUsluge: { type: String, required: true },
    kontakt: { type: String, required: true },
    adresa: { type: String, required: true },
    brTelefona: { type: String, required: true },
    email: { type: String, required: true },
    webiste: { type: String, required: true }
})


const CommentsSchema = new mongoose.Schema({
    zaposleni: { type: String, required: true },
    datum: { type: Date, required: true },
    predlog: { type: String, required: true },
    komentar: { type: String, default: "/" },
    status: { type: String, required: true }
})

const ZaposleniSchema = new mongoose.Schema({
    ime: { type: String, required: true }
})


const CarsModel = mongoose.model("Cars", CarsSchema)
const ServiseriModel = mongoose.model("Serviseri", ServiseriSchema)
const CommentsModel = mongoose.model("Comments", CommentsSchema)
const ZaposleniModel = mongoose.model("Zaposleni", CommentsSchema)

module.exports = { CarsModel, ServiseriModel, CommentsModel, ZaposleniModel }

