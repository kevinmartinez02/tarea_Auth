const userModel = require('../model/userModel')

const getUser = async (req, res,next) =>{
    try {
        const {id} = req
        const result = await userModel.getUser(id)
        if(!result.success){
            const error = new Error(result.message);
            error.status = 404;
            throw error;
        }
        return res.status(200).json(result.data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser
}