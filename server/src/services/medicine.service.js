const models = require('../../db/models');

class MedicineService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getAllMedicines() {
    return this.#db.Medicine.findAll({
      include: [
        {
          model: this.#db.MedicineInstance,
          include: [
            {
              model: this.#db.MedKit,
            },
          ],
        },
      ],
    });
  }

  async getOneMedicine(id) {
    return this.#db.Medicine.findByPk(id, {
      include: [
        {
          model: this.#db.MedicineInstance,
          include: [
            {
              model: this.#db.MedKit,
            },
          ],
        },
      ],
    });
  }

  async createMedicine(data) {
    return this.#db.Medicine.create(data);
  }

  async createMedicineInstance(data) {
    return this.#db.MedicineInstance.create(data);
  }

  async updateMedicine(id, data) {
    const medicine = await this.#db.Medicine.findByPk(id);
    return await medicine.update(data);
  }

  async deleteMedicine(id) {
    return await this.#db.Medicine.destroy({ where: { id } });
  }
}

module.exports = new MedicineService(models);
