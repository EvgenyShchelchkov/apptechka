const favoriteController = require('../controllers/favoriteController');
const favoriteRouter = require('express').Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');

favoriteRouter.route('/').get(favoriteController.getFavorites);

favoriteRouter
  .route('/:id')
  .get(favoriteController.getOneMedicine)
  .delete(verifyAccessToken, favoriteController.deleteMedicine);

module.exports = favoriteRouter;
