const { mysqlExecute, mysqlSelect } = require("../utils/database.util");
const { CustomerModel } = require("./customer/customer.model");


const Admin = {};
/**
 * 
 * @param {CustomerModel} model 
 */
Admin.createCustomer = async (model) =>{
    let query = "call sp_create_customer(?)";
    return mysqlSelect(query,[model.params]);
}

Admin.getAllCustomers = async ()=>{
    let query = "call sp_get_customers()";
    var result = await mysqlSelect(query,[]);
    return result;
}
module.exports = Admin;