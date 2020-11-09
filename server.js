const express = require('express');
const path = require('path');
const app = express();
console.log(__dirname);
console.log(process.env.PORT);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/esperanza', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);