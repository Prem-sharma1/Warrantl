const bcrypt=require('bcrypt');
const UserModel=require('../models/Users')
const jwt=require('jsonwebtoken')
const signup=async(req,res)=>{
    try{
   /*if user already exist use this for validation*/
   const{fname,lname,email,password}=req.body;
   const user=await UserModel.findOne({email});
   if(user){
    return res.status(400)
      .json({message:'user is already exist',success:false})
   }
    const userModel=new UserModel({fname,lname,email,password})
    userModel.password=await bcrypt.hash(password,10)
    await userModel.save();
    res.status(201)
    .json({message:'SignUp Succcessfully',success:true    
    });
    }catch(err){
     res.status(500)
      .json({
        message:'invalid surver error',success:false
      });
    }
}

const login=async(req,res)=>{
    try{
      /*if user already exist use this for validation*/
      const{email,password}=req.body;
      const user=await UserModel.findOne({email});
      const errormsg='auth failed email and password cannot be exist'
      if(!user){
       return res.status(400)
         .json({message:errormsg,success:false})
      }
     const ispassword=await bcrypt.compare(password,user.password)
     if(!ispassword){
      return res.status(400)
      .json({message:errormsg,success:false})
     }
     //payload
     const jwtToken=jwt.sign(
      {email:user.email,_id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
      
    )
       res.status(200)
       .json({message:'LoginSucccessfully',success:true,jwtToken,email, fname: user.fname,
        lname: user.lname  
       });
       }catch(err){
        res.status(500)
         .json({
           message:'invalid surver error',
           success:false,
           jwtToken,
           email,
           fname: user.fname,
           lname: user.lname
         });
       }
}
   module.exports={
        signup,
        login
    }
