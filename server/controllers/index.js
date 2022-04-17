const userControllers = require('./user');
const assetControllers = require('./asset');

module.exports = {
    ...userControllers,
    ...assetControllers
};
