const models = require('../../db/models');

class FavoriteService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  getAll() {
    return this.#db.Favorite.findAll({
      include: [
        {
          model: this.#db.User,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  createOne({ user_id, medicine_instance_id }) {
    if (!user_id || !medicine_instance_id) {
      throw new Error('Не все обязательные поля заполнены');
    }

    return this.#db.Favorite.create({
      user_id,
      medicine_instance_id,
    });
  }

  deleteOne({ id }) {
    if (!id) {
      throw new Error('ID лекарства не указана');
    }

    return this.#db.Favorite.destroy({
      where: { id },
    });
  }
}

module.exports = new FavoriteService(models);
