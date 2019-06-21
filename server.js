require('dotenv').config();
require('./db/db');
const port = 9000;
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const cors          = require('cors');

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('short'));

app.use('/auth', authController);
app.use('/user', userController);




app.listen(port, () => {
    console.log("listening on port: " + port);
});