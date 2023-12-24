//importar
const cloudinary = require('cloudinary').v2

//configurar
/*cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
})*/


//mi forma ya que la otra no valio
cloudinary.config({ 
  cloud_name: 'dnw2wcyzw', 
  api_key: '441749726854371', 
  api_secret: '76iPvQ78nqmNlfVUSdLH0fBbPJE',
  secure: true
});


module.exports.uploadImage = async(filePath) => {

    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
    
}
//eliminar imagen
module.exports.deleteImage = async (publicId)=>{
    
  return await cloudinary.uploader.destroy(publicId)
}