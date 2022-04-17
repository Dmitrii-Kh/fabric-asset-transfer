const Router = require('express');
const {create, get} = require('../controllers')
const router = new Router();

router.post('',  create);
router.get('',  get);

module.exports = router;
