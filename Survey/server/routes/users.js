//kullanıcılar için

const express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const { loginValidator, registerValidator } = require('../validators/validators');
const md5 = require('md5');
const router = express.Router();

//kayıt işlemi, md5 ile şifrelenir
//validation ile gerekli yerler kontrol edilir
router.post('/register', (req, res) => {
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        const { username, email, password } = req.body;
        const registerUser = new Users({
            username,
            email,
            password,
            createdAt: new Date()
        });

        const hashedPassword = md5(registerUser.password);
        if (!hashedPassword) {
            res.json({ message: 'Hash işlemi sırasında bir hata oluştu!', success: false });
            return;
        }
        registerUser.password = hashedPassword;
        registerUser.save().then(() => {
            res.json({ "message": "Kayıt işlemi başarılı!", "success": true });
        }).catch(er => res.json({ message: err.message, success: false }));

    }
})

//giriş işlemi, token oluşturma, validation işlemleri
router.post('/login', (req, res) => {
    const { errors, isValid } = loginValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                res.json({ success: false, message: 'Bu mail adresiyle kayıtlı kullanıcı bulunamadı!' });
            } else {
       
                if (md5(req.body.password) === user.password) {
                    const payload = {
                        id: user._id,
                        username: user.username
                    }
                    jwt.sign(
                        payload,
                        process.env.APP_SECRET, { expiresIn: 2155926 },
                        (err, token) => {
                            res.json({
                                user,
                                token: 'token: ' + token,
                                success: true
                            })
                        }
                    )
                } else {
                    res.json({ success: false, message: 'Şifre hatalı!' });
                }
            }
        })
    }
})
//kullanıcı getir
router.get('/:id', checkAuth, (req, res) => {
    Users.findOne({ _id: req.params.id }).then(user => {
        res.json({ user, success: true })
    }).catch(er => {
        res.json({ success: false, message: er.message })
    })
})

module.exports = router;