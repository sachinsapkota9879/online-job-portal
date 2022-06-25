const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (token === undefined) {
    return res.json({
      message: 'Access Denied! Unauthorized User',
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
      if (err) {
        res.json({
          message: 'Invalid Token...',
        });
      } else {
        req.body = authData;
      }
    });
  }
  next();
};

module.exports = verifyToken;
