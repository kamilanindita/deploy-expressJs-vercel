const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Sosmed = mongoose.model('Sosmed');
const Otherplatform = mongoose.model('Otherplatform');

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuth = require('./middleware');

// router.get('/api/secret', withAuth, function(req, res) {
//     console.log(req.email)
//     res.send('The password is potato');
//   });

router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

router.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const tokens = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            //res.cookie('token', token, { httpOnly: true }).sendStatus(200);
            res.cookie('token', tokens, { httpOnly: true })
            res.status(200).send({ user, token: tokens });
          }
        });
      }
    });
  });


//get all
router.get('/', (req, res) => {
	User.find({}).populate('id_role',['name']).exec(function(err, results) {
        if(!err){
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err); 
        }
    });
});

//get one by _id
router.get('/:id', (req, res) => {
	User.findOne({ _id: req.params.id }).populate('id_role',['name']).populate('id_sosmed',['instagram', 'facebook', 'twitter', 'line']).populate('id_otherplatform',['shopee', 'tokopedia', 'bukalapak', 'olx']).exec(function(err, results) {
        if (!err) { 
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
    });
	
});

//add
router.post('/add', (req, res) => {
    var id_user
    var id_sosmed
    var id_otherplatform

    var user = new User();
    user.id_role=req.body.id_role
    user.name=req.body.name
    user.gender=req.body.gender
    user.email=req.body.email
    user.phone=req.body.phone
    user.address=req.body.address
    user.username=req.body.username
    user.password=req.body.password
    user.verification=req.body.verification

    user.save((err, result) => {
        if (!err){
            id_user=result._id;

            //add sosmed
            var sosmed = new Sosmed()
            sosmed.id_user=""
            sosmed.instagram=""
            sosmed.facebook=""
            sosmed.twitter=""
            sosmed.line=""

            sosmed.save((err, results) => {
                  if (!err){
                      id_sosmed=results._id

                       //add otherplatform
                      var otherplatform = new Otherplatform()
                      otherplatform.shopee=""
                      otherplatform.tokopedia=""
                      otherplatform.bukalapak=""
                      otherplatform.olx=""

                      otherplatform.save((err, hasil) => {
                          if (!err){
                              id_otherplatform=hasil._id

                               //update id sosmed and otherplatform
                                var newDatauser = new User();
                                newDatauser.id_sosmed=id_sosmed
                                newDatauser.id_otherplatform
                                
                                User.findOneAndUpdate({ _id: id_user }, newDatauser, { new: true }, (err, result) => {
                                    if (!err) { 
                                      res.statusCode=201; 
                                      res.end(JSON.stringify({"status": "success", "message": "Data has ben created", "data": []}));
                                    }else{
                                        console.log(err); 
                                    }
                                });
                          }else{
                              console.log(err); 
                          }
                      }); 

                  }else{
                      console.log(err); 
                  }
              }); 

        }else{
            console.log(err); 
        }
    });

});

//update
router.put('/:id', (req, res) => {
    req.body.update_at= new Date()
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
        if (!err) { 
            res.statusCode=201;
            res.end(JSON.stringify({"status": "success", "message": "Data has ben updated", "data": []})); 
        }else{
            console.log(err); 
        }
    });
});

//delete
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, result) => {
        if (!err) {
            res.statusCode=201;
            res.end(JSON.stringify({"status": "success", "message": "Data has ben deleted", "data": []})); 
        }
        else{ 
            console.log(err); 
        }
    });
});


module.exports = router;