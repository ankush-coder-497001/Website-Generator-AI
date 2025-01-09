const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect("mongodb+srv://ankushcoder497001:lERzR7GstH1VNRbp@cluster0.i25wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log(`mongoose error ${err}`);
})

module.exports = mongoose;