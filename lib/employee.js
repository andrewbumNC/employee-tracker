

class Employee {
    constructor(firstName, lastName, roleid, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleid = roleid;
        this.manager = manager;
    }

    getFirstName() {

    return this.firstName 
    };

    getLastName() {
    return this.lastName
    };

    getRoleID() {
    return this.roleid
    };

    getManager() {
    return this.manager
    };

};

module.exports = Employee;