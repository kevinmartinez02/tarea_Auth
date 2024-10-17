const knex = require('../../../config/bd');

const getUser = async (id) =>{
    try{
        const resultFound = await knex('users').where({id: id}).select('*').first();
        if(!resultFound){
            return {
                success : false,
                message : 'User not found'
            }
        }
        return {
            success : true,
            data : resultFound
        }
    }catch(error){
        throw {
            message: 'Error while getting user',
            stack : error,
            status : 500
        }
        
    }
}

module.exports = {
    getUser
}