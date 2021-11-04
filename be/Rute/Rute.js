const express = require('express')
const router = express.Router()
const {Main,Zaposleni,EditCars, SingleCar} = require("../Kontrole/Kontrole")


router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditCars)
router.route("/profil/:carId").get(SingleCar)



module.exports={router}

