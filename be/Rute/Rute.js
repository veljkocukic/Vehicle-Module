const express = require('express')
const router = express.Router()
const {Main,Zaposleni,EditCars} = require("../Kontrole/Kontrole")


router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditCars)



module.exports={router}

