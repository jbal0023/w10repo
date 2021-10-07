const mongoose = require('mongoose');
const Actor = require('../models/actors');
const Movie = require('../models/movies');
module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
            //task 7
        }).populate('movies');
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });

        
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

 //task 2
    deleteActor: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            // deleteMany
            // $in, to delete using array items: actor.movies

            Movie.deleteMany({_id: {$in :[actor.movies]}}, function (err,movie){
                if (err) return res.status(404).json(err);
                res.json(movie);
            });
              
        });
    },


//task3
    deleteMovie: function(req,res){
        Actor.findOne({_id:req.params.id},function(err,actor){
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            Actor.updateOne({_id:req.params.id},{$pull:{movie:[req.params.movieid]}})
                actor.save(function (err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                })
            });
       
    },

    //extra task

    averageMovies: function(req,res){
      var count =0;
      for(var i =0; i<Array.length; i++){
          var obj = arr[i];
      } 
      res.json(count); 

    },

    deleteOneTitle: function (req, res) {
        Actor.findOneAndRemove({ title: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    }
    
}
