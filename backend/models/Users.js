const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserSchema=new Schema({
fname:{
  type:String,
  require:true,
},
lname:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
    unique:true,
},
password:{
  type:String,
  require:true,
}
});
const UserModel=mongoose.model('user',UserSchema)
module.exports=UserModel;