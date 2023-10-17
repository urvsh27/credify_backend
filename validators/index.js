//Import validators
const register = require('./register.validator');
const login = require('./login.validator');
const moduleId = require('./moduleId.validator');
module.exports = {
    register,
    login,
    moduleId
};