var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Starting Web Application learning' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('mycollection');
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist" : docs
        });
    }); 
});

/* GET New User page */
router.get('/newuser', function(req, res){
    res.render('newuser', {title: 'Add New User'});
})

/* POST to Add User Service */
router.post('/adduser', function(req, res){
    var db = req.db;
    
    //Get our fomrm values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    
    //Set our all collection
    var collection = db.get('mycollection');
    
    //Submit to the DB mongo
    collection.insert({
        "username" : userName,
        "email" : userEmail
        }, function (err, doc) {
            if (err) {
               res.send("There was a problem adding the information to the database."); 
            }else {
                res.redirect("userlist");
            }
        });
});

module.exports = router;
