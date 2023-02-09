const Admin = require("../models/admin.model");
const { CustomerModel } = require("../models/customer/customer.model");
const { EditCustomerModel } = require("../models/customer/edit-customer.model");

const adminController = {};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.allCustomer = async (req, res, next) => {
    var result = await Admin.getAllCustomers(req.user.id);
    result.success == true ? res.Ok(result.data) : res.BadRequest(result.data,"Something went wrong.");
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.getCustomer = async (req, res, next) => {
    var result = await Admin.getCustomer(req.query.id);
    result.success == true ? res.Ok(result.data[0]) : res.BadRequest(result.data,"Something went wrong.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.createCustomer = async (req, res, next) => {
    var model = new CustomerModel(req.body);
    model.userId = req.user.id;
    if (!model.validate()) return res.BadRequest({},"All fields are required.");
    const result = await Admin.createCustomer(model);
    result.success == true ? res.Ok({}, "Customer added.") : res.BadRequest(result.data,"Error adding customer.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.editCustomer = async (req, res, next) => {
    var model = new EditCustomerModel(req.body);
    model.userId = req.user.id;
    if (!model.validate()) return res.BadRequest({},"All fields are required.");
    const result = await Admin.editCustomer(model);
    result.success == true ? res.Ok({}, "Customer updated.") : res.BadRequest(result.data,"Error updating customer.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.createPickup = async (req, res, next) => {
    if(req.query.cid&&req.query.num){
        const result = await Admin.createPickup(req.query.cid,req.query.num);
        if(result.success){
            return res.Ok(result.data);
        }
    }
    res.BadRequest({},"Error adding pickup.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.getPickup = async (req, res, next) => {
    if(req.query.cid){
        const result = await Admin.getPickups(req.query.cid);
        if(result.success){
            return res.Ok(result.data);
        }
    }
    res.BadRequest({},"Error fetching pickup.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.updatePickup = async (req, res, next) => {
    if(req.body){
        const result = await Admin.updatePickup(req.body.e);
        if(result.success){
            return res.Ok(result.data);
        }
    }
    res.BadRequest({},"Error adding pickup.");
}




/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
adminController.exportCustomers = async (req, res, next) => {
    const xlsx = require("xlsx");
    var result = await Admin.getAllCustomers();
    if (result.success == true) {
        var arr=[];
        arr.push(["Name","Email","Phone","Note","Today's Pickup","meals"]);
        result.data.map(x=>{arr.push([x.name,x.email,x.phone,x.note,x.todaysPickup,x.meals])});
        
        var worksheet = xlsx.utils.aoa_to_sheet(arr),
            workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Users");
        var name = (new Date()).getMilliseconds() + "_export_customer.xlsx";
        xlsx.writeFile(workbook,"public/"+name );
        res.Ok(name);
    }else{
        res.BadRequest();
    }
}

module.exports = adminController;