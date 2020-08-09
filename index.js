const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//crando la aplicacion
const app = express();

//coneccion a la base de datos
dbConection();

//cors

app.use(cors());

//archivos staticos y publicos
app.use(express.static('public'));


//lectura y parseo del body

app.use(express.json());


//api auth

app.use('/api/auth', require('./routes/auth'));

//api event

app.use('/api/events', require('./routes/events'));


//creando el servidor

app.listen(process.env.PORT, () =>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});