const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host:'localhost',
    database: 'my_store',
    port: 5432,
    user: 'ricandres',
    password: 'admin123',
  });

  await client.connect((err) =>{
    if(err){
      console.error(err.stack)
    } else {
      console.log('DB conectada');
    }
  });

  return client;
}

module.exports = { getConnection };
