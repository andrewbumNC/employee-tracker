const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require("./connection/connection")

const whatToDo = () => {
    inquirer
        .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'whatToDo',
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Update Employee', 'Quit']

        }])
        .then((pathChoosen) => {
            const userPath = pathChoosen.whatToDo
            const userOptions = ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Update Employee', 'Quit']

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
            } else if (userPath === userOptions[6]){
                updateEmployee()
            } else {
                return
            }
        })
}

//------------------- VIEW and ADD EMPLOYEES  ------------------------------

//view
const viewEmployees = () => {
    
    const sql = `SELECT employee.id AS employee_ID, employee.first_name, employee.last_name, role_type.roleName AS title, role_type.salary, employee.manager_name
FROM employee
JOIN role_type ON employee.role_id = role_type.id;`
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results)
        whatToDo()
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
        whatToDo()
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
        whatToDo()
    })
}

const addRole = () => {
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
        whatToDo()
    });
}



//------------------- VIEW and ADD DEPARTMENT  ------------------------------

//VIEW
const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results)
        whatToDo()
    })
}

//ADD
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
        whatToDo()
    })
}


// ------------------------------UPDATE EMPLOYEE ----------------------------------
function updateEmployee() {

//pull current employee and role list
    const sqlEmployee = `SELECT employee.id AS employee_ID, employee.first_name, employee.last_name, role_type.roleName AS title, role_type.salary, employee.manager_name
FROM employee
JOIN role_type ON employee.role_id = role_type.id;`

    const sqlRole = `SELECT role_type.id AS role_ID, role_type.roleName AS Title, role_type.id as Role_ID, role_type.salary, department.department_name
FROM role_type 
JOIN department ON role_type.roleDepartment = department.id`;


     
    db.query(sqlEmployee, (err, results) => {
        if (err) {
            console.log(err)
        }
        const nameArray = [];

        for (i = 0; i < results.length; i++) {
            nameArray.push({
                name: `${results[i].first_name} ${results[i].last_name}`,
                value: results[i].employee_ID,
            });
        }

        const roleNames = [];
        db.query(sqlRole, (err, results) => {
            if (err) {
                console.log(err)
            }
            console.log(results)

            for (i = 0; i < results.length; i++) {
                roleNames.push({
                    name: results[i].Title,
                    value: results[i].role_ID,
                })
            }
            employeeChoices(nameArray, roleNames)
        })
    })
}

const employeeChoices = (namesWSpaces, roleNames) => {
    inquirer
        .prompt([{
                type: 'list',
                message: 'Which employee do you want to update?',
                name: 'employeeChoice',
                choices: namesWSpaces
            },
            {
                type: 'list',
                message: 'Which role are you switching your employee to?',
                name: 'roleChoice',
                choices: roleNames
            }
        ])
        .then((employeeToUpdate) => {
            const {
                employeeChoice,
                roleChoice
            } = employeeToUpdate;

            console.log(employeeToUpdate)

            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`

            db.query(sql, [roleChoice, employeeChoice], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(results)
                    whatToDo()
                }
            })
        })
}


whatToDo()