const express = require('express')
const router = express.Router()
const { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri } = require("../Kontrole/Kontrole")


router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditCars)
router.route("/profil/:carId").get(SingleCar)
router.route("/registracija/:carId").patch(RegistracijaEdit)
router.route("/specifikacija/:carId").patch(SpecifikacijaEdit)
router.route("/gorivo/:carId").patch(GorivoEdit)
router.route("/odrzavanje/:carId").patch(OdrzavanjeEdit)
router.route("/steta/:carId").patch(StetaEdit)



module.exports = { router }

