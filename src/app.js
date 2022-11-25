const express = require('express');
const cors = require('cors');
const contactController = require('./controller/contact.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message : "Hello, world!"});
});
// create a route to contact with FGO character
app.route('/admin/FGO')
    .post(contactController.createFGO);
// update or delete a character via id
app.route('/admin/FGO/:id(\\d+)')
    .delete(contactController.deleteFGO)
    .put(contactController.fixFGO);

// create a route to contact with Princess connect character
app.route('/admin/princess-connect')
    .post(contactController.createPR);
// update or delete a character via id
app.route('/admin/princess-connect/:id(\\d+)')
    .delete(contactController.deletePR)
    .put(contactController.fixPR);

// create new api handlers
app.use(function (req, res, next) {
    return next(new ApiError(404, 'Resource not found!'));
});

app.use(function (err, req, res, next) {
    return res.status(err.statusCode || 500).json({
        message : err.message || 'Internal Server Error'
    });
});

module.exports = app;