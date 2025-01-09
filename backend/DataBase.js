const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MongoURL)
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log(`mongoose error ${err}`);
})

module.exports = mongoose;