import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import Navigation from './Navigation'


function Edit() {
    let objectdata=useSelector((store)=>{
       return store.login.data
    })
    console.log("objectdata = ", objectdata)

    console.log(objectdata)
    let firstNameref=useRef()
        let lastNameref=useRef();
        let emailref=useRef();
        let passwordref=useRef();
        let mobileNumberref=useRef();
        let profilepicref=useRef()
        let [image ,setimage]=useState("https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80")
    useEffect(()=>{
      if(!objectdata || objectdata.length===0)return;
      firstNameref.current.value=objectdata[0].firstName
      lastNameref.current.value=objectdata[0].lastName
      emailref.current.value=objectdata[0].email
      mobileNumberref.current.value=objectdata[0].mobileNumber
      setimage(`http://localhost:1111/uploads/${objectdata[0].profilepic}`)
    },[objectdata])
    let myfunction = async () => {
  let mybody = new FormData();

  mybody.append("firstName", firstNameref.current.value);
  mybody.append("lastName", lastNameref.current.value);
  mybody.append("email", emailref.current.value);
  mybody.append("mobileNumber", mobileNumberref.current.value);

  // let file = profilepicref.current.files[0];
  // if (file) {
  //   mybody.append("profilepic", file);
  // }

  let response = await fetch("http://localhost:1111/upadte", {
    method: "PATCH",
    body: mybody
  });

  let data = await response.json();
  console.log(data);
  
  
};

  return (
    
    <div>
      <Navigation></Navigation>
     <div className="signup-container">
      
        <form>
          <h1>Edit Profile</h1>
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
            <input type='text' ref={emailref} readOnly></input>
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
      
      <Link to="/" style={{position:"relative", right:"280px"}}>login</Link>
      </div>
    </div>
  )
}

export default Edit
