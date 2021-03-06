var express = require('express'),
    combo = require('combohandler'),

    app = express();

// just a simple test page 
app.set('title', 'YUI Build Trial');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
      res.render('index.jade', { title: app.get('title') });
});

// requests to the local yui3 lib
app.get('/yui3', combo.combine({rootPath: 'yui3'}), function (req, res) {
    res.send(res.body, 200);
});

// requests to your own yui3 lib
app.get('/yui3-contrib', combo.combine({rootPath: 'yui3-contrib'}), function (req, res) {
    res.send(res.body, 200);
});

app.listen(3000);
console.log('Listening on port 3000');
