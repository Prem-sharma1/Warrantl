import React from "react";
import Form from "react-bootstrap/Form";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import SignINWith from "./SignINWith";
// import SignINWithFac from "./SignINWithFac";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils";
function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
const[loginInfo,setLoginInfo]=useState({
  email:'',
  password:''
 })
  const handleChange=(e)=>{
    const{name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo}
    copyLoginInfo[name]=value;
    setLoginInfo(copyLoginInfo)
  }
  const handleLoginup=async(e)=>{
    e.preventDefault();

    const {email,password}=loginInfo;
      if(!email||!password) 
      {
         return handleError('All FIelds are required')
      }
        try{
           const url="http://localhost:8080/auth/login"
           const response=await fetch(url,{
             method:"POST",
             headers:{
              "Content-Type": "application/json",
             },
             body:JSON.stringify(loginInfo)
           })
           const result = await response.json(); 
           console.log(result);
           
           const { success, message, error, jwtToken, fname, lname } = result;
           
           if (success) {
             handleSuccess(message);
             localStorage.setItem('token', jwtToken);
           
             const fullName = `${fname ?? ''} ${lname ?? ''}`.trim();
             localStorage.setItem('loggedInUser', fullName);
           
             setTimeout(() => {
               navigate("/home");
             }, 1000);
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
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
    console.log("Remember Me:", !rememberMe);
  };

  return (
    <div className="container">
      <Form   onSubmit={handleLoginup} >
                <h3 className="text-center">Login</h3>
        <Form.Group className="email" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
           type="email" 
           value={loginInfo.email}
           placeholder="Enter email" 
           name="email"  
           onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group  controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password" value={loginInfo.password} placeholder="Password" name="password"  onChange={handleChange}
          />
        </Form.Group>
        <div class="row mb-4">
          <div class="col-md-6 d-flex justify-content-center">
            <div class="form-check mb-3 mb-md-0">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="loginCheck"
                checked={rememberMe}
                onChange={handleRememberMe}
               
              />
              <label class="form-check-label" for="loginCheck">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2">
              <ToastContainer/>
          <Button variant="success" className=" mt-2 col-sm-6" type="submit">
            Login
          </Button>

          <Button
            onClick={handleSignupClick}
            variant="danger"
            className=" mt-2 col-sm-6"
           
          >
            Signup
          </Button>
        </div>
     
      </Form>
    </div>
  );
}

export default Login;
