const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/get_status', {
        target: 'http://35.184.34.164'
    }));
    app.use(proxy('/buy_pizza', {
        target: 'http://35.184.34.164'
    }));
};