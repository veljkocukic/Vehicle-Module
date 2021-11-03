const express = require('express')
const router = express.Router()
const {Main,Zaposleni,EditZaposleni} = require("../Kontrole/Kontrole")


router.route("/main").get(Main)
router.route("/zaposleni").get(Zaposleni)
router.route("/izmena").patch(EditZaposleni)



module.exports={router}

