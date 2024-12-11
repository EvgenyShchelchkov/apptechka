const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookiesConfig');
const userService = require('../services/user.services');

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const user = await this.#service.getUser(email);

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ error: 'Неверный email или пароль' });
      }

      delete user.password;

      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      console.error('Error in signin:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  signup = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const [user, created] = await this.#service.getNewUser(name, email, password);

      if (!created) {
        return res.status(400).json({ error: 'User already exists' });
      }

      delete user.password;

      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      console.error('Error in signup:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  signout = (req, res) => {
    res.clearCookie('refreshToken').sendStatus(200);
  };
}

module.exports = new AuthController(userService);
