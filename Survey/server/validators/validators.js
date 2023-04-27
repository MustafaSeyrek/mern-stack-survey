//form verilerinin validation işlemleri

const isEmpty = require('is-empty');
const validator = require('validator');

//giriş yapma validation
module.exports.loginValidator = (data) => {
    const errors = {};
    data.password = !(isEmpty(data.password)) ? data.password : '';
    data.email = !(isEmpty(data.email)) ? data.email : '';

    let emailError = validator.isEmpty(data.email) ? 'Mail alanı zorunlu!' : (!validator.isEmail(data.email) ? 'Lütfen geçerli bir mail adresi giriniz!' : '');
    let passwordError = validator.isEmpty(data.password) ? 'Şifre alanı zorunlu!' : '';
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

//kayıt olma validation
module.exports.registerValidator = (data) => {
    const errors = {};

    data.username = !(isEmpty(data.username)) ? data.username : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';
    data.email = !(isEmpty(data.email)) ? data.email : '';

    let emailError = validator.isEmpty(data.email) ? 'Mail alanı zorunlu!' : (!validator.isEmail(data.email) ? 'Lütfen geçerli bir mail adresi giriniz!' : '');
    let passwordError = validator.isEmpty(data.password) ? 'Şifre alanı zorunlu!' : '';
    let usernameError = validator.isEmpty(data.username) ? 'Kullanıcı adı alanı zorunlu!' : '';
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (usernameError) errors.username = usernameError;

    return {
        errors,
        isValid: isEmpty(errors)
    }

}