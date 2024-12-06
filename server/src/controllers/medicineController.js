const medicineService = require('../services/medicine.service');

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
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  getOneMedicine = async (req, res) => {
    const { id } = req.params;
    try {
      const medicine = await this.#service.getOneMedicine(id);
      res.status(200).json(medicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  createMedicine = async (req, res) => {
    try {
      const data = req.body;
      const newMedicine = await this.#service.createMedicine(data);
      res.status(200).json(newMedicine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
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
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
      await this.#service.deleteMedicine(id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };
}

module.exports = new MedicineController(medicineService);
