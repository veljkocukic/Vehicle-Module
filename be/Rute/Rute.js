const express = require('express')
const router = express.Router()
const {Main} = require("../Kontrole/Kontrole")


router.route("/main").get(Main)



module.exports={router}

