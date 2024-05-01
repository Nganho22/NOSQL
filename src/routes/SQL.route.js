const express = require('express')
const router = express.Router()
const path = require('path')
const SQLController = require('../controllers/SQL_futa')
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

router.get('/sql/login', SQLController.GetLoginPage)
router.get('/sql/DatVe', SQLController.GetDatVePage)
router.get('/sql', SQLController.gethomepage)
module.exports = router