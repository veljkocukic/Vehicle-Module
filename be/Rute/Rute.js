const express = require('express')
const router = express.Router()
const { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri, ServiseriEdit, Vozila,IzvestajiPost, Tabela } = require("../Kontrole/Kontrole")
const { RegistracijaDelete, SpecifikacijaDelete, GorivoDelete, OdrzavanjeDelete, StetaDelete, ServiseriDelete } = require("../Kontrole/Delete")
const { NovoRegistracija, NovoGorivo, NovoOdrzavanje, NovoSteta, NovoServiseri,NovoMain } = require("../Kontrole/Novo")

router.route("/main").get(Main).post(NovoMain).patch(EditCars)
router.route("/vozila").get(Vozila)
router.route("/zaposleni").get(Zaposleni)
router.route("/profil/:carId").get(SingleCar)
router.route("/registracija/new/:carId").post(NovoRegistracija)
router.route("/registracija/:carId").patch(RegistracijaEdit).post(RegistracijaDelete)
router.route("/specifikacija/:carId").patch(SpecifikacijaEdit).post(SpecifikacijaDelete)
router.route("/gorivo/new/:carId").post(NovoGorivo)
router.route("/gorivo/:carId").patch(GorivoEdit).post(GorivoDelete)
router.route("/odrzavanje/new/:carId").post(NovoOdrzavanje)
router.route("/odrzavanje/:carId").patch(OdrzavanjeEdit).post(OdrzavanjeDelete)
router.route("/steta/new/:carId").post(NovoSteta)
router.route("/steta/:carId").patch(StetaEdit).post(StetaDelete)
router.route("/serviseri").get(Serviseri).patch(ServiseriEdit).post(NovoServiseri)
router.route("/serviseri/delete").post(ServiseriDelete)
router.route("/izvestaji").post(IzvestajiPost)
router.route("/tabela").post(Tabela)



module.exports = { router }

