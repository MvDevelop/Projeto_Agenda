
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login_logado');
    return res.render('login');
};

// .register
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso!');
        req.session.save(() => {
            return res.redirect('/login/index');
        });

        // return res.send(login.errors);

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

// .login
exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', `Você entrou no sistema!`);
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
