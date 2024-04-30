const { connectToMSSQL } = require('../config/mssqlDB');

let getDeXuatChuyenXe = async (req, res) => {
    let pool;
    try {
        pool = await connectToMSSQL();
        const result = await pool.request().query('SELECT TOP(3) NguoiDaiDien AS "Ten", MaQuan AS "Buoi" FROM DOITAC');
        console.log(result.recordset);
        const TuyenXes = result.recordset.map(record => ({
            Ten: record.Ten,
            Buoi: record.Buoi
        }));

        console.log('TuyenXes:', TuyenXes);

        return res.render('pages/home.ejs', { TuyenXes: TuyenXes, selectedOption: 'sql' }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).send('Internal Server Error');
        // Send the query result back as a response
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

let GetLoginPage = async (req, res) => {
    return res.render('pages/loginPage.ejs', { selectedOption: 'nosql' });
}

module.exports = {
    getDeXuatChuyenXe,
    GetLoginPage
};
