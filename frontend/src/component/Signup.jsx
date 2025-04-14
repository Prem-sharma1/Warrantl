import React,{ useState } from "react";
import Form from 'react-bootstrap/Form';
import './Signup.css'
import Button from 'react-bootstrap/esm/Button';
import SignINWith from './SignINWith';
import { ToastContainer } from 'react-toastify';
import SignINWithFac from './SignINWithFac';
import { handleError, handleSuccess } from "../utils/utils";
import { useNavigate } from 'react-router-dom';

function Signup() {

 const[signupInfo,setSignUpInfo]=useState({
  fname:'',
  lname:'',
  email:'',
  password:''
 })
 const navigate=useNavigate();
 const handleChange=(e)=>{
   const{name,value}=e.target;
   console.log(name,value);
   const copyLoginInfo={...signupInfo}
   copyLoginInfo[name]=value;
   setSignUpInfo(copyLoginInfo)
 }
 
 const handleSignup=async(e)=>{
  e.preventDefault();
  const {fname,lname,email,password}=signupInfo;
    if(!fname||!lname||!email||!password) 
    {
       return handleError('All FIelds are required')
    }
      try{
         const url="http://localhost:8080/auth/signup"
         const response=await fetch(url,{
           method:"POST",
           headers:{
            "Content-Type": "application/json",
           },
           body:JSON.stringify(signupInfo)
         })
         const result=await response.json()
         const {success,message,error}=result;
         if(success){
          handleSuccess(message);
          setTimeout(()=>{
              navigate("/login")
          },1000)
         }else if(error){
        const details= error?.details[0].message;
        handleError(details)
         }else if(!success){
          handleError(message)
         }
        console.log(result)
      }catch(err){
       handleError(err)
      }
    }
console.log("SignupInfo-->",signupInfo)
  return (
    <div className="container">
       <Form className="User" onSubmit={handleSignup} >
      <h3 className='text-center'>SignUp</h3>
      <div className='d-flex gap-1 mb-2'>
      <Form.Group controlId="formGroupEmail" className='col-sm-6' >
        <Form.Label>First Name</Form.Label>
        <Form.Control type="Text" placeholder="Enter First Name"  name="fname"  
        onChange={handleChange} />
      </Form.Group> 
      <Form.Group controlId="formGroupEmail" className='col-sm-6 '>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="Text" placeholder="Enter Last Name" name="lname"  
        onChange={handleChange}  />
      </Form.Group>
      </div>
    <Form.Group controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        name="email"  
        onChange={handleChange} 
      />
      </Form.Group>
      <div className='d-flex gap-1 mt-2'>
      <Form.Group className="mb-3 col-sm-12" controlId="formGroupPassword"  >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"  onChange={handleChange}/>
      </Form.Group>
     
      </div>
      <div className='justify-content-center d-flex justify-content-center gap-2'>
      <Button variant="success" className=' mt-4 col-sm-6' type="submit"  onClick={handleSuccess}>SignUp</Button>
      </div>
      <p className="continue-s mt-2">
If already signup click this? <a href="/">Login</a>

</p>
      <p className='continue-p'>-also continue with-</p>
      <div className='d-flex col-xs-12'>
 
 <div className='col-xs-4'>
 <ToastContainer/>
 <SignINWith />
 </div>
 <div className='col-xs-4'>
 <SignINWithFac />
 </div>
</div>
</Form>

     </div>
  )
}

export default Signup
