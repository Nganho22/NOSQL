const express = require('express')
const router = express.Router()
const siteRouter = require('../controllers/site.controller')
const NoSQLRoute = require('../controllers/NoSQL')
const SQLRoute = require('../controllers/SQL_futa')
router.get('/', siteRouter.getPick)
router.get('/nosql', NoSQLRoute.gethomepage)
router.get('/nosql/login', NoSQLRoute.GetLoginPage)
router.get('/sql', SQLRoute.getDeXuatChuyenXe)
router.get('/sql/login', SQLRoute.GetLoginPage)

module.exports = router
