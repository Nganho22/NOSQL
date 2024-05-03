const { NULL } = require('node-sass');
const { connectToMSSQL, sql } = require('../config/mssqlDB');

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
            ThoiGian: record.ThoiGianAsText
        }));
        //console.log('TuyenXe1:', TuyenXe1);
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn

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
    GetDatVePage
};
