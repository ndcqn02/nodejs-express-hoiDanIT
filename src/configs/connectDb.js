// get the client
import mysql from 'mysql2/promise';

// create the connection to database
console.log('Creating connection to pool ...');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "12345",
  database: 'nodejs'
});



export default pool;