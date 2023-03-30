const { FORBIDDEN } = require("../utils/errors");
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(FORBIDDEN).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string');
  } catch (err) {
    return res
      .status(FORBIDDEN)
      .send({ message: 'Authorization required' });
  }
  req.user = payload;
  next();
}