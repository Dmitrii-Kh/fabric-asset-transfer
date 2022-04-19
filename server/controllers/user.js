const {caClient, wallet} = require("../utils");
const {registerAndEnrollUser} = require("../utils/CAUtil")


const register = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('affiliation')) {
            throw {
                status: 400,
                message: "Request must contain username and affiliation fields"
            }
        }
        const { username, affiliation } = req.body;
        const registerResult = await registerAndEnrollUser(caClient, await wallet, process.env.MSP_ORG, username, affiliation);
        res.send({
            status: 200,
            message: registerResult
        })
    } catch (e) {
        res.send({
            status: e.status || 404,
            message: "Request error: " + e.message,
        })
    }
}


module.exports = {
    register,
}