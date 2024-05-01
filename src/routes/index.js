
const siteRoute = require('./site.route')
const NoSQLRoute = require('./NoSQL.route')
const SQLRoute = require('./SQL.route')
function route(app) {
    app.use('/nosql', NoSQLRoute)
    app.use('/sql', SQLRoute)
    app.use('/', siteRoute)

    app.use((req, res, next) => {
        next(createError.NotFound('This route does not exist.'))
    })

    app.use((err, req, res, next) => {
        res.json({
            status: err.status || 500,
            message: err.message
        })
    })
}

module.exports = route
