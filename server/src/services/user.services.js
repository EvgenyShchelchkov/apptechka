const modules = require('../../db/models');
const bcrypt = require('bcrypt');

class UserService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  getUser(email) {
    return this.#db.User.findOne({ where: { email } });
  }

  async getNewUser(name, email, password) {
    return this.#db.User.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: await bcrypt.hash(password, 10),
      },
    });
  }
}

module.exports = new UserService(modules);
