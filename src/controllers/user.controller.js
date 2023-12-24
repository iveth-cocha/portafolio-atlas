//importar modelo
const User = require('../models/User')

const passport = require("passport")

const { sendMailToUser } = require("../config/nodemailer")






//mostrar la vista de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//captura y almacena de registro en la bdd
// const registerNewUser =(req,res)=>{
//     res.send('register new user')
// }
/*const registerNewUser = async(req,res)=>{
    //capturo datos del body
    const{name,email,password,confirmpassword} = req.body
    //vvalidar campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
   
        
    //vvalidar contraseña
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    //ver si el ususario esta registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //crear instancia para el ususario
    const newUser = await new User({name,email,password,confirmpassword})
    //encriptar password
    newUser.password = await newUser.encrypPassword(password)

    //guaradr en la bdd
    newUser.save()

    //llevar a login
    res.redirect('/user/login')
}*/

/*const registerNewUser = async(req,res)=>{
    
    const{name,email,password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    newUser.crearToken()
    newUser.save()
    res.redirect('/user/login')
}*/

const registerNewUser = async(req,res)=>{
    
    const{name,email,password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)
    newUser.save()
    res.redirect('/user/login')
}

const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
//mostrar la vista de login
// const loginUser =(req,res)=>{
//     res.send('login user')
// }
//usando express
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

//captura y almacena de login en la bdd
// const logoutUser =(req,res)=>{
//     res.send('logout user')
// }
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}


module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}

