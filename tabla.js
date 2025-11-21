import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'pizza',
    port: process.env.PORT || 3306,
    connectionLimit:10,
    connectTimeout:10000,
    queueLimit: 0,
});
export default pool;