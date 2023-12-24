const Portfolio = require('../models/Portfolio')
//importar imagenes
//const { uploadImage } = require('../config/cloudinary')
//elimino imagenes locales
const fs = require('fs-extra')
//eliminar imagen del portafolio 
//ya exitia el unloadimage
const { uploadImage,deleteImage } = require('../config/cloudinary')



//metodo para listar los portafolios
// const renderAllPortafolios = async(req,res)=>{
//     //res.send('Listar todos los portafolios')
//     const portfolios= await Portfolio.find().lean()
//     res.render("portafolio/allPortfolios",{portfolios})
//     /*a forma json
//     res.json({portfolios})*/
// }


const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    res.render("portafolio/allPortfolios",{portfolios})
}

//metodo para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
//metodo para mostrar el formulario
const renderPortafolioForm = (req,res)=>{
    //res.send('Formulario para crear un portafolio')
    res.render('portafolio/newFormPortafolio')
}

//metodo para guardadr en la base de datos lo capturado en el form
// const createNewPortafolio =async (req,res)=>{
//     //sestructurar
//     const {title, category,description} = req.body
//     //nueva intancia
//     const newPortfolio = new Portfolio({title,category,description})
//     //guardo en la base
//     await newPortfolio.save()
//     //muestro resultado
//     //res.json({newPortfolio})
//      res.redirect('/portafolios')
// }


const createNewPortafolio =async (req,res)=>{

    const {title, category,description} = req.body   
    const newPortfolio = new Portfolio({title,category,description})
    newPortfolio.user = req.user._id
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
    await newPortfolio.save()
    res.redirect('/portafolios')
}
  

// const createNewPortafolio = (req,res)=>{
//     //res.send('Crear un nuevo portafolio')
//     console.log(req.body);
//     res.send("Portafolio almacenado en la BDD")
    
// }

//editar
// const renderEditPortafolioForm = (req,res)=>{
//     res.send('Formulario para editar un portafolio')
// }

const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}



//actualizar en la base de datos
// const updatePortafolio = (req,res)=>{
//     res.send('Editar un portafolio')
// }
// const updatePortafolio = async(req,res)=>{
//     const {title,category,description}= req.body
//     await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
//     res.redirect('/portafolios')
// }

const updatePortafolio = async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    //verificar actualizacion de imagen
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        //borrar en cloudinary
        await deleteImage(portfolio.image.public_id)
        //cargar nueva imagen en cloudinary
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //al cambiar la imagen el resto de campos se mantienen igual
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}


//eliminar datos
// const deletePortafolio = (req,res)=>{
//     res.send('Eliminar un nuevo portafolio')
// }
const deletePortafolio = async(req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
    res.redirect('/portafolios')
}


module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}