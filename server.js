var express = require('express'),
    combo = require('combohandler'),

    app = express();

// test page making reqs for yui js
app.set('title', 'YUI Build Trial');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
      res.render('index.jade', { title: app.get('title') });
});

app.get('/yui3', combo.combine({rootPath: 'yui3'}), function (req, res) {
        res.send(res.body, 200);
});
app.get('/yui3-u1', combo.combine({rootPath: 'yui3'}), function (req, res) {
        res.send(res.body, 200);
});

app.listen(3000);
console.log('Listening on port 3000');
