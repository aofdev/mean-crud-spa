
// var mongojs = require('mongojs');
// var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

//--------------------DB-------------------------------//
var mongoose = require('mongoose');
var dbName = 'contactlist';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);
var Test = require('./models/model');
//-------------------------------------------------------//
var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');


app.use(flash());
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist',function (req, res) {
    console.log("I received a GET request");

    Test.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist',function(req, res){
    console.log(req.body);
    // db.contactlist.insert(req.body, function (err,doc) {
    //     res.json(doc);
    // })
    var test = new Test(req.body);
    test.save(function(err,doc) {
        if (err) {
            return res.send(err);
        } else {
            req.flash('success', 'Your name was updated');
        }
        res.json(doc);
    });
});

app.delete('/contactlist/:id' ,function (req, res) {
    // var id = req.params.id;
    // console.log(id);
    // db.contactlist.remove({_id: mongojs.ObjectId(id)},function (err, doc) {
    //     res.json(doc);
    // })
    Test.remove({_id: req.params.id}, function(err, doc) {
        if (err) {
            return res.send(err);
        }
        res.json(doc);
    });
});

app.get('/contactlist/:id', function (req, res) {
    // var id = req.params.id;
    // console.log(id);
    // db.contactlist.findOne({_id: mongojs.ObjectId(id)},function (err,doc) {
    //     res.json(doc);
    // })
    Test.findOne({ _id: req.params.id},{"name" :1,"email": 1}, function(err, doc) {
        if (err) {
            return res.send(err);
        }
        res.json(doc);
    });
});

app.put('/contactlist/:id',function (req,res) {
   //  var id = req.params.id;
   // console.log(req.body.name);
   //  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
   //  update: {$set: {name: req.body.name, email:req.body.email, number:req.body.number}},
   //      new: true},function (err,doc) {
   //      res.json(doc);
   //  });
    Test.findOne({ _id: req.params.id }, function(err, doc) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            doc[prop] = req.body[prop];
        }
        // save the movie
        doc.save(function(err) {
            if (err) {
                return res.send(err);
            }
            res.json(doc);
        });
    });
});

app.listen(3000);
console.log("Server running on port 3000");
