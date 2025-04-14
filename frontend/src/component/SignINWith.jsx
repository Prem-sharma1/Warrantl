import React from 'react'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {toast} from 'react-toastify'
import { auth } from '../utils/firebase';

function SignINWith() {
  function googleLogin(){
  const provider=new GoogleAuthProvider();
  signInWithPopup(auth,provider).then(async(result)=>{
   console.log(result)
  if(result.user){
    toast.success("User Logged in Successfully",{
      position:'top-center'
    }
    )
  }
  window.location.href="/home"
  })
}
  return (
    
    <>  
             
        <img src={("../Googlebutton.png")} width={"50px"}  onClick={googleLogin}  style={{cursor:"pointer"}}/>
    
      </>
  
  )
}

export default SignINWith
