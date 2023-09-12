const express = require('express');
const mongoos = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const reg_route = require('./src/register_user/reg_route')
const valid_route = require('./src/successfullReg/after_login');
const jwt = require('jsonwebtoken');
const port = process.env.port || 5000;
const MongoDBURl = process.env.MongoDbUrl || 'mongodb://0.0.0.0:27017/UserData'


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(reg_route);

app.use('/successfulLogin', async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'Abdul', function (err, decoded) {
            if (err) {

                return res.json({
                    status: 'Fail',
                    massage: "Not a valid token."
                })
            }
            req.user = decoded.data;
            console.log(req.body)
            next();
        })
    }
    else {
        return res.status(401).json({
            status: 'Fail',
            massage: 'Token not Found'
        })
    }
})
app.use(valid_route);
mongoos.set('strictQuery', false);
mongoos.connect(MongoDBURl, (e, db) => {
    if (e) { console.log("DataBase Error :", e) }
    else { console.log('connected to DB') }
})


app.listen(port, () => console.log(`Server is running on port ${port}`))


