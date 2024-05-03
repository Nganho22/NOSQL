const { createDriver } = require('../config/neo4jDB');
const connectToMongoDB = require('../config/connectMongoDB');
const mongoose = require('mongoose');
const {connectToRedis} = require('../config/redisDB');
let gethomepage = async (req, res) => {

    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    try {

        const result1 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'TP. Hồ Chí Minh'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeHCM = result1.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));
        
        const result2 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'Đà Lạt'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeDL = result2.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));

        const result3 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'Đà Nẵng'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeDN = result3.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));
        return res.render('pages/home.ejs', { TuyenXe1: TuyenXeHCM, TuyenXe2: TuyenXeDL, TuyenXe3: TuyenXeDN, selectedOption: 'nosql' }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};

let GetTuyenXe = async (req, res) => {
    const { diemDi, diemDen } = req.body;
    if (Array.isArray(diemDi)) {
        // Nếu diemDi là một mảng, chỉ sử dụng giá trị đầu tiên
        const diemDiValue = diemDi[0];
        console.log("di:", diemDiValue);
    } else {
        // Nếu không, sử dụng giá trị như bình thường
        console.log("di:", diemDi);
    }
    if (Array.isArray(diemDen)) {
        // Nếu diemDi là một mảng, chỉ sử dụng giá trị đầu tiên
        const diemDenValue = diemDen[0];
        console.log("di:", diemDenValue);
    } else {
        // Nếu không, sử dụng giá trị như bình thường
        console.log("di:", diemDen);
    }
    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    let cypher = "MATCH (tpden:ThanhPho";
    if (diemDen) {
        cypher += " {TenThanhPho: '" + diemDen + "'}"
    }
    cypher += ") <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho";
    if (diemDi) {
        cypher += " {TenThanhPho: '" + diemDi + "'}"
    }
    cypher += "), (t)-[:dung]->(lx:LoaiXe) RETURN tpdi.TenThanhPho +' -> ' +tpden.TenThanhPho AS HanhTrinh, lx.TenLoaiXe, t.QuangDuong, t.ThoiGian, t.GiaVe ORDER BY tpdi.TenThanhPho";

    try {
        const result = await session.run(cypher);

        const TuyenXes = result.records.map(record => ({
            HanhTrinh: record.get('HanhTrinh'),
            LoaiXe: record.get('lx.TenLoaiXe'),
            QuangDuong: record.get('t.QuangDuong'),
            ThoiGian: record.get('t.ThoiGian'),
            GiaVe: record.get('t.GiaVe')
        }));
        console.log("cypher", cypher)
        return res.render('pages/TuyenXePage.ejs', { TuyenXes: TuyenXes, selectedOption: 'nosql', di: diemDi, den: diemDen });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};


let GetLoginPage = async (req, res) => {
    try {
        // Tạo một client Redis
        const redisClient = connectToRedis()
        await redisClient.connect()
        let userSession = await redisClient.hGetAll('cart:1234_01');
        console.log(JSON.stringify(userSession, null, 2));

        // Render trang loginPage
        return res.render('pages/loginPage.ejs', { selectedOption: 'nosql' });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};





let GetDatVePage = async (req, res) => {
    try {
        // Kết nối đến MongoDB
        await connectToMongoDB();
        /* if (mongoose.connection.readyState !== 1) {
             throw new Error('MongoDB connection is not established.');
         }*/
        const collection = mongoose.connection.collection('restaurants');

        const result = await collection.find({}, { "name": 1 }).toArray();

        // Xử lý kết quả trước khi gửi về client
        const TuyenXes = result.map(record => ({
            Ten: record.name,
        }));
        console.log('TuyenXes:', TuyenXes);

        return res.render('pages/DatVe.ejs', { TuyenXes: TuyenXes, selectedOption: 'nosql' });
    } catch (error) {
        console.error('Error executing MongoDB query:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        mongoose.connection.close()
    }
}

module.exports = {
    gethomepage,
    GetLoginPage,
    GetDatVePage,
    GetTuyenXe
}
