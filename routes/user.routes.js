const { register, login, logout } = require('../controller/user.controller');

module.exports = app => {
    app.post('/api/user/register', register);
    app.post('/api/user/login', login);
    app.post('/api/user/logout', logout);
}
