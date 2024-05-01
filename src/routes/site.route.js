const express = require('express')
const router = express.Router()
const siteController = require('../controllers/site.controller')
const NoSQLRoute = require('./NoSQL.route')
const SQLRoute = require('./SQL.route')

function initRoute(app) {
    router.get('/', siteController.getPick)
    router.get('/nosql', NoSQLRoute )
    router.get('/sql', SQLRoute )
    return app.use('/', router)
}
module.exports = initRoute
