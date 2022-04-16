const validateToken = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization;
        if (!token || token !== process.env.SECRET_KEY) {
            throw new Error('Invalid authorization')
        }
        next();
    } catch (e) {
        return res.send({
            status: 403,
            message:'Invalid authorization'
        })
    }
 };

module.exports = {
    validateToken
}