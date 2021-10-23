insert into department (department_name)
    values ("legal"),
            ("finance"),
            ("sales"),
            ("marketing"),
            ("engineering");


    insert into role_type (roleName, salary, roleDepartment)
    values  ("intern", 10000, 3),
            ("account executive", 130000, 3),
            ("developer", 80000, 5),
            ("webinar manager", 65000, 4),
            ("accountant", 80000, 2),
            ("cmo", 250000, 4);


    insert into employee (first_name, last_name, manager_name, role_id)
    values  ("Bill", "Birch", "Test Manager" , 6),
            ("Cat", "Stevens", "Steve Jobs", 3),
            ("Dan", "Darby", "Bill Birch", 1),
            ("Edward", "Edouin", "Michelle Hobbes", 2),
            ("Cat", "Stevens", "Ryan Oshea", 3);


