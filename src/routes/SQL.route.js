const express = require('express')
const router = express.Router()
const path = require('path')
const SQLController = require('../controllers/SQL_futa')

router.get('/login', SQLController.GetLoginPage)
router.get('/DatVe', SQLController.GetDatVePage)
router.get('/', SQLController.gethomepage)
module.exports = router