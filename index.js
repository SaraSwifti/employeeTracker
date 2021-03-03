const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const app = express();
//use this if I do the separate files and import?  const Add = require("./db/add.js");

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
      choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee role', 'Finished']
    }
  ]).then(function (response) {
    if (response.menu === 'Add a Department') {
      addDepartment();
    } else if (response.menu === 'Add a Role') {
      addRole();
    } else if (response.menu === 'Add an Employee') {
      addEmploy();
    } else if (response.menu === 'View Departments') {
      viewDept();
    } else if (response.menu === 'View Roles') {
      viewRoles();
    } else if (response.menu === 'View Employees') {
      viewEmploy();
    } else if (response.menu === 'Update Employee role') {
      updateEmploy();
    } else {
      console.log('Please log in again to interact with the Employee database');
      connection.end();
      process.exit();
    };

  });
};

const addDepartment = () => {

  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department you want to add?',
    },
  ]).then(function (response) {
    let query = "INSERT INTO department (name) VALUES (?)";
    connection.query(
      query,
      response.department,
      (err, res) => {
        if (err) throw err;
        console.log(`The ${(response.department).toUpperCase()} department has been added`)
        // {connection.query(
        //     'INSERT INTO department'
        // )
        //     console.log(`Adding ${response.name} to department catagory`)
        // }

        firstMenu();
      }
    );
  });
}
// view Department function

function viewDept() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log(`DEPARTMENTS:`)
    console.table(res);
    firstMenu();
  });
  
};

///function update employee
function updateEmploy() {

}
firstMenu();
