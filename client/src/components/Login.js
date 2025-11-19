import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  let useremailref=useRef();
  let passwordref=useRef()
  let navigate=useNavigate();
  let dispacth=useDispatch()

let onload=async()=>{
    let mybody=new FormData()
    mybody.append("token",localStorage.getItem("token"))
   
    let response=await fetch("http://localhost:1111/load",{method:"POST",body:mybody})
    let jsodata=await response.json()
    dispacth({type:"datasend",data:jsodata.data})
    
    console.log(jsodata)
}
useEffect(()=>{
   if(localStorage.getItem("token")){
    onload()
   }
},[])


  let myfunction=async()=>{
     let mybody=new FormData();
     mybody.append("email",useremailref.current.value)
     mybody.append("password",passwordref.current.value)
     let response=await fetch("http://localhost:1111/login",{method:"POST",body:mybody})
     let jsodata=await response.json()
     console.log(jsodata.msg)
     if(jsodata.msg==="invalid"){
      alert("invalid ")
     }
     if(jsodata.msg==="invalidpassword"){
      alert("invalid password")
     }
     if(jsodata.msg==="your crediential are correct"){
       localStorage.setItem("token",jsodata.data.token) 
     navigate("/dashbroad")
    dispacth({type:"datasend",data:jsodata.data})
     }
   
  }
  return (
    <div className='login'>
      
      <form id='login'>
        <h1>Login Page</h1>
        <div>
          <label>email</label>
          <input type='text' ref={useremailref}></input>
        </div>
         <div>
          <label>password</label>
          <input type='password' ref={passwordref}></input>
        </div>
        <button type='button' onClick={()=>{
     myfunction()
        }}>clickme!</button>
      </form>
     <Link to="/signup">signup</Link>
    </div>
  )
}

export default Login
