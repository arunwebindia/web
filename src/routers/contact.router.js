const express = require('express');
const { create_contact, get_contact ,get_contact_by_id,delete_contact} = require('../controller/contact.controller');
const contact_router = express.Router();

contact_router.post('/create',create_contact)
contact_router.get('/get_contact',get_contact);
contact_router.get('/get_contact_by_id/:id',get_contact_by_id)
contact_router.delete('/delete/:id',delete_contact)

module.exports = contact_router;