const express = require('express')
const dotenv = require('dotenv')
const db_connection = require('./dbConnect/db.connect');
const path = require('path');
const cors = require('cors');
const user = require('./routers/user.router')
const contact = require('./routers/contact.router')


const app = express();
dotenv.config();
db_connection(process.env.DB_URL);


app.use(cors());
app.use(express.json());

app.use('/api/v1/user',user);
app.use('/api/v1/contact',contact);


app.use(express.static(path.join(__dirname, './view/build')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'));
});

module.exports = app;