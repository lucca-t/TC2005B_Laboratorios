module.exports = (request, response, next) => {
    const permisos = request.session.permisos || [];
    if (permisos.includes('ver_personajes')) {
        return next();
    }
    request.session.error = "No tienes autorización para ver esta sección.";
    return response.redirect('/users/login');
};
