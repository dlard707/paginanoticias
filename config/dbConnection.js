
const { Pool } = require('pg');

const client = new Pool({
    connectionString: process.env. DATABASE_URL || 'postgres://fpgqqwyqkexegc:d18376f75bd998d55fdb49e5e2b9cd7b7bb9f839cfdf1024aa04bcf5f220810a@ec2-34-233-105-94.compute-1.amazonaws.com:5432/d9uohq49lhf27r',
    ssl: {
        rejectUnauthorized: false
    }
});

//teste de conexão com o banco de dados
// async function connectTeste() {
//     const res = await client.query(
//         'SELECT $1::text as message', ['Hello world!'], (err, res) => {
//             console.log(res.rows[0].message);
//         }      
//     );
// }

// connectTeste();

module.exports = client;