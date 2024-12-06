const models = require('../../db/models');

class FavoriteService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getFavorites() {
    return this.#db.Favorite.findAll({
      include: [
        {
          model: this.#db.MedicineInstance,
          include: [
            {
              model: this.#db.Medicine,
            },
            {
              model: this.#db.MedKit,
            },
          ],
        },
      ],
    });
  }

  async getOneMedicine(id) {
    return this.#db.Favorite.findOne({
      where: { id },
      include: [
        {
          model: this.#db.MedicineInstance,
          include: [
            {
              model: this.#db.Medicine,
            },
            {
              model: this.#db.MedKit,
            },
          ],
        },
      ],
    });
  }

  async deleteMedicine(id) {
    return this.#db.Favorite.destroy({
      where: { id },
    });
  }
}

module.exports = new FavoriteService(models);
