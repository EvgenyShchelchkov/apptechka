const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/signin', authController.signin);
authRouter.post('/signup', authController.signup);
authRouter.get('/signout', authController.signout);

module.exports = authRouter;
