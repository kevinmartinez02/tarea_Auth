const knex = require('../../../config/bd')

const insertNewUser = async (body) => {
    try{
        const resultInsert = await knex('users').insert({
            user_name: body.user_name,
            email: body.email,
            password: body.password,
            role: body.role
        });
        if(resultInsert.length === 0){
            return {
                success: false,
                msg: 'Dont save  the user'
            };
        }
        return {
            success: true,
            msg: 'User saved successfully',
        };

    }catch(error){
        const err = new Error('Error saving user');
        err.stack = error;
        throw err;
    }
}

module.exports = {
    insertNewUser
}