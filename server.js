const inquirer = require("inquirer");
const mysql = require('mysql2');
const Employee = require("./lib/employee");
const Department = require("./lib/department");
const Role = require("./lib/role");
const cTable = require('console.table');


const db = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employee_db'
    },

    console.log('Connected to the employee_db database.')
)


const whatToDo = () => {
    inquirer
        .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'whatToDo',
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Update Employee']

        }])
        .then((pathChoosen) => {
            const userPath = pathChoosen.whatToDo
            const userOptions = ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Update Employee']

            if (userPath === userOptions[0]) {
                viewEmployees()
            } else if (userPath === userOptions[1]) {
                addEmployee()
            } else if (userPath === userOptions[2]) {
                viewRoles()
            } else if (userPath === userOptions[3]) {
                addRole()
            } else if (userPath === userOptions[4]) {
                viewDepartments()
            } else if (userPath === userOptions[5]) {
                addDepartment()
            } else {
                updateEmployee()
            }
        })
}

//------------------- VIEW and ADD EMPLOYEES  ------------------------------

//view
const viewEmployees = () => {
    //WHEN I choose to view all employees
    //THEN I am presented with a formatted table showing employee data, including employee  
    // job titles, departments, salaries, 
    const sql = `SELECT employee.id AS employee_ID, employee.first_name, employee.last_name, role_type.roleName AS title, role_type.salary, employee.manager_name
FROM employee
JOIN role_type ON employee.role_id = role_type.id;`
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results)
    })
}

//ADD
const addEmployee = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "firstName",
                message: "What is the employees first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employees last name?"
            },
            {
                type: "input",
                name: "manager",
                message: "What is the employees managers name?"
            },
            {
                type: "input",
                name: "roleid",
                message: "What is the employees role id?"
            },
        ])
        .then((addEmployeeAnswers) => {
            
            const {
                firstName,
                lastName,
                manager,
                roleid
            } = addEmployeeAnswers;

            addToEmployeeTable(firstName, lastName, manager, roleid)

        })
}
const addToEmployeeTable = (firstName, lastName, manager, roleid) => {

    const sql = `INSERT INTO employee (first_name, last_name, manager_name, role_id)
            VALUES (?, ?, ?, ?)`;
            db.query(sql, [firstName, lastName, manager, roleid], (err, result) => {
    
    if (err) {
        console.log(err)
    }
    console.log('success!')
})
}


//------------------- VIEW and ADD ROLE  ------------------------------

const viewRoles = () => {
    const sql = `SELECT role_type.roleName AS Title, role_type.id as Role_ID, role_type.salary, department.department_name
    FROM role_type 
    JOIN department ON role_type.roleDepartment = department.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results)
    })
}

const addRole = () => {
    //name, salary, and department
    inquirer
        .prompt([{
                type: "input",
                name: "roleName",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?"
            }, {
                type: "input",
                name: "roleDepartment",
                message: "What department does this role belong to?"
            }
        ])
        .then((addRoleAnswers) => {

            const {
                roleName,
                salary,
                roleDepartment
            } = addRoleAnswers;
            addToRoleTable(roleName, salary, roleDepartment)

        })
}

const addToRoleTable = (roleName, salary, roleDepartment) => {
    console.log(roleName)
    console.log(salary)
    console.log(roleDepartment)

    const sql = `insert into role_type (roleName, salary, roleDepartment)
   values (?, ?, ?)`;
    db.query(sql, [roleName, salary, roleDepartment], (err, results) => {
        if (err) {
            console.error(err.message)
        }
        console.log('success!')
    });
}



//------------------- VIEW and ADD DEPARTMENT  ------------------------------

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results)
    })
}

const addDepartment = () => {
    inquirer
        .prompt([{
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?"
        }, ])
        .then((addDepartmentAnswer) => {

            const {
                departmentName
            } = addDepartmentAnswer;

            addToDeparmentTable(departmentName)
        })
}
const addToDeparmentTable = (departmentName) => {

    console.log(departmentName)
    const sql = `INSERT INTO department (department_name)
            VALUES (?)`;
    db.query(sql, departmentName, (err, results) => {
        if (err) {
            console.error(err.message)
        }
        console.log('success!')
    })
}











function updateEmployee() {
    const sql = `SELECT employee.id AS employee_ID, employee.first_name, employee.last_name, role_type.roleName AS title, role_type.salary, employee.manager_name
FROM employee
JOIN role_type ON employee.role_id = role_type.id;`

    //list choices like at the top of all the names, do it by pulling database, storing as array in variable. 
    //Once choosen give them an option of role types, same way as above, then IF they choose one role type, update the role ID on the employee. 
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        const firstNameArray = [];
        const lastNameArray = [];
        for (i = 0; i < results.length; i++) {
            firstNameArray.push(results[i].first_name, results[i].last_name); 
        }
        
        const firstAndLast = Array.from({length:firstNameArray.length/2}, (_,i)=>firstNameArray[2*i]+firstNameArray[2*i+1]);
        
let namesWSpaces = [];

        for (i = 0; i < firstAndLast.length; i++){
           namesWSpaces.push(firstAndLast[i].replace(/([A-Z])/g, ' $1').trim())
        }
        employeeChoices(namesWSpaces)
    })
}




const employeeChoices = (namesWSpaces) => {
    inquirer
        .prompt([{
            type: 'list',
            message: 'Which employee do you want to update?',
            name: 'employeeChoice',
            choices: namesWSpaces
        },
        

    ])
        .then((employeeToUpdate) => { 
           
            const {
                employeeChoice
            } = employeeToUpdate;

            console.log(employeeChoice)
            let nameSplit = employeeChoice.split(' ')
            console.log(nameSplit)

            updateEmployeeRole()


        }
        )}

        const updateEmployeeRole






whatToDo()