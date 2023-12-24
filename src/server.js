
//--------------------------importa
const express = require('express')

const path =require('path')

const { engine }  = require('express-handlebars')

const passport = require('passport');
const session = require('express-session');
//imagenes

const fileUpload = require('express-fileupload')


//----------------------------inicializacion

const app = express()

const methodOverride = require('method-override');
require('./config/passport')



//--------------------------------------configuracion 

app.set('port',process.env.port||3000)//por si no lee el puerto especifico

app.set('views',path.join(__dirname,'views'))
//configuraciones extras
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

//-------------------------middlewares
//servidor trabaja con formularios
app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())

//------------------------------variables globales

app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

//----------------------------rutas
//mpo es optimo crear rutas de esta format, revisar archivo de rutas
// app.get('/',(req,res)=>{
//     res.send("server on")
// })

app.use(require('./routers/index.routes'))


app.use(require('./routers/portafolio.routes'))

//rutas de usuario
app.use(require('./routers/user.routes'))


app.get('/',(req,res)=>{
    res.render('index')
})



// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))



//exportar la variable
module.exports = app


