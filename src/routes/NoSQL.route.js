const express = require('express')
const router = express.Router()
const path = require('path')
const NoSQLController = require('../controllers/NoSQL')

router.get('/getChiTietTuyen/:IDTuyen', NoSQLController.getChiTietTuyen)
router.get('/tuyenxe', NoSQLController.GetTuyenXe)
router.post('/tuyenxe', NoSQLController.GetTuyenXe)

router.get('/login', NoSQLController.GetLoginPage)
router.post('/login', NoSQLController.login_check)

router.get('/signup', NoSQLController.GetSignUpPage)
router.get('/userprofile', NoSQLController.GetUserProfile)

router.get('/DatVe', NoSQLController.GetDatVePage)
router.post('/DatVe', NoSQLController.GetDatVePage)
router.get('/HoaDon', NoSQLController.GetHoaDonPage)
router.post('/HoaDon', NoSQLController.GetHoaDonPage)

router.get('/timchuyenxe', NoSQLController.GetTimChuyenXe)
router.post('/timchuyenxe', NoSQLController.GetTimChuyenXe)

router.get('/', NoSQLController.gethomepage)
module.exports = router
