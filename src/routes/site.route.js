const express = require('express')
const router = express.Router()
const siteRouter = require('../controllers/site.controller')
const NoSQLRoute = require('../controllers/NoSQL')
const SQLRoute = require('../controllers/SQL_futa')
router.get('/', siteRouter.getPick)
router.get('/nosql', NoSQLRoute.gethomepage)
router.get('/nosql/login', NoSQLRoute.GetLoginPage)
router.get('/nosql/DatVe', NoSQLRoute.GetDatVePage)
router.get('/sql', SQLRoute.getDeXuatChuyenXe)
router.get('/sql/login', SQLRoute.GetLoginPage)
router.get('/sql/DatVe', SQLRoute.GetDatVePage)

module.exports = router
