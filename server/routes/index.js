const Router = require('express');
const userRouter = require('./user');
const assetRouter = require('./asset');
const { validateToken } = require('../middleware');
const router = new Router();

router.use('/user', userRouter);
router.use('/asset', assetRouter);

module.exports = router;