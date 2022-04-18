const walletData = require('./walletData');
const bufferEncode = require('./bufferEncode');
module.exports = {
    ...walletData,
    ...bufferEncode,
}