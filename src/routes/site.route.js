const express = require('express')
const router = express.Router()
const siteRouter = require('../controllers/site.controller')
const NoSQLRoute = require('../controllers/NoSQL_DeXuatChuyenXe')
router.get('/', siteRouter.getPick)
router.get('/nosql',NoSQLRoute.getDeXuatChuyenXe)

module.exports = router
