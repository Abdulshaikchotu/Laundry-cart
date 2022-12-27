const express = require('express');
const mongoos = require('mongoose');
const bodyParser = require('body-parser');
const reg_route = require('./src/register_user/reg_route')
const port = process.env.port || 5000;


const app = express();
app.use(bodyParser.json());
app.use(reg_route);
mongoos.set('strictQuery', false);
mongoos.connect('mongodb://localhost/UserData', (e,db) => {
    if(e){console.log("DataBase Error :",e)}
    else{console.log('connected to DB')}
})


app.listen(port, ()=>console.log(`Server is running on port ${port}`))