const {body} =require('express-validator');

const validateInput = ()=>{
    return [
        body('user_name').notEmpty().withMessage('The user name is required')
        .isString().isLength({min: 3}),
        body('email').notEmpty().withMessage('The email is required').isEmail().withMessage('The email is invalid'),

        body('password').notEmpty().withMessage('The passworod is required').isString().isLength({min: 6}),
        body('role').notEmpty().withMessage('The role is required').isString().isLength({min: 3})
    ]
}
module.exports = {
    validateInput
}