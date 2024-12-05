const medkitService = require('../services/medkit.service');

class MedkitController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getAllMedkits = async (req, res) => {
    try {
      const medkits = await this.#service.getAllMedkits();
      res.json(medkits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  getOneMedkit = async (req, res) => {
    const { id } = req.params;
    try {
      const oneMedkit = await this.#service.getOneMedkit(id);
      res.status(200).json(oneMedkit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  createMedkit = async (req, res) => {
    try {
      const data = req.body;
      const newMedkit = await this.#service.createMedkit({
        ...data,
        user_id: res.locals.user.id,
      });
      res.status(200).json(newMedkit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера', error });
    }
  };

  deleteMedkit = async (req, res) => {
    try {
      const { id } = req.params;
      await this.#service.deleteMedkit(id);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Ошибка удаления ресторана' });
    }
  };

  updateMedkit = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const update = await this.#service.updateMedkit(id, data);
      res.status(200).json(update);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Ошибка изменения заметки' });
    }
  };
}

module.exports = new MedkitController(medkitService);
