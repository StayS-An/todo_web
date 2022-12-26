const jwt = require('jsonwebtoken');

module.exports = (jwtKey) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
    
            if (!token) {
                return res.status(401).json();
            }
    
            req.user = jwt.verify(token, jwtKey);
            next();
        } catch (e) {
            return res.status(401).json();
        }
    }
}