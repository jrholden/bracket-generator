
const indexRouter = require('./routes/index');
const catRouter = require('./routes/catalog')

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/catalog', catRouter);
};