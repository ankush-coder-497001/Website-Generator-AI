const UserModel = require('../Models/UserSchema');
const Website = require('../Models/WebsiteSchema');

 const Login = async (req,res)=>{
  try {

    //check if user exist or not 
    const password = req.body.password 
    const user = await UserModel.findOne({password});
    if(user) return res.status(200).json(user);

    //otherwise create a user

    const newUser = await UserModel(req.body);
    await newUser.save()
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetUserById = async (req,res)=>{
  try {
    const id = req.params.id;
    const User = await UserModel.findById(id);
    if(!User) return res.status(404).json("User Not Found!")
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetAllUsers = async (req,res)=>{
try {
  const AllUsers = await UserModel.find();
  res.status(200).json(AllUsers);
} catch (error) {
  res.status(500).json(error);
}
}

module.exports = {
  Login,
  GetUserById,
  GetAllUsers
}
