const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log(user)
    if(roles.includes(user.role)) {
      next();
    } else {
      next(
        boom.forbidden(
          `El usuario no tiene permiso de realizar esa acción, solo tiene permisos de ${user.role}`
        )
      );
    }
  }
}

module.exports = { checkApiKey, checkRoles };
