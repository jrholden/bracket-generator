const indexRouter = require('./routes/index');
const catRouter = require('./routes/catalog');
const adminRouter = require('./routes/admin');
const bracketRouter = require('./routes/bracket');

module.exports = function (app) {
    app.use('/', indexRouter);
    app.use('/tournament', catRouter);
    app.use('/admin', adminRouter);
    app.use('/bracket', bracketRouter);
};