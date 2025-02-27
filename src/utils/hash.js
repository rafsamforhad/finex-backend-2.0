const bcrypt = require("bcrypt");

// Hash a string synchronously with bcrypt
const convertHash = (string) => {
  // Use at least 10 salt rounds for security
  return bcrypt.hashSync(string, 10);
};

// Compare a string with a hashed string
const compareHash = (string, hashString) => {
  return bcrypt.compareSync(string, hashString);
};

module.exports = { convertHash, compareHash };