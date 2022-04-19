const Router = require('express');
const {create, get, transfer, deleteAsset} = require('../controllers')
const router = new Router();

router.post('',  create);
router.get('',  get);
router.put('', transfer);
router.delete('', deleteAsset);

module.exports = router;
