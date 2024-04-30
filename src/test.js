const express = require('express')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()
const neo4j = require('neo4j-driver')
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
 /*
    try {
        // Gọi service để lấy dữ liệu từ Neo4j
        const TuyenXes = await TuyenxeService.getTuyenxeDiNhieuNhat();
        // Trả về trang home.ejs với dữ liệu tuyến xe

        return res.render('pages/home.ejs', { TuyenXes: TuyenXes });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    }*/
 /* session
        .run('MATCH (c:KhoaHoc) WHERE c.Buoi > 32 RETURN c.Ten as Ten, c.Buoi as Buoi ORDER BY c.Buoi DESC;')
        .then(function(result){
            var TuyenXeArr =[];
            result.records.forEach(function(record){
                TuyenXeArr.push({
                    Ten: record._fields[0].properties.Ten,
                    Buoi: record._fields[0].properties.Buoi
                });
            });
            console.log('TuyenXe:', result.records);
            return res.render('pages/home.ejs', {TuyenXes: TuyenXeArr});
        })
        .catch(function(err){
            console.error('Error retrieving data:', err);
            return res.status(500).send('Internal Server Error');
        });*/

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejs.renderFile)
var driver = 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})