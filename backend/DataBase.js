const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(" mongodb+srv://ankushcoder497001:<db_password>@websitegenerate.kj83h.mongodb.net/?retryWrites=true&w=majority&appName=WebsiteGenerate")
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log(`mongoose error ${err}`);
})

module.exports = mongoose;