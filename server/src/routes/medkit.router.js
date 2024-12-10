const medkitController = require('../controllers/medkitController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const medkitRouter = require('express').Router();

medkitRouter
  .route('/')
  .get(medkitController.getAllMedkits)
  .post(verifyAccessToken, medkitController.createMedkit);

medkitRouter
  .route('/:id')
  .get(medkitController.getOneMedkit)
  .delete(verifyAccessToken, medkitController.deleteMedkit)
  .put(verifyAccessToken, medkitController.updateMedkit);

module.exports = medkitRouter;
