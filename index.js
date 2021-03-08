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
  password: process.env.mysqlpw,
  
  database: 'employees_db'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting')
  }
  console.log(`connected as id ${connection.threadId}`);
  //runSearch();
});


connection.query("SELECT * from role", function (error, res) {
  showroles = res.map(role => ({ name: role.title, value: role.id }))
})
connection.query("SELECT * from department", function (error, res) {
  showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
})
connection.query("SELECT * from employee", function (error, res) {
  // console.log(error, res);
  showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
})


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
function viewRoles() {
  connection.query("SELECT * from role", function (error, res) {
    console.table(res);
    firstMenu();
  })
};

//view Employee
function viewEmploy() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function (error, res) {
      console.table(res);
      firstMenu();
    })
}
function addDepartment() {
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

        firstMenu();
      }
    );
  });
};


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
      name: 'id',
      choices: showdepartments
    }
  ]).then(function (response) {

    aaddRole(response);
  });
};

function aaddRole(data) {
  connection.query("INSERT INTO role SET ?", {
    title: data.title,
    salary: data.salary,
    department_id: data.id
  }, function (error, res) {
    // console.log(error, res);
    if (error) throw error;
    firstMenu();
  });
};

//function for adding an Employee
function addEmploy() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the employee's title?",
      name: "title",
      choices: showroles
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: showemployees,
    }
  ]).then(function (response) {
    aaddEmploy(response);
  });
};

// add Employ
function aaddEmploy(data) {
  connection.query("INSERT INTO employee SET ?",
    {
      first_name: data.firstName,
      last_name: data.lastName,
      role_id: data.title,
      manager_id: data.manager
    }, function (error, res) {
      if (error) throw error;
    });
  firstMenu();
};

///function update employee role
function updateEmploy() {
  
    //need to find out which employee's role needs to be updated
    inquirer.prompt([
      {
        type: 'list',
        message: 'For Which employee would you like to update the role?',
        name: 'empId',
        //need to put a function here that will retrieve the employees and print them out as a choice
        choices: showemployees
      },
      {
        type: "list",
        message: "What is the employee's new role?",
        name: "titleId",
        choices: showroles
      }

    ]).then(function (response) {
      aupdateEmploy(response);

    });
  }


//catches data from inquirer response for employeeRole update

function aupdateEmploy(data) {
  connection.query(`UPDATE employee SET role_id = ${data.titleId} WHERE id = ${data.empId}`,
    function (error, res) {
       console.log('Employee role has been updated');
      if (error) throw error;
    });
  firstMenu();
}


firstMenu();
