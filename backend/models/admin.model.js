const { mysqlExecute, mysqlSelect } = require("../utils/database.util");
const { CustomerModel } = require("./customer/customer.model");
const { EditCustomerModel } = require("./customer/edit-customer.model");


const Admin = {};
/**
 * 
 * @param {CustomerModel} model 
 */
Admin.createCustomer = async (model) =>{
    let query = "call sp_create_customer(?)";
    return mysqlSelect(query,[model.params]);
}

/**
 * 
 * @param {EditCustomerModel} model 
 */
Admin.editCustomer = async (model) =>{
    let query = "call sp_update_customer(?)";
    return mysqlSelect(query,[model.params]);
}

Admin.getAllCustomers = async (id)=>{
    let query = "call sp_get_customers(?)";
    var result = await mysqlSelect(query,[id]);
    return result;
}
Admin.getCustomer = async (id)=>{
    let query = "select * from customer where id =?";
    var result = await mysqlSelect(query,[id],false);
    return result;
}

Admin.createPickup = async (cid,num) =>{
    let query = "call sp_create_pickup(?);";
    var result = await mysqlSelect(query,[[cid,num]]);
    return result;
}
Admin.getPickups = async (cid)=>{
    let query = "call sp_get_pickups(?);";
    var result = await mysqlSelect(query,[cid]);
    return result;
}
Admin.updatePickup =async (d)=>{
    let query = "call sp_update_pickups(?);";
    var result = await mysqlSelect(query,[[d.id,d.customerid,d.pickup,new Date(d.enrtydate).toISOString().split('.')[0]]]);
    return result;
}
module.exports = Admin;