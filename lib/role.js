class Role {
    constructor(roleName, salary, roleDepartment) {
        this.roleName = roleName;
        this.salary = salary;
        this.roleDepartment = roleDepartment;
    }

    getRole() {
        return this.roleName
    }

    getSalary() {
       return this.salary
    }

    getRoleDepartment(){
        return this.roleDepartment
    }

    getAllRole() {
        return ( this.roleName, this.salary, this.roleDepartment )
    }
}




module.exports = Role; 