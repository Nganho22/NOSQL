const sql = require('mssql/msnodesqlv8');

const config = {
    user: 'sa',
    password: '123456',
    server: 'ABC1',
    database: 'FUTA',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    }
};

async function connectToMSSQL() {
    try {
        const pool = await new sql.ConnectionPool(config).connect();
        console.log("Connected to MSSQL");
        return pool;
    } catch (err) {
        console.error("Database Connection failed! Bad config: ", err);
        throw err; // Make sure to handle this error appropriately in your application
    }
}

module.exports = {
    sql,
    connectToMSSQL
};
