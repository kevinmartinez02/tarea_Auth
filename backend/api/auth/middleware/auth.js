const bycrypt = require('bcryptjs');
const knex = require('../../../config/bd');
const hashPassword = async (req, res, next) => {
    try{

        const {password} = req.body;
        const passwordHashed = await bycrypt.hash(password, 10);
        req.body.password = passwordHashed;
        next();

    }catch(error){
        next(error);
    }
}
const verifyEmail = async (req, res, next) => {
    try{
        const {email} = req.body;
        const result  = await knex('users').where({email}).first();
        if(result){
            const error = new Error('Email already registered');
            error.status = 400;
            throw error;
        }
        next()
    }catch(error){
        next(error)

    }
}
const verifyUserName = async(req, res, next) => {
    try{
        const {user_name}= req.body;
        const result = await knex('users').where({user_name}).first();
        if(result){
            const error = new Error('User already registered');
            error.status = 400;
            throw error;
        }
        next()
    }catch(error){
        next(error);
    }
}

const verifyPasswordUserName = async (req, res, next) => {
    try{
        const {password,user_name} = req.body;
        const resultFound = await knex('users').where({user_name}).first();

        if(!resultFound){
            const error = new Error('User not found');
            error.status = 400;
            throw error;
        }
        const resultCompare = await bycrypt.compare(password, resultFound.password);
        if(!resultCompare){
            const error = new Error('Invalid password');
            error.status = 400;
            throw error;
        }
        next();
    }catch(error){
        next(error);
    }
}

module.exports = {
    hashPassword,
    verifyEmail,
    verifyUserName ,
    verifyPasswordUserName
}