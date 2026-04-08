const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
  const cookieHeader = request.get('Cookie');
  let lastVisit = null;

  const error = request.session.error || '';
  request.session.error = '';

  if (cookieHeader) {
    const match = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('lastVisit='));
    if (match) lastVisit = decodeURIComponent(match.split('=').slice(1).join('='));
  }
  response.render('login', {
    username: request.session.username || '',
    lastVisit: lastVisit,
    error: error,
  });
};

exports.post_login = (request, response, next) => {
  const now = new Date().toUTCString();

  User.fetchAuthContext(request.body.username).then((authContext) => {
    if (!authContext.user) {
      request.session.error = 'Usuario y/o contraseña no coinciden.';
      return response.redirect('/users/login');
    }

    return bcrypt.compare(request.body.password, authContext.user.password).then((doMatch) => {
      if (!doMatch) {
        request.session.error = 'Usuario y/o contraseña no coinciden.';
        return response.redirect('/users/login');
      }

      response.setHeader('Set-Cookie', `lastVisit=${encodeURIComponent(now)}; HttpOnly`);
      request.session.isLoggedIn = true;
      request.session.username = request.body.username;
      request.session.permisos = authContext.permisos.map((p) => p.nombre_privilegio);
      return request.session.save(() => {
        return response.redirect('/personajes');
      });
    });
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
  });
};

exports.post_signup = (request, response, next) => {
  if (request.body.password !== request.body.password_confirm) {
    request.session.error = 'Passwords dont match';
    return response.redirect('/users/signup');
  }

  const user = new User(
      request.body.username, request.body.nombre, request.body.password, request.body.correo);

  user.saveWithStoredProcedure(1).then((registerStatus) => {
    if (!registerStatus || registerStatus.ok !== 1) {
      request.session.error = 'This username already exists';
      return response.redirect('/users/signup');
    }

    return response.redirect('/users/login');
  }).catch((error) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
      request.session.error = 'This username already exists';
      return response.redirect('/users/signup');
    }

    console.log(error);
    next(error);
  });
};
