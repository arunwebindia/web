const express = require('express')
const dotenv = require('dotenv')
const db_connection = require('./dbConnect/db.connect');
const path = require('path');
const cors = require('cors');
const user = require('./routers/user.router')
const contact = require('./routers/contact.router');
const experience_router = require('./routers/experience.router');
const qualification_router = require('./routers/qualification.router');
const service_router = require('./routers/services.router');
const skill_router = require('./routers/skill.router');
const social_router = require('./routers/social.router');
const work_router = require('./routers/working.router');

const app = express();
dotenv.config();
db_connection(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.use('/api/v1/contact',contact);
app.use('/api/v1/experience',experience_router);
app.use('/api/v1/qualification',qualification_router);
app.use('/api/v1/services',service_router);
app.use('/api/v1/skill',skill_router);
app.use('/api/v1/social',social_router);
app.use('/api/v1/user',user);
app.use('/api/v1/work',work_router);

app.use(express.static(path.join(__dirname, './view/build')));
app.use('/upload', express.static(path.join(__dirname, '../public/image')));
app.use('/', (_, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'));
});

module.exports = app;