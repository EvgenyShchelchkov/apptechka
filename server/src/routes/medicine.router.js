const medicineController = require('../controllers/medicineController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');

const medicineRouter = require('express').Router();

medicineRouter
  .route('/')
  .get(verifyAccessToken, medicineController.getAllMedicines)
  .post(verifyAccessToken, upload.single('file'), medicineController.createMedicine);

medicineRouter
  .route('/:id')
  .get(verifyAccessToken, medicineController.getOneMedicine)
  .delete(verifyAccessToken, medicineController.updateMedicine)
  .put(verifyAccessToken, medicineController.deleteMedicine);

module.exports = medicineRouter;
