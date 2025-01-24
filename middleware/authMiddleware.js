const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401)
            .json({
                message: "Brak tokentu, autoryzacja zabroniona"
            })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        console.log("Decoded User:", req.user);
        next();
    } catch (error) {
        res.status(401)
            .json({
                message: "Token jest nieprawidłowy"
            })
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403)
                .json({
                    message: "Brak dostępu do tego zasobu"
                })
        }
        next();
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Administrator') {
        return next();
    }
    return res.ststus(403)
    .json({
        message: "Brak uprawnień do tej operacji!"
    })
}


module.exports = { protect, authorize, isAdmin }