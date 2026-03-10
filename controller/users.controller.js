const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const cookieHeader = request.get('Cookie');
    let lastVisit = null;
    if (cookieHeader) {
        const match = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('lastVisit='));
        if (match) lastVisit = decodeURIComponent(match.split('=').slice(1).join('='));
    }
    response.render('login', {
        username: request.session.username || '',
        lastVisit: lastVisit,
    });
};

exports.post_login = (request, response, next) => {
    const now = new Date().toUTCString();
    
    User.fetchOne(request.body.username).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            bcrypt.compare(request.body.password, rows[0].password).then((doMatch) => {
                if(doMatch) {
                    response.setHeader('Set-Cookie', `lastVisit=${encodeURIComponent(now)}; HttpOnly`);
                    request.session.isLoggedIn = true;
                    request.session.username = request.body.username;
                    return request.session.save(() => {
                        return response.redirect('/personajes');
                    });
                } else {
                    request.session.error = "Usuario y/o contraseña no coinciden."
                    return response.redirect('/users/login');
                }
            }).catch((error) => {
                console.log(error);
                next(error);
            });
        } else {
            request.session.error = "Usuario y/o contraseña no coinciden."
            return response.redirect('/users/login');
        }
    }).catch((error) => {
        console.log(error);
        next(error);
    });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
};

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        username: request.session.username || '',
        error: error,
    })
};

exports.post_signup = (request, response, next) => {
    if (request.body.password != request.body.password_confirm) {
        request.session.error = 'Passwords dont match';
        return response.redirect('/users/signup');
    } else {
        const user = new User(
            request.body.username, request.body.nombre, request.body.password, request.body.correo);
        user.save().then(() => {
            return response.redirect('/users/login');
        }).catch((error) => {
            console.log(error);
            next(error);
        });
    }
};