const express = require('express')
const router = express.Router()
const path = require('path')
const SQL_futa = require('../controllers/SQL_futa')

function initSQLRoute(app) {
    router.get('/sql/login', SQL_futa.GetLoginPage)
    router.get('/sql', SQL_futa.getDeXuatChuyenXe)
    return app.use('/', router)
    //router.get('/)
}

module.exports = initSQLRoute