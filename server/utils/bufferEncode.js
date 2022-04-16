const bufferToObject = bufString => JSON.parse(Buffer.from(bufString).toString())

const bufferToString = bufString => Buffer.from(bufString).toString()

module.exports = {
    bufferToObject,
    bufferToString
}