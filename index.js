const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const app = express();
//setting up express to use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//creaete questioning thread through inquirer with corresponding  then statements to direct to the correct functions once passed through a switch statement
function firstMenu() {
  // not sure if this is needed const Promptmenu = () =>
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menu',
      choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'View a Department', 'View Roles', 'View Employees', 'Update Employee role', 'Finished']
    }
  ]).then(function (response) {
    if (response.menu === 'Add a Department') {
      addDepartment();
    } else if (response.menu === 'Add a Role') {
      addRole();
    } else if (response.menu === 'Add an Employee') {
      addEmploy();
    } else if (response.menu === 'View a Department') {
      viewDept();
    } else if (response.menu === 'View Roles') {
      viewRoles();
    } else if (response.menu === 'View Employees') {
      viewEmploy();
    } else if (responses.menu === 'Update Employee role') {
      updateEmploy();
    } else {
      console.log('Please log in again to interact with the Employee database')
    };

  });
};
firstMenu();
