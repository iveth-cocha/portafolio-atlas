const mongoose = require('mongoose')


//const MONGODB_URI = 'mongodb://localhost:27017/portfolio'
//atlas
const MONGODB_URI = 'mongodb+srv://portafolio:portafolio@cluster0.msoyex9.mongodb.net/?retryWrites=true&w=majority'


connection = async()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected to Mongo DB Atlas")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection