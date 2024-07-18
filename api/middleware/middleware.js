const Users = require('../users/users-model');



function logger(req, res, next) {
  // DO YOUR MAGIC
  const method = req.method;
  const url = req.originalUrl;
  const date = new Date();
  console.log(`[${date}] ${method} to ${url}`);
  next();

}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.findById(req.params.id);
  if (user) {
    req.user = user;
    next();
  } else {
    next({ status: 404, message: "user not found"});
  }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (name !== undefined && typeof name === 'string' && name.trim().length) {
    next();
  } else {
    next({ status: 400, message: "missing require name field"});
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (text !== undefined && typeof text === 'string' && text.trim().length) {
    next();
  } else {
    next({ status: 400, message: "missing required text field"});
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost, 
}