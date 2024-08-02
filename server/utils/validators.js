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


export const createTaskValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('priority').isIn(['High', 'Medium', 'Low']).withMessage('Priority must be one of High, Medium, Low'),
        body('deadline').isISO8601().withMessage('Deadline must be a valid date in ISO 8601 format'),
    ];
};
