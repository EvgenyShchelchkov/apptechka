const medkitController = require('../controllers/medkitController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const medkitRouter = require('express').Router();

medkitRouter.route('/').get(medkitController.getAllMedkits).post(medkitController.createMedkit);

medkitRouter
  .route('/:id')
  .get(verifyAccessToken, medkitController.getOneMedkit)
  .delete(verifyAccessToken, medkitController.deleteMedkit)
  .put(verifyAccessToken, medkitController.updateMedkit);

module.exports = medkitRouter;
