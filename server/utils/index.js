const wallets = require('./wallets');
const bufferEncode = require('./bufferEncode');
module.exports = {
    ...wallets,
    ...bufferEncode,
}