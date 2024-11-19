const mysql = require('mysql2')
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'20036803',
    database:'jobPortal'
});
db.connect((error) => {
    if(error){
        console.error('Connection to db failed' + error.stack);
        return;
    }
    console.log('Connected to db');
    
});

module.exports = db;