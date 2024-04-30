const neo4j = require('neo4j-driver');

// Hàm thiết lập kết nối đến Neo4j
function createDriver() {
    const uri =  'bolt://localhost:7687'; // Thay đổi URI tại đây
    const user = 'neo4j'; // Thay đổi Username tại đây
    const password = '12345678'; // Thay đổi Password tại đây
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        database: 'qlhv'
    });
    return driver;
}

module.exports = { createDriver };
