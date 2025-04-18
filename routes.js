const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');

router.post('/register', [
    body('name',"The name must be of minimum 3 characterslength")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum4characters length").notEmpty().trim().isLength({ min: 4 }),
    ], register);

    router.post('/login',[
        body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum4characters length").notEmpty().trim().isLength({ min: 4 }),
    ],login);

    router.get('/getuser',getUser);

    module.exports = router;