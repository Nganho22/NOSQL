const express = require('express')
const router = express.Router()
const path = require('path')
const NoSQLController = require('../controllers/NoSQL')

router.get('/tuyenxe', NoSQLController.GetTuyenXe)
router.post('/tuyenxe', NoSQLController.GetTuyenXe)
router.get('/login', NoSQLController.GetLoginPage)
router.get('/DatVe', NoSQLController.GetDatVePage)
router.get('/', NoSQLController.gethomepage)
module.exports = router
