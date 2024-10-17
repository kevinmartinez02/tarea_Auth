const jwt = require('jsonwebtoken');
const knex = require('../config/bd');

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(403).json({ msg: 'You are not authorized to access this route' });
        }

        // Usando la clave secreta desde una variable de entorno
        const decoded = jwt.verify(token, 'secret-key');

        const user_name = decoded.user_name;

        const userFound = await knex('users').where({ user_name: user_name }).first();

        if (!userFound) {
            return res.status(404).json({ msg: 'User not found' });
        }
        req.id = userFound.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token' });
        } else {
            return res.status(500).json({ msg: 'Internal Server Error', error: error.message });
        }
    }
};



module.exports ={
    verifyToken
}
