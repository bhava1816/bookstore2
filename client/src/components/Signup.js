import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let firstNameref=useRef()
    let lastNameref=useRef();
    let emailref=useRef();
    let passwordref=useRef();
    let mobileNumberref=useRef();
    let profilepicref=useRef()
    let [image ,setimage]=useState("https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80")
let myfunction=async()=>{
  
    let mybody=new FormData();
    mybody.append("firstName",firstNameref.current.value)
    mybody.append("lastName",lastNameref.current.value)
    mybody.append("email",emailref.current.value)
    mybody.append("password",passwordref.current.value)
    mybody.append("mobileNumber",mobileNumberref.current.value)
    mybody.append("profilepicref",profilepicref.current.files[0])
   let response= await fetch("http://localhost:1111/signup",{method:"POST",body:mybody})
   let jsodata=await response.json()
   console.log(jsodata);

   firstNameref.current.value='';
   lastNameref.current.value='';
   emailref.current.value='';
   passwordref.current.value='';
   mobileNumberref.current.value='';
  setimage("https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80")

}

  return (
    <div className="signup-container">
      <form>
        <h1>Signup Form</h1>
        <div>
            <label>firstName:</label>
            <input type='text' ref={firstNameref} ></input>
        </div>
        <div>
            <label>lastName</label>
            <input type='text' ref={lastNameref} ></input>
        </div>
        <div>
            <label>email</label>
            <input type='text' ref={emailref} ></input>
        </div>
        <div>
            <label>password</label>
            <input type='text' ref={passwordref} ></input>
        </div>
        <div>
            <label>mobileNumber</label>
            <input type='number' ref={mobileNumberref} ></input>
        </div>
        <div>
          <label></label>
          <input type='file' ref={profilepicref}  onChange={()=>{
            let file=profilepicref.current.files[0]
            if(file){
             setimage(URL.createObjectURL(profilepicref.current.files[0]))
            }
          }}></input>
        </div>
        <div>
          <img src={image} alt='' width="200px" height="200px"></img>
        </div>
        <button type='button' onClick={()=>{
            myfunction()
        }}>clickme!</button>
      </form>
      <Link to="/">login</Link>
    </div>
  )
}

export default Signup
