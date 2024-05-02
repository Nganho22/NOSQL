const { createDriver } = require('../config/neo4jDB');
const connectToMongoDB = require('../config/connectMongoDB');
const mongoose = require('mongoose');
let gethomepage = async (req, res) => {
    
    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    try {

        const result = await session.run('MATCH (c:KhoaHoc) WHERE c.Buoi > 32 RETURN c.Ten as Ten, c.Buoi as Buoi ORDER BY c.Buoi DESC;');

        const TuyenXes = result.records.map(record => ({
            Ten: record.get('Ten'),
            Buoi: record.get('Buoi').toNumber()
        }));
        console.log('TuyenXes:', TuyenXes);

        return res.render('pages/home.ejs', { TuyenXes: TuyenXes, selectedOption: 'nosql' }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};

let GetLoginPage = async (req, res) => {
    const Lichtrinh = {
        loaixe: "A",
        quangduong: "hhhh",
        diemDi: "123",
        diemDen: "456",
        thoiGian: "9h15",
        giaVe: "150k"
    }
    const TuyenXes = [Lichtrinh];
    return res.render('pages/TuyenXePage.ejs', { TuyenXes: TuyenXes, tuyenxe: Lichtrinh, selectedOption: 'nosql' });
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
    GetDatVePage
}
