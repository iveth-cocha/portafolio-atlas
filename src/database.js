const mongoose = require('mongoose')


const MONGODB_URI = 'mongodb://localhost:27017/portfolio'

connection = async()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection