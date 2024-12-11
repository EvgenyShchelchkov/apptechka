const medicineController = require('../controllers/medicineController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');
const medicineRouter = require('express').Router();

medicineRouter
  .route('/')
  .get(medicineController.getAllMedicines)
  .post(verifyAccessToken, upload.single('file'), medicineController.createMedicine);

medicineRouter
  .route('/:id')
  .get(medicineController.getOneMedicine)
  .put(verifyAccessToken, medicineController.updateMedicine)
  .delete(verifyAccessToken, medicineController.deleteMedicine);

module.exports = medicineRouter;
