const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'SaraSwifti!12',
    database: 'employees_db'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('error connecting')
    }
    console.log(`connected as id ${connection.threadId}`);
    //runSearch();
  });