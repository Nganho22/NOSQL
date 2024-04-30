const NoSQLRoute = require('./NoSQL.route')
const siteRouter = require('./site.route')

function route(app) {
    app.use('/',siteRouter)
    app.use('/nosql',NoSQLRoute)
}

module.exports = route