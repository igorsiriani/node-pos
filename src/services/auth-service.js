const jwt = require('jsonwebtoken');

exports.generateToken = async(data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: "2d"});
}

exports.decodeToken = async(token) => {
    const data = await jwt.verify(toke, global.SALT_KEY);
    return data;
}

// funcao de middleware
exports.authorize = async(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decode) => {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido',
                    erro: error
                });
            } else {
                next();
            }
        });
    }
}