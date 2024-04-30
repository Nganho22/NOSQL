const express = require('express')
const router = express.Router()
const path = require('path')
const NoSQL_DeXuatChuyenXe = require('../controllers/NoSQL')

function initNoSQLRoute(app) {

    router.get('/nosql/login', NoSQL_DeXuatChuyenXe.GetLoginPage)
    router.get('/nosql', NoSQL_DeXuatChuyenXe)
    return app.use('/', router)
    //router.get('/)
}

module.exports = initNoSQLRoute