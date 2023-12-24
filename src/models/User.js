//importo modelo y esquema
const {Schema, model} = require('mongoose')
//importar bcrypt
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    },token:{
        type:String,
        default:null
    },confirmEmail:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    //establecer los saltos para encriptar el ususraio
    const salt = await bcrypt.genSalt(10)
    //encripotar el password
    const passwordEncryp = await bcrypt.hash(password,salt)
    //retornar contraseña
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    //metodo para comparar
    const response = await bcrypt.compare(password,this.password)
    //retornar el bo0leano
    return response
}
// Método para crear un token 
userSchema.methods.crearToken = function(){
    return token = this.token = Math.random().toString(36).slice(2)
}

//exportar el modelo
                        //igualdad de nombres
module.exports = model('user',userSchema)

