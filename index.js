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

function addRole() {

  inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'What is the title of this new role?',
      },
      {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of this new role',
      },
      {
          type: 'list',
          message: 'Which department is this new role in?',
          name: 'menu',
          choices: ['Engineer', 'Intern', 'Finished'],
      }

  ]).then(function(response){

      //now to choice menu for adding another empoloyee or exiting the funciton. 
      firstMenu();
  });
};
//function for adding an Employee
function addEmploy() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'What is the first name of the employee being added?',
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'What is the last name of the employee being added?',
      },
      {
          type: 'list',
          message: 'Which department is this new role in?',
          name: 'menu',
          choices: ['Engineer', 'Intern', 'Finished'],
      }

  ]).then(function(response){

      //now to choice menu for adding another empoloyee or exiting the funciton. 
      firstMenu();
  });
};
// view Department function

function viewDept() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log(`DEPARTMENTS:`)
    console.table(res);
    firstMenu();
  });
  
};
// view Roles
function viewDept(){
  connection.query("SELECT * from role", function (error, res) {
    console.table(res);
    endOrMenu();
  })
};


//view Employee
function viewEmploy(){
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (error, res) {
    console.table(res);
    firstMenu();
  })


// ///function update employee role
// function updateEmploy() {
//   connection.query('SELECT * FROM employee', function(err, res) {
//     if (err) throw (err);
//   //need to find out which employee's role needs to be updated
//   inquirer.prompt([
//     {
//       type: 'list',
//       message: 'Which employee role would you like to update?',
//       name: 'menu',
//       //need to put a function here that will retrieve the employees and print them out as a choice
//       choices: res.map(function(nam) {
// return nam.
//       })
      
//       function() {
//         employeeArray = [];
        
//            res.map(res => {
//                employeeArray.push(
//                    res.last_name
//                );
//            })
//            return employeeArray;
//          }
//     }
//   ]).then
// });

firstMenu();
