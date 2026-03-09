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
    response.setHeader('Set-Cookie', `lastVisit=${encodeURIComponent(now)}; HttpOnly`);
    request.session.username = request.body.username;
    response.redirect('/personajes');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
};