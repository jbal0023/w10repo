const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actors');
const movies = require('./routers/movies');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//let path = require path
let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/w10app")));


mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
//task 2
app.delete('/actors/:id', actors.deleteActor);
//task 3
app.delete('/actors/:id/:movieid', movies.deleteOne);
//extra task
app.get('/actors/avgmovies', actors.averageMovies);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//task 1
app.delete('/movies/:id', movies.deleteOne);

//task 4
app.delete('/movies/:id/:actorid', actors.deleteOne);
//task 5
app.put('/movies/:id/actors', movies.addActor);
//task 6
app.get("/movies/:year1/:year2", movies.getMovies);
//task 9
app.delete("/movies/:year1/:year2", movies.deleteMovies);

