var express = require('express'),
    combo = require('combohandler'),

    app = express();

app.set('title', 'Hello World');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
      res.render('index.jade', { title: app.get('title') });
});

app.get('/u1', combo.combine({rootPath: 'u1-js-modules'}), function (req, res) {
    res.send(res.body, 200);
});

app.listen(3000);
console.log('Listening on port 3000');
