const { createDriver } = require('../config/neo4jDB');

let gethomepage = async (req, res) => {
    var driver = createDriver();
    var session = driver.session();

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
    return res.render('pages/loginPage.ejs', {selectedOption: 'nosql' });
}

let GetDatVePage = async (req, res) => {
    return res.render('pages/DatVe.ejs', {selectedOption: 'nosql' });
}

module.exports = {
    gethomepage,
    GetLoginPage,
    GetDatVePage
}
