const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mydatabase';

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
  phone: Number
});

const TestModel = mongoose.model('Test', testSchema);

// Optional: Create and save a new document
const testDoc = new TestModel({ name: 'shiv', age: 26 ,password: 325 ,email:'shiv@gmail.com',phone:8956123475});
testDoc.save()
  .then(doc => {
    console.log('Document saved:', doc);
  })
  .catch(err => {
    console.error('Error saving document', err);
  });



  
//dotenv configuration
dotenv.config()

//rest object 
const app = express()

//post methad postmon data 
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



//middleweares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.get('/welcome' , (req,res)=> {
    return res.status(200).send("<h1>welcome to Food server </h1>");
});


app.post('/api/car' , (request,response)=>{
  const {name,brand,owner} = request.body;
  console.log(name);
  console.log(brand);
  console.log(owner)
  response.send("car submited Successfully.")
})



//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT,() =>{
    console.log(`server Running on ${PORT}`)
})