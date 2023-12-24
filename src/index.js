
const app = require('./server.js') //importa
const connection = require('./database.js')

require('dotenv').config()

//const { connection } = require('mongoose');

connection()

//ejecutar en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})


