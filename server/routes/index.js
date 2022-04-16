const Router = require('express');
const userRouter = require('./user');
const { validateToken } = require('../middleware');
const router = new Router();

router.use('/user', userRouter);

module.exports = router;