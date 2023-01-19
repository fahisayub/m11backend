const {UserModel} =require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

let userSignup=async(req,res)=>{
 let usercred=req.body;
 let user=await UserModel.findOne({email:usercred.email});
 if(user){
    res.send({message:"User already exists,please login"})
 }else{
    bcrypt.hash(
        usercred.password,3,async(err,hashedpass)=>{
            if(err){
                res.send({message:"Something went wrong!",err:err});
            }else{
                usercred.password=hashedpass;
                let newuser=UserModel.insertMany([usercred]);
                let token= await jwt.sign({email:newuser.email},process.env.SECRET_KEY,{expiresIn:'6h'});
                let payload={
                    message:'User Registration successfully',
                    token:token,
                }
                res.send(payload);

            }
        }
    )
 }

}

let userLogin=async(req,res)=>{
let {email,password}=req.body;
let user=await UserModel.findOne({email:email});
if(user){
    await bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:user.email},process.env.SECRET_KEY,{expiresIn:'6h'});
            let payload={
                message:`Welcome,you have loggedin successfully`,
                token:token,
                
            };
            res.send(payload);
        }else{
            res.send({message:'Invalid Credentials',err})
        }
    })
}else{
    res.send({message:'User not found,please singup'})
}

}


 const UserController={
    userLogin,userSignup
}
module.exports={UserController}