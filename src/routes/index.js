
const siteRouter = require('./site.route')

function route(app) {
    siteRouter(app)
}

module.exports = route
