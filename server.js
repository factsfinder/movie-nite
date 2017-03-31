const express  = require('express');
const path = require('path');
const port = process.env.PORT || 8086;
const app = express();
app.use(express.static(__dirname + '/build/'));
app.listen(port);
console.log("server started");
