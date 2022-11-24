const express = require('express');
const cors = require('cors');
const contactController = require('./controller/contact.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message : "Hello, world!"})
});
// create a route to contact with FGO character
app.route('/admin/FGO')
    .post(contactController.createFGO)
    .delete(contactController.deleteFGO)
    .put(contactController.fixFGO)

// create a route to contact with Princess connect character
app.route('/admin/princess-connect')
    .post(contactController.createPR)
    .delete(contactController.deletePR)
    .put(contactController.fixPR)

module.exports = app;