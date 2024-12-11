const medicineController = require('../controllers/medicineController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const upload = require('../middlewares/multer');
const medicineRouter = require('express').Router();

medicineRouter
  .route('/')
  .get(medicineController.getAllMedicines);
  // .post(verifyAccessToken, upload.single('file'), medicineController.createMedicine);

medicineRouter
  .route('/:id')
  .post(verifyAccessToken, upload.single('img'), medicineController.createMedicine)
  .get(medicineController.getOneMedicine)
<<<<<<< HEAD
  .put(medicineController.updateMedicine)
=======
  .put(verifyAccessToken, medicineController.updateMedicine)
>>>>>>> FavoritePage
  .delete(verifyAccessToken, medicineController.deleteMedicine);

module.exports = medicineRouter;
