//importar el esquema portafolio
const {Schema, model} = require('mongoose')




//crear esquema 
const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
    },
    image:{
        public_id:String,
        secure_url:String
    }
},{
    timestamps:true
})

//exportar el modelo

                        //igualdad de nombres
module.exports = model('portfolio',portfolioSchema)