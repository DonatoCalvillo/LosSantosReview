const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.paths = {
            auth        :   '/api/auth'
        }

        //Conexion a la db
        this.conectarDB();

        //Moddlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto ', this.port);
        })
    }

    middlewares(){
        //CORSE sirve para que solo se puedam hacer peticiones
        //desde ciertas paginas web
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(express.json());
        
        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    
}

module.exports = Server