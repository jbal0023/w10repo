var Actor = require('../models/actors');
var Movie = require('../models/movies');
const mongoose = require('mongoose');
const actor = require('../models/actors');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
            //task 8
        }).populate('actors');
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
//task1
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

//task4
    deleteActor: function(req,res){
        Movie.findOne({_id:req.params.id},function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            Movie.updateOne({_id:req.params.id},{$pull:{actor:[req.params.actorid]}})
        
                movies.save(function (err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                })
            
        });
    },

//task 5
addActor: function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        Actor.findOne({ _id: req.body.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            movie.actors.push(actor._id);
            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        })
    });
},
//task 6
    getMovies: function(req,res){
        Movie.find({ year:{
                    $gte:parseInt(req.params.year1),
                    $lt: parseInt(req.params.year2)
                } })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
},

//task 9
deleteMovies: function(req,res){
    Movie.deleteMany( {year:{
        $gte:parseInt(req.params.year1),
        $lt: parseInt(req.params.year2)
    }})
.exec(function (err, movie) {
    if (err) return res.status(400).json(err);
    if (!movie) return res.status(404).json();
    res.json(movie);
});
}


};