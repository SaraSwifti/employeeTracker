
// function for adding a department

const addDepartment = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you want to add?',
        },
    ]).then(response) {
        app.post('/', (req, res) => {
            console.log(`You sent, ${req.response.name}`);
        });
        // {connection.query(
        //     'INSERT INTO department'
        // )
        //     console.log(`Adding ${response.name} to department catagory`)
        // }

        firstMenu();
    };
};
// function for adding a role

function addRole (){

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

    ]).then(responses => {

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

    ]).then(responses => {

        //now to choice menu for adding another empoloyee or exiting the funciton. 
        firstMenu();
    });
};




//export needed modules
module.exports = Employee;