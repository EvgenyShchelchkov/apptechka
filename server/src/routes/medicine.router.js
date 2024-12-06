const medicineController = require('../controllers/medicineController');

const medicineRouter = require('express').Router();

medicineRouter
  .route('/')
  .get(medicineController.getAllMedicines)
  .post(medicineController.createMedicine);

medicineRouter
  .route('/:id')
  .get(medicineController.getOneMedicine)
  .delete(medicineController.updateMedicine)
  .put(medicineController.deleteMedicine);

module.exports = medicineRouter;
