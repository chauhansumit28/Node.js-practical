const { count } = require('console');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/studentdata';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

// Optional: Define a simple schema and model for testing
const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
  password: Number,
  email: String,
  phone: Number,
});

const TestModel = mongoose.model('Test', testSchema);

// Optional: Create and save a new document
const testDoc = new TestModel({ name: 'nitin', age: 25 ,password: 1 ,email:'nitin@gmail.com',phone:90901236});
testDoc.save()
  .then(doc => {
    console.log('Document saved:', doc);
  })
  .catch(err => {
    console.error('Error saving document', err);
  });


let app = express();


let movies = JSON.parse( fs.readFileSync('./data/movies.json'));

//GET - api/movies
app.get('/api/v1/movies', (req,res)=>{
    res.status(200).json({
        status: "sucess",
        count: movies.ljength,
        data: {
            movies: movies
        }
    })
})

//CREATE A SERVER
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})