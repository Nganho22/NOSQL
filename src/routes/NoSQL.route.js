const express = require('express')
const router = express.Router()
const path = require('path')
const NoSQL_DeXuatChuyenXe = require('../controllers/NoSQL_DeXuatChuyenXe')
function initNoSQLRoute(app) {

    router.get('/nosql', NoSQL_DeXuatChuyenXe.NoSQL_DeXuatChuyenXe)
    return app.use('/', router)
    //router.get('/)
}

module.exports = initNoSQLRoute