const { userExist, findUserByEmail, createUser } = require("../user/index");
const { notFound, badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { generateToken } = require("../token");

const register = async ({ name, email, password }) => {
  const hasUser = await userExist(email);

  if (hasUser) {
    throw badRequest("user already exist");
  }
  password = await generateHash(password);
  const user = await createUser({ name, email, password });

  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("invalid credentials");
  }
  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw badRequest("invalid credentials");
  }
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return  accessToken = await generateToken({ payload });

};

module.exports = { register, login };
