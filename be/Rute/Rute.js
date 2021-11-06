const express = require('express')
const router = express.Router()
const { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit } = require("../Kontrole/Kontrole")


router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditCars)
router.route("/profil/:carId").get(SingleCar)
router.route("/registracija/:carId").patch(RegistracijaEdit)
router.route("/specifikacija/:carId").patch(SpecifikacijaEdit)



module.exports = { router }

