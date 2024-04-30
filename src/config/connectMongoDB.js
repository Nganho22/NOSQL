const mongoose = require('mongoose');

function connectToMongoDB() {
    // Kết nối đến MongoDB
    return mongoose.connect('mongodb://localhost:27017/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
        });
}

module.exports = { connectToMongoDB };
