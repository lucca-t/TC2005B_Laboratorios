module.exports = (request, response, next) => {
    const permisos = request.session.permisos || [];
    if (permisos.includes('crear_personajes')) {
        return next();
    }
    request.session.error = "No tienes autorización para crear o editar en esta sección.";
    return response.redirect('/personajes');
};
