const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const apiRouter = require('./routes');

const PORT = process.env.PORT || 3000;
const server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

server.use('/api/v1', apiRouter);

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        process.on('uncaughtException', function (error) {
            process.exit(1)
        });
        process.on('unhandledRejection', function (reason, p) {
            console.error(reason);
        });
    } catch (e) {
        console.log(e)
    }
}

start();

module.exports = server;