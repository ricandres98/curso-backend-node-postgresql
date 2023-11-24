const bcrypt = require('bcrypt');

async function verifyPassword () {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$HYBmWJaY5rK1BifguYQM/OsZQ8IdSygkxbSyl3.1BxFF2fMuv0i9m'
  const isMatch = await bcrypt.compare(myPassword, hash)
  console.log(isMatch)
  const rounds = await bcrypt.genSalt(10)
  console.log(rounds)
}

verifyPassword();
