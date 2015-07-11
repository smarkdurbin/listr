'use strict';

var _ = require('lodash');
var List = require('./list.model');
var Thing = require('../thing/thing.model');

// Get list of all lists
exports.index = function(req, res) {
  List.find(function (err, lists) {
    if(err) { return handleError(res, err); }
    return res.json(200, lists);
  });
};

// Get a single list
exports.show = function(req, res) {
  List.findById(req.params.id, function (err, list) {
    if(err) { return handleError(res, err); }
    if(!list) {
        return res.send(404);
    }
      return res.json(list);
  });
};

// Get all lists for a user
exports.indexByUser = function(req, res) {
  List.find({ owner: req.user._id },function (err, lists) {
    if(err) { return handleError(res, err); }
    return res.json(200, lists);
  });
};

// Creates a new list in the DB.
exports.create = function(req, res) {
  List.create(req.body, function(err, list) {
    if(err) { return handleError(res, err); }
    return res.json(201, list);
  });
};

exports.addThing = function(req, res) {
    
};

// Deletes a list from the DB.
exports.destroy = function(req, res) {
  List.findById(req.params.id, function (err, list) {
    if(err) { return handleError(res, err); }
    if(!list) { return res.send(404); }
    list.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.update = function(req, res) {    // DELETES THING FROM LIST
    if(req.body.thingId) {
        // DELETES ITEM FROM LIST
        List.findById(req.params.id, function (err, list) {
            if (err) { return handleError(res, err); }
            if(!list) { return res.send(404); }
            
            var arr = list.things;
            
            for(var i=0; i<arr.length; i++){
                if(arr[i]._id == req.body.thingId){
                    arr.splice(i, 1);  //removes 1 element at position i 
                    break;
                }
            }

            list.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200, list);
            });
        }); 
    // COMPLETES or UNCOMPLETES THING FROM LIST
    } else if (req.body._id) {
        // ACTIVATES ITEM FROM LIST
        if (req.body.complete === false) {
            // console.log(req.params.id);
            List.findById(req.params.id, function (err, list) {
                if (err) { return handleError(res, err); }
                if(!list) { return res.send(404); }

                var arr = list.things;

                for(var i=0; i<arr.length; i++){
                    if(arr[i]._id == req.body._id){
                        arr[i].active = true;
                    }
                }

                list.save(function (err) {
                    if (err) { return handleError(res, err); }
                    return res.json(200, list);
                });
            });
        // INACTIVATES ITEM FROM LIST
        } else if (req.body.complete === true) {
            List.findById(req.params.id, function (err, list) {
                if (err) { return handleError(res, err); }
                if(!list) { return res.send(404); }

                var arr = list.things;

                for(var i=0; i<arr.length; i++){
                    if(arr[i]._id == req.body._id){
                        arr[i].active = false;
                    }
                }

                list.save(function (err) {
                    if (err) { return handleError(res, err); }
                    return res.json(200, list);
                });
                
            });
        }
    // ADDS THING TO LIST
    } else if (req.body.name) {
        if(req.body._id) { delete req.body._id; }
        List.findById(req.params.id, function (err, list) {
            if (err) { return handleError(res, err); }
            if(!list) { return res.send(404); }
            if(req.body){
                list.things.push(req.body);
            }
            list.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200, list);
            });
        });
    } else if (req.body.description) {
        if(req.body._id) { delete req.body._id; }
        List.findById(req.params.id, function (err, list) {
            if (err) { return handleError(res, err); }
            if(!list) { return res.send(404); }
            if(req.body.description){
                list.description = req.body.description;
            }
            list.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200, list);
            });
        });  
    } else if (req.body.user) {
        // Here we will put the 'like' functions
    }
};


function handleError(res, err) {
  return res.send(500, err);
}