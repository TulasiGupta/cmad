//https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/event/*', { target: 'http://localhost:8088/' }));
};