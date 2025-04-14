import React from 'react'
import { FacebookAuthProvider,signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

function SignINWithFac() {
    const auth = getAuth();
    function facebookLogin(){
      const provider=new FacebookAuthProvider();
      signInWithPopup(auth,provider).then(async(result)=>{
       console.log(result)
      if(result.user){
        toast.success("Welcome back! You have successfully logged in.", {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      
        }
        )
    }
      window.location.href="/home"
      })
    }
  return (
    <>
        <img src={("../FaceBookButton.png")} width={"50px"} background-color={"white"} style={{cursor:"pointer"}}
      onClick={facebookLogin }/>

      </> 
  )
}

export default SignINWithFac
