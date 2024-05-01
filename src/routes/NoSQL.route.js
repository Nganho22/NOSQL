const express = require('express')
const router = express.Router()
const path = require('path')
const NoSQLController = require('../controllers/NoSQL')
/*
function initNoSQLRoute(app) {
    router.get('/nosql/DatVe')
    router.get('/nosql/login', NoSQL_DeXuatChuyenXe.GetLoginPage)
    router.get('/nosql', NoSQL_DeXuatChuyenXe)
    app.use('/', router)
    //router.get('/)
}

module.exports = initNoSQLRoute
*/

router.get('/nosql/login', NoSQLController.GetLoginPage)
router.get('/nosql/DatVe', NoSQLController.GetDatVePage)
router.get('/nosql', NoSQLController.gethomepage)
module.exports = router