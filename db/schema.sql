drop database if exists employee_db;
create database employee_db;

use employee_db;

create table department (
    id int not null auto_increment primary key,
    department_name varchar(30) not null
    );




create table role_type ( 
    id int not null auto_increment primary key,
    roleName varchar(30) not null,
    salary decimal not null,
    roleDepartment int not null,
    foreign key (roleDepartment)
    references department(id)
    on delete cascade
    );


create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    manager_name varchar(30),
    role_id int not null,
    foreign key (role_id)
    references role_type(id)
    on delete cascade
);