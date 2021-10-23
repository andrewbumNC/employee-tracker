const inquirer = require("inquirer");
const mysql = require('mysql2');
const Employee = require("./lib/employee");
const Department = require("./lib/department");
const Role = require("./lib/role");
const cTable = require('console.table');

const db = mysql.createConnection( 
    {

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
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']

        }])
        .then((pathChoosen) => {
            const userPath = pathChoosen.whatToDo
            const userOptions = ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']

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
            } else{ 
                addDepartment()
            }
        })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },{
            type: "input",
            name: "role",
            message: "What is the employees role?"
        },{
            type: "input",
            name: "manager",
            message: "What is the employees managers name?"
        },
    ])
    .then((addEmployeeAnswers) => {
        console.log(addEmployeeAnswers)
        const {firstName, lastName, role, manager} = addEmployeeAnswers;
        const employeeClass = new Employee(firstName, lastName, role, manager)
       console.log(employeeClass)

    })
}

const addRole = () => {
//name, salary, and department
    inquirer
        .prompt([
            {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },{
            type: "input",
            name: "roleDepartment",
            message: "What department does this role belong to?"
        }
    ])
    .then((addRoleAnswers) => {

        const {roleName, salary, roleDepartment} = addRoleAnswers;
        // const roleClass = new Role(roleName, salary, roleDepartment);
        
       
        addToRoleTable(roleName, salary, roleDepartment)

    })
}

const addDepartment = () => {
    inquirer
    .prompt([
        {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?"
    },
])
.then((addDepartmentAnswer) => {



    const {departmentName} = addDepartmentAnswer;
    
    const departmentClass = new Department(departmentName);

    
    addToDeparmentTable(departmentClass)
})  
}
const addToDeparmentTable = (departmentClass) => {

    console.log(departmentClass.getDepartment())
const sql = `INSERT INTO department (department_name)
            VALUES (?)`;
db.query(sql, departmentClass.getDepartment(), (err, results) => {
    if (err) {
        console.error(err.message)
    }
   console.log('success!')
} )
}

const addToRoleTable = (roleName, salary, roleDepartment) => {
  

//    const {roleName, salary, roleDepartment} = roleClass;
   console.log(roleName)
   console.log(salary)
   console.log(roleDepartment)
   const roleUpdates = [roleName, salary, roleDepartment,]

   const sql = `insert into role_type (roleName, salary, roleDepartment)
   values (?)`;
            db.query(sql, roleUpdates, (err, results) => {
                if (err) {
                    console.error(err.message)
                }
               console.log('success!')
            } );
}




const viewEmployees = () => {
}
const viewDepartments = () => {
    const sql =  `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if(err){
            console.log(err)
        }
        console.table(results)
    })

}
const viewRoles = () => {

   // WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role



}












whatToDo()