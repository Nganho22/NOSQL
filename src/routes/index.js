const NoSQLRoute = require('./NoSQL.route')
const siteRouter = require('./site.route')
const SQLRoute = require('./SQL.route')

function route(app) {
    app.use('/',siteRouter)
    app.use('/nosql',NoSQLRoute)
    app.use('/sql', SQLRoute)
}

module.exports = route