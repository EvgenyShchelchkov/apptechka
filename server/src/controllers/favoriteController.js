const favoriteService = require('../services/favorite.service');

class FavoriteController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getAll = async (req, res) => {
    try {
      const favorites = await this.#service.getAll();
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error in GET /favorites:', error);
      res.status(500).json({ message: 'Ошибка получения избранного' });
    }
  };

  createOne = async (req, res) => {
    try {
      if (!res.locals.user?.id) {
        return res.status(401).json({ message: 'Пользователь не авторизован' });
      }
      const { medicine_instance_id } = req.body;
      const favorite = await this.#service.createOne({
        user_id: res.locals.user.id,
        medicine_instance_id,
      });
      res.status(201).json(favorite);
    } catch (error) {
      console.error('Error in POST /favorite:', error);
      res.status(500).json({ message: 'Ошибка создания избранного' });
    }
  };

  deleteOne = async (req, res) => {
    try {
      if (!res.locals.user?.id) {
        return res.status(401).json({ message: 'Пользователь не авторизован' });
      }
      await this.#service.deleteOne(req.params);
      res.status(200).json({ message: 'Избранное удалено' });
    } catch (error) {
      console.error(error);
      console.error('Error in DELETE /favorite/:id:', error);
      res.status(500).json({ message: 'Ошибка удаления избранного' });
    }
  };
}

module.exports = new FavoriteController(favoriteService);
