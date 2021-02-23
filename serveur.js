const express = require("express");
const path = require('path')
const app = express()
app.use(express.static('./dist/angular-gestion-memoires-sonat'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/angular-gestion-memoires-sonat/' });
});

app.listen(process.env.PORT || 8080);

// const express = require("express");
// const path = require('path')

// const app = express();

// app.use(express.static(__dirname + '/dist/gestion-memoires-front'));

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/gestion-memoires-front/index.html'));

// })

// app.listen(process.env.PORT)