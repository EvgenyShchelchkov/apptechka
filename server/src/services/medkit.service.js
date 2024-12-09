const models = require('../../db/models');

class MedkitService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getAllMedkits() {
    return this.#db.MedKit.findAll({
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
    return this.#db.MedKit.create(data);
  }

  async updateMedkit(id, data) {
    const medkit = await this.#db.MedKit.findByPk(id);
    return await medkit.update(data);
  }

  async deleteMedkit(id) {
    return await this.#db.MedKit.destroy({ where: { id } });
  }
}

module.exports = new MedkitService(models);
