const indexRouter = require('./routes/index');
const catRouter = require('./routes/catalog');
const adminRouter = require('./routes/admin');

module.exports = function (app) {
    app.use('/', indexRouter);
    app.use('/tournament', catRouter);
    app.use('/admin', adminRouter);
};