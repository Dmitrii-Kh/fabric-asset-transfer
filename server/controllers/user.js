const {caClient, wallet } = require("../utils");
const { registerAndEnrollUser } = require("../utils/CAUtil")


const register = async (req, resp) => {
    if (!req.body.hasOwnProperty('username')) {
        resp.send({
            status: 400,
            message: "Request must contain a username"
        })
    } else {
        try {
            const registerResult = await registerAndEnrollUser(caClient, await wallet, process.env.MSP_ORG, req.body.username, process.env.AFFILICATION);
            resp.send({
                status: 200,
                message: registerResult
            })
        } catch (e) {
            resp.send({
                status: e.status,
                message: e.message,
            })
        }
    }
}


module.exports = {
    register,
}