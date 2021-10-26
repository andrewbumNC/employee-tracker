-- SELECT employee.id AS employee_ID, employee.first_name, employee.last_name, role_type.roleName AS title, role_type.salary, employee.manager_name
-- FROM employee
-- JOIN role_type ON employee.role_id = role_type.id;
SELECT role_type.roleName AS Title, role_type.id as Role_ID, role_type.salary, department.department_name
FROM role_type 
JOIN department ON role_type.roleDepartment = department.id






--WHEN I choose to view all roles
--THEN I am presented with the job title, role id, the department that 
--role belongs to, and the salary for that role