const favoriteService = require('../services/favorite.service');

class FavoriteController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getFavorites = async (req, res) => {
    try {
      const favorites = await this.#service.getFavorites();
      res.status(200).json(favorites);
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

module.exports = new FavoriteController(favoriteService);
