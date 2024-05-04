const { NULL } = require('node-sass');
const { connectToMSSQL, sql } = require('../config/mssqlDB');
const { Query } = require('mongoose');

let gethomepage = async (req, res) => {
    let pool;
    try {
        const startTime = new Date().getTime();
        pool = await connectToMSSQL();
        const result1 = await pool.request().query("EXECUTE XEM_TuyenXe_Theo_TPDi @TP =N'TP. Hồ Chí Minh'")

        const TuyenXeHCM = result1.recordset.map(record => ({
            Den: record.Den,
            QuangDuong: record.QuangDuong,
            ThoiGian: record.ThoiGian,
            GiaVe: record.GiaVe,
        }));

        const result2 = await pool.request().query("EXECUTE XEM_TuyenXe_Theo_TPDi @TP =N'Đà Lạt'")

        const TuyenXeDL = result2.recordset.map(record => ({
            Den: record.Den,
            QuangDuong: record.QuangDuong,
            ThoiGian: record.ThoiGian,
            GiaVe: record.GiaVe,
        }));


        const result3 = await pool.request().query("EXECUTE XEM_TuyenXe_Theo_TPDi @TP =N'Đà Nẵng'")

        const TuyenXeDN = result3.recordset.map(record => ({
            Den: record.Den,
            QuangDuong: record.QuangDuong,
            ThoiGian: record.ThoiGian,
            GiaVe: record.GiaVe,
        }));
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn

        console.log('Thời gian truy vấn:', queryTime, 'ms');
        return res.render('pages/home.ejs', { TuyenXe1: TuyenXeHCM, TuyenXe2: TuyenXeDL, TuyenXe3: TuyenXeDN, selectedOption: 'sql' }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

let getChiTietTuyen = async (req, res) => {
    const IDTuyen = req.params.IDTuyen;
    console.log(IDTuyen)
    let pool;
    const query1 = "EXECUTE Xem_DS_Ben_Di @T= '" + IDTuyen + "'";
    const query2 = "EXECUTE Xem_DS_Ben_Den @T= '" + IDTuyen + "'";
    //console.log('Query', query)
    const query3 = "EXECUTE Xem_Tuyen_Theo_ID @T = '" + IDTuyen + "'";

    try {
        const startTime = new Date().getTime();
        pool = await connectToMSSQL();

        const result1 = await pool.request().query(query1)

        const Ben_Di = result1.recordset.map(record => ({
            BenDi: record.BenDi
        }));

        const result2 = await pool.request().query(query2)

        const Ben_Den = result2.recordset.map(record => ({
            BenDen: record.BenDen
        }));

        const result3 = await pool.request().query(query3)

        const TuyenXe = result3.recordset.map(record => ({
            HanhTrinh: record.Di + '-> ' + record.Den,
            LoaiXe: record.LoaiXe,
            GiaVe: record.GiaVe,
            QuangDuong: record.QuangDuong,
            ThoiGian: record.ThoiGianAsText
        }));
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn
        console.log('Thời gian truy vấn:', queryTime, 'ms');
        console.log('Tuyenxe', TuyenXe)
        console.log('Ben_Di', Ben_Di)
        console.log('Ben_Den', Ben_Den)
        return res.render('pages/CTTuyen.ejs', { BenDi: Ben_Di, BenDen: Ben_Den, TuyenXes: TuyenXe, selectedOption: 'sql', IDTuyen: IDTuyen }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

let GetLoginPage = async (req, res) => {
    return res.render('pages/loginPage.ejs', { selectedOption: 'sql' });
}
let GetDatVePage = async (req, res) => {
    return res.render('pages/DatVe.ejs', { selectedOption: 'sql' });
}

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

    // Kiểm tra xem diemDi và diemDen có phải là chuỗi không
    let pool;
    try {

        let query = 'EXECUTE XEM_TT_TuyenXe ';
        if (diemDen) {
            query += `@TPDen = N'${diemDen}', `;
        } else {
            query += '@TPDen = NULL, ';
        }
        if (diemDi) {
            query += `@TPDi = N'${diemDi}'`;
        } else {
            query += '@TPDi = NULL';
        }
        const startTime = new Date().getTime();
        pool = await connectToMSSQL();
        const result = await pool.request().query(query);
        console.log(query)
        const TuyenXe1 = result.recordset.map(record => ({
            HanhTrinh: record.Di + '-> ' + record.Den,
            LoaiXe: record.LoaiXe,
            GiaVe: record.GiaVe,
            QuangDuong: record.QuangDuong,
            ThoiGian: record.ThoiGianAsText,
            IDTuyen: record.IDTuyen
        }));
        //console.log('TuyenXe1:', TuyenXe1);
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn
        console.log(TuyenXe1)
        console.log('Thời gian truy vấn:', queryTime, 'ms');
        return res.render('pages/TuyenXePage.ejs', { TuyenXes: TuyenXe1, selectedOption: 'sql', di: diemDi, den: diemDen });
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}



module.exports = {
    gethomepage,
    GetLoginPage,
    GetTuyenXe,
    GetDatVePage,
    getChiTietTuyen
};
