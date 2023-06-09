//jwt ile authorization yetki kontrolu

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ "message": "Not authorized" });
    }
}