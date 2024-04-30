const express = require('express')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(
    express.urlencoded({
        extended: true, //chọn qs library để parsing url và encoding data
    }),
);
app.use(express.static(path.join(__dirname, 'public')));

const route = require('./routes')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined'))


app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejs.renderFile)
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})
/*
const cors = require("cors");
   app.use(cors({
   origin: '*'
}))*/
route(app)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})