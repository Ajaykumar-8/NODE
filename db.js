let mysql = require('mysql2/promise');
let dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function checkDB() {
    try {

        const connection = await pool.getConnection();

        console.log("✅ Database Connected Successfully");

        connection.release();

    } catch (error) {

        console.log("❌ Database Connection Failed");
        console.log(error);

    }
}

checkDB();

module.exports = pool;