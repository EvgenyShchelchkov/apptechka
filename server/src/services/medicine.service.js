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
    const newMedicine = await this.#db.Medicine.create(data);
    return newMedicine;
  }

  async updateMedicine(id, data) {
    const medicine = await this.#db.Medicine.findByPk(id);
    await medicine.update(data);
    return medicine;
  }

  async deleteMedicine(id) {
    await this.#db.Medicine.destroy({ where: { id } });
  }
}

module.exports = new MedicineService(models);
