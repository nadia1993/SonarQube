const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// User-provided input, without sanitization
const userId = "105 OR 1=1"; // Malicious input

// Vulnerable SQL query
connection.query(`SELECT * FROM users WHERE id = ${userId}`, (error, results) => {
    if (error) throw error;
    console.log(results);
});