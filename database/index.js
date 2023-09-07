const { Client } = require('pg');

const client = new Client({
    host: "dpg-cjs8ev5m702s73f2kkq0-a.ohio-postgres.render.com",
    port: 5432,
    user: "dadmin",
    password: "qtVtZmoemfgNs9bNMnmBOlJa4f4PkdEN",
    database: "daccruedatasets",
    ssl: "no-verify"
});

client.connect();

module.exports = client;