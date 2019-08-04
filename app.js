const express = require('express');
const app = express();
const PORT = process.env.PORT || 6060
app.use(express.static('public'));
app.listen(PORT, function () {
    console.log('App is running'+PORT);
});