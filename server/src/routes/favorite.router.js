const favoriteController = require('../controllers/favoriteController');
const favoriteRouter = require('express').Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');

favoriteRouter
  .route('/')
  .get(favoriteController.getAll)
  .post(verifyAccessToken, favoriteController.createOne);

favoriteRouter.route('/:id').delete(verifyAccessToken, favoriteController.deleteOne);

module.exports = favoriteRouter;
