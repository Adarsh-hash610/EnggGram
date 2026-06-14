const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://adarshpandey:AdarshBabu@cluster0.5oyhjdy.mongodb.net/EnggGram"
    );
};

module.exports = connectDB;


