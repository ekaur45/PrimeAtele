const Account = require("../models/account.model");
const { CreateAccountModel } = require("../models/account/createAccount.model");
const {LoginModel} = require("./../models/account/login.model");
const accountController ={};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
accountController.login = async (req,res,next) =>{
    var model = new LoginModel(req.body);
    if(!model.validate()) return res.BadRequest("All fields are required.");
    const result = await Account.loginAccount(model);
    result.success == true ? res.Ok(result.data) :res.BadRequest(result.data,"Username or password is not correct.");
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
accountController.create = async (req,res,next)=>{
    var model = new CreateAccountModel(req.body);
    if(!model.validate()) return res.BadRequest("All fields are required.");

    const result = await Account.createAccount(model);
    result.success == true ? res.Ok(result.data) :res.BadRequest(result.data);
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
accountController.forgot = async (req,res,next)=>{
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"",
            pass:""
        }
        
    })
    var mailOptions = {from: 'krishna.srinivas@gmail.com', to:'ekaur45@gmail.com', subject:"test", text:"Hello world"};

    transporter.sendMail(mailOptions, function(error, info){if (error) {console.log(error);} else {console.log('Email sent: ' + info);}});
}

module.exports = accountController;