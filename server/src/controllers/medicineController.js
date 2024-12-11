const medicineService = require('../services/medicine.service');
const medkitService = require('../services/medkit.service');
const fs = require('fs/promises');
const sharp = require('sharp');

class MedicineController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getAllMedicines = async (req, res) => {
    try {
      const medicines = await this.#service.getAllMedicines();
      res.json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

  getOneMedicine = async (req, res) => {
    const { id } = req.params;
    try {
      const medicine = await this.#service.getOneMedicine(id);
      res.status(200).json(medicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

  // createMedicine = async (req, res) => {
  //   try {
  //     const { med_kit_id, name, description, code, presciption, category, quantity, expiration } =
  //       req.body;
  //     const medKit = await medkitService.getOneMedkit(med_kit_id);
  //     if (!medKit) {
  //       return res.status(404).json({ message: 'Аптечка не найдена' });
  //     }

  //     if (!req.file) {
  //       return res.status(400).json({ message: 'Файл не загружен' });
  //     }

  //     const nameFile = `${Date.now()}.webp`;
  //     const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
  //     await fs.writeFile(`../../public/img_medicines/${nameFile}`, outputBuffer);

  //     const newMedicine = await this.#service.createMedicine({
  //       name,
  //       description,
  //       code,
  //       img: nameFile,
  //       presciption,
  //       category,
  //       user_id: res.locals.user.id,
  //     });

  //     const medicineInstance = await this.#service.createMedicineInstance({
  //       medicine_id: newMedicine.id,
  //       med_kit_id,
  //       quantity,
  //       expiration,
  //     });

  //     res.status(201).json({
  //       message: 'Лекарство добавлено в аптечку',
  //       medicineInstance,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Ошибка сервера' });
  //   }
  // };

  createMedicine = async (req, res) => {
    try {
      const medKitId = req.params.id
      const {  name, description, code, presciption, category, quantity, expiration } = req.body;
  
      // Проверка на наличие med_kit_id
      if (!medKitId) {
        return res.status(400).json({ message: 'ID аптечки не указан' });
      }
  
      const medKit = await medkitService.getOneMedkit(medKitId);
      if (!medKit) {
        return res.status(404).json({ message: 'Аптечка не найдена' });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }
  
      const nameFile = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img_medicines/${nameFile}`, outputBuffer);
  
      // Создание лекарства
      const newMedicine = await this.#service.createMedicine({
        name,
        description,
        code,
        img: `/img_medicines/${nameFile}`,
        presciption,
        category,
        user_id: res.locals.user.id,
      });
  
      // Создание экземпляра лекарства в аптечке
      const medicineInstance = await this.#service.createMedicineInstance({
        medicine_id: newMedicine.id,
        med_kit_id: medKitId,
        quantity,
        expiration,
      });
  
      return res.status(201).json({ message: 'Лекарство успешно создано', medicineInstance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при создании лекарства' });
    }
  };
  

  updateMedicine = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedMedicine = await this.#service.updateMedicine(id, data);
      res.status(200).json(updatedMedicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };

  updateMedicineQuantity = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedQuantity = await this.#service.updateMedicineQuantity(id);
      res.status(200).json({
        message: 'Количество уменьшено на 1',
        data: updatedQuantity,
      });
    } catch (error) {
      console.error('Ошибка при обновлении количества лекарства:', error);
      const statusCode =
        error.message === 'Лекарство закончилось' ||
        error.message === 'Экземпляр лекарства не найден'
          ? 400
          : 500;
      res.status(statusCode).json({ message: error.message || 'Ошибка сервера' });
    }
  };

  deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
      await this.#service.deleteMedicine(id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
}

module.exports = new MedicineController(medicineService);
