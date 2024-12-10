const tokenRouter = require('express').Router();
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

tokenRouter.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: res.locals.user, accessToken });
});

module.exports = tokenRouter;
