const userModel = require('../model/authModel')
const { validationResult } = require('express-validator');
const secret = require('../../../config/auth.config');
const jwt = require('jsonwebtoken');
const {serialize} = require('cookie');
const signUp = async (req, res,next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.status = 400;
      error.stack = errors.array();
      error.message = errors.array();
      return next(error);
    }
    try {
        const resultInsert = await userModel.insertNewUser(req.body);
        if(!resultInsert.success){
            const error = new Error(resultInsert.msg);
            error.status = 400;
            throw error;
        }
        res.status(201).json({
            success: true,
            msg: resultInsert.msg
        });
    } catch (error) {
        next(error);
    }
}

const signIn = async (req, res,next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.status = 400;
      error.stack = errors.array();
      error.message = errors.array();
      return next(error);
    }
    try {
        const {user_name,password} = req.body;
        const token = jwt.sign(
            {  user_name: req.body.user_name ,role: 'user' },
            'secret-key',
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 3600, // Expira en 24 horas
            }
          );
      
          const serealized = serialize('token', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          });
          res.setHeader('Set-Cookie', serealized);
          return res.status(200).json({
            msg: 'Login succesfully',
          });
    } catch (error) {
        next(error);
    }
}

const logout = async (req,res,next)=>{
  try{
    res.clearCookie('token');
    res.status(200).json({
      msg: 'Logout succesfully'
    });

  }catch(error){
    next(error);
  }
}
module.exports = {
    signUp,
    signIn,
    logout
}