const express = require('express');
const { add_counter,update_counter } = require('../controller/visit.countroller');
const router = express.Router();

router.post('/add',add_counter);
router.patch('/update',update_counter)

module.exports = router;