import { body } from 'express-validator';

export const registerValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        }),
    ];
};

export const loginValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ];
};
