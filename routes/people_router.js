var express = require("express");
var authorize = require("../middleware/middleware").authorize;
var Person = require("../models/models").Person;

var peopleRouter = express.Router();
// People response sorts by if active = true and then by name
peopleRouter.get("/", function(req, res){
  Person.find({}).sort({"active": -1, "name": 1}).exec(function(err, people){
    res.send(people);
  }); 
});

peopleRouter.get("/:id", function(req, res){
  Person.findById(req.params.id).exec(function(err, person){
    res.send(person);
  }); 
});

peopleRouter.delete("/:id/:token", authorize, function(req, res){
  Person.remove({_id: req.params.id}).exec(function(){
    res.send({deleted: true});
  });
});

peopleRouter.post("/:token", authorize, function(req, res){
  Person.create(req.body, function(err, person){
    if(err){
      res.status(500).send(err); 
    }
    else{
      res.send(person); 
    }
  });
});

peopleRouter.post("/:id/:token", authorize, function(req, res){
  Person.update({ _id: req.params.id } , { name: req.body.name, color: req.body.color, active: req.body.active }, function(err, result){
    if(err){
      res.status(500).send(err); 
    }
    else{
      res.send(result); 
    }
  });
});

module.exports = peopleRouter;