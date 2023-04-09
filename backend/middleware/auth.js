const ForbiddenError = require("../errors/forbidden-err");
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(`authorization ${authorization}`);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string');
  } catch (err) {
    throw new ForbiddenError('Authorization required');
  }
  console.log(`PAYLOAD ${payload}`);
  req.user = payload;
  next();
}