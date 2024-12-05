const medkitController = require('../controllers/medkitController');

const medkitRouter = require('express').Router();

medkitRouter.route('/').get(medkitController.getAllMedkits).post(medkitController.createMedkit);

medkitRouter
  .route('/:id')
  .get(medkitController.getOneMedkit)
  .delete(medkitController.deleteMedkit)
  .put(medkitController.updateMedkit);

module.exports = medkitRouter;
