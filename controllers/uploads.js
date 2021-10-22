const { Content, Company, User } = require('../models')
const cloudinary = require('cloudinary')

const actualizarImgCloudinary = async(req, res) =>{

    const {id, coleccion} = req.params;
    
    let modelo;
  
    switch(coleccion){
        case 'content':
            modelo = await Content.findById(id);
            
            if(!modelo){
                return res.status(400).json({
                    msg: `The content with the id ${id}, doesnt exist`
                })
            }
  
        break;
        case 'company':
            modelo = await Company.findById(id);
            
            if(!modelo){
                return res.status(400).json({
                    msg: `The company with the id ${id}, doesnt exist`
                })
            }
    
        break;
        case 'user':
            modelo = await User.findById(id);
            
            if(!modelo){
                return res.status(400).json({
                    msg: `The user with the id ${id}, doesnt exist`
                })
            }
  
        break;
  
      default:
        return res.status(500).json({ msg: 'There is not collection'})
    };
  
    //Limpiar imagenes previas
    if( modelo.image ){
        //Hay que borrar la imagen del servidor
        const nombreArr = modelo.image.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }
  
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  
    modelo.image = secure_url;
  
    await modelo.save();
  
    res.json(modelo);
}

// const showImg = async(req, res) => {
//     const {id, coleccion} = req.params;
    
//     let modelo;
  
//     switch(coleccion){
//         case 'content':
//             modelo = await Content.findById(id);
            
//             if(!modelo){
//                 return res.status(400).json({
//                     msg: `The content with the id ${id}, doesnt exist`
//                 })
//             }
  
//         break;
//         case 'company':
//             modelo = await Company.findById(id);
            
//             if(!modelo){
//                 return res.status(400).json({
//                     msg: `The company with the id ${id}, doesnt exist`
//                 })
//             }
    
//         break;
//         case 'user':
//             modelo = await User.findById(id);
            
//             if(!modelo){
//                 return res.status(400).json({
//                     msg: `The user with the id ${id}, doesnt exist`
//                 })
//             }
  
//         break;
  
//       default:
//         return res.status(500).json({ msg: 'There is not collection'})
//     };
  
//     //Limpiar imagenes previas
//     if( modelo.image ){
//       //Hay que borrar la imagen del servidor
//       const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.image);
//       if(fs.existsSync( pathImg )){
//         return res.sendFile(pathImg);
//       }
//     }
  
//     const pathNotFound = path.join(__dirname, '../assets/no-image.jpg');
//     res.sendFile(pathNotFound);
    
// }

  
module.exports = {
    actualizarImgCloudinary
}