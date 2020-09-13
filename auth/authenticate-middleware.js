/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authError = { you: 'shall not pass!' };

  try {
    // const token = req.headers.authorization;
    const token = req.cookies.token;

    console.log(token);

    if (!token) {
      return res.status(401).json(authError);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json(authError);
      }

      req.token = decoded;

      // res.setHeader('Authentication', decoded);
      next();
    });
  } catch (error) {
    next(error);
  }
};
