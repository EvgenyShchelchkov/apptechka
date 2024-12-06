const models = require('../../db/models');

class FavoriteService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getFavorites(user_id) {
    return this.#db.Favorite.findAll({
      where: { user_id },
      include: [
        {
          model: Medicine,
          include: [
            {
              model: MedicineInstance,
              include: [
                {
                  model: MedKit,
                },
              ],
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
          model: Medicine,
          include: [
            {
              model: MedicineInstance,
              include: [
                {
                  model: MedKit,
                },
              ],
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
