const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();  
const UserRoute = require('./Routes/UserRoute');
const WebsiteRoute = require('./Routes/WebsiteRoute');
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors())


//All Routes
app.use('/User',UserRoute);
app.use('/Website',WebsiteRoute);

app.get('/',(req,res)=>{
  res.send("server is running.....");
})


const PORT = process.env.PORT||7001;
app.listen(PORT,()=>{
  console.log(`server is running on port NO: ${PORT}`);
})


