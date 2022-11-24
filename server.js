require('dotenv').config();
const app = require('./src/app');

// start server
const PORT = process.env.PORT;
app.listen(PORT, function() {
    console.log(`Server is listening on ${PORT}`);
});