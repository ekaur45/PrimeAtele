const { mysqlSelect } = require("../utils/database.util");
const { GetJwt } = require("../utils/jwt.util");
const bcrypt = require("bcrypt");
const { CreateAccountModel } = require("./account/createAccount.model");
const { LoginModel } = require("./account/login.model");
const { functionReturn } = require("./function_return");
/**
 * 
 * @param {LoginModel} data 
 */
const loginAccount = async function (data) {
    let query = 'call sp_get_user_by_email(?);';
    var result = await mysqlSelect(query, [[data.email]]);
    if (result.success == true&&result.data.length>0) {
        const ispasswordCorrect = bcrypt.compareSync(data.password,result.data[0].password);
        if (ispasswordCorrect) {
            let id = result.data[0].id;
            let email = result.data[0].email;
            let token = GetJwt(id, email, "admin");
            result.data[0].token = token;
            delete result.data[0].password;
            return functionReturn(result.data[0]);
        }
    }
    return functionReturn("Username or password is not correct.", false);
}
/**
 * 
 * @param {CreateAccountModel} model 
 * @returns 
 */
const createAccount = async function (model) {
    let query = 'call sp_create_account(?);';
    model.password = bcrypt.hashSync(model.password, 10);
    var result = await mysqlSelect(query, [[model.email, model.password]]);
    if (result.success == true&&result.data.length>0) {
        let id = result.data[0].id;
        let email = result.data[0].email;
        let token = GetJwt(id, email, "admin");
        result.data[0].token = token;
        delete result.data[0].password;
        return functionReturn(result.data[0]);
    }
    return functionReturn("Error creating account", false);
}

const getUserByEmail = async email=>{
    let query = 'call sp_get_user_by_email(?);';
    var result = await mysqlSelect(query, [[email]]);
    return result;
}
const Account = { loginAccount, createAccount,getUserByEmail };
module.exports = Account;