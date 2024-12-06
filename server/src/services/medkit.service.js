const models = require('../../db/models');

class MedkitService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  getAllMedkits() {
    return this.#db.MedKit.findAll({
      include: {
        model: this.#db.MedicineInstance,
        include: {
          model: this.#db.Medicine,
        },
      },
    });
  }

  async getOneMedkit(id) {
    return this.#db.MedKit.findByPk(id, {
      include: [
        {
          model: this.#db.MedicineInstance,
          include: [
            {
              model: this.#db.Medicine,
            },
          ],
        },
      ],
    });
  }

  async createMedkit(data) {
    const newMedkit = await this.#db.MedKit.create(data);
    return newMedkit;
  }

  async updateMedkit(id, data) {
    const medkit = await this.#db.MedKit.findByPk(id);
    await medkit.update(data);
    return medkit;
  }

  async deleteMedkit(id) {
    await this.#db.MedKit.destroy({ where: { id } });
  }
}

module.exports = new MedkitService(models);
