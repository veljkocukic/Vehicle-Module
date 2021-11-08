const express = require('express')
const router = express.Router()
const { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri } = require("../Kontrole/Kontrole")
const {RegistracijaDelete,SpecifikacijaDelete,GorivoDelete,OdrzavanjeDelete,StetaDelete} = require("../Kontrole/Delete")

router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditCars)
router.route("/profil/:carId").get(SingleCar)
router.route("/registracija/:carId").patch(RegistracijaEdit).post(RegistracijaDelete)
router.route("/specifikacija/:carId").patch(SpecifikacijaEdit).post(SpecifikacijaDelete)
router.route("/gorivo/:carId").patch(GorivoEdit).post(GorivoDelete)
router.route("/odrzavanje/:carId").patch(OdrzavanjeEdit).post(OdrzavanjeDelete)
router.route("/steta/:carId").patch(StetaEdit).post(StetaDelete)
router.route("/serviseri").get(Serviseri)



module.exports = { router }

