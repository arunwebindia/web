const bcrypt = require("bcrypt");

async function encrypt_password(password) {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

  async function verifyPassword(password, hashedPassword) {
       const match = await bcrypt.compare(password, hashedPassword);
       return match;
  }

module.exports = {encrypt_password,verifyPassword}