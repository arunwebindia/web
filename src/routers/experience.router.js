const express = require('express');
const { add_experience } = require('../controller/experience.controller');
const upload = require('../middleware/upload');
const experience_router = express.Router();

experience_router.post('/add',upload.single("experience_image"),add_experience)
// experience_router.get('/all');
// experience_router.get('/get_by_id/:id')
// experience_router.patch('/update_by_id/:id')
// experience_router.delete('/delete/:id')

module.exports = experience_router;