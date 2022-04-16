const Router = require('express');
const {register} = require('../controllers')
const router = new Router();

router.post('',  register);

module.exports = router;
