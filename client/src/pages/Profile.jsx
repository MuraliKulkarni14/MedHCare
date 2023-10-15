import React,{useContext,useState,useEffect} from 'react';
import { UserContext } from "../UserContext";
import {getProfile} from "../api/user.js";

import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header'

import "./styles/Profile.css"

const Profile = () => {
  const {user} = useContext(UserContext);
  const [userData,setUserData] = useState("");
  const navigate = useNavigate();

  const handleedit = (e) =>{
    e.preventDefault();
    
    navigate('/setprofile');
  }

  useEffect(() => {
    getProfile().then((profileData) =>{
      setUserData(profileData);

    }).catch((err) => {
      console.log("Error Fetching Data",err.message);
    })

  },[]);

  const created = new Date(userData.createdAt);

  function format(date) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    return date.toLocaleString(undefined, options);
  }

  return (
  
    <>
    <Header />
< div id='gridcont' className='container-fluid'>
  <div className="row">
    <div class="col h2 text-center">Personal Info</div>
    <br />
  </div>
  <div class="row">
    <div className='col-sm-3'>
      <div id='profileimg' className='card'>
        <img src={userData.profileImage} className="card-img-top" alt="Not Found" />
        
        {
          userData ? (<div className='d-grid gap-2 text-center mt-4'><Button variant="contained" onClick={handleedit}>Edit</Button></div>):(<div className='d-grid gap-2 text-center mt-4'><Button variant="contained" onClick={handleedit}>Complete Profile</Button></div>)
        }


      </div>
    </div>
    <div className="col card" id='infocard'>
      <div className="row">
        <div className="col">
         Full Name :   
        </div>  
        <div className="col-sm-8">
          {userData.fName + ' '+ userData.lName}
        </div>
      </div>  

      <hr />

      <div className="row">
        <div className="col">
         Phone :   
        </div>  
        <div className="col-sm-8">
          {userData.phone}
        </div>
      </div> 

      <hr />

      <div className="row">
        <div className="col">
         Blood Type :   
        </div>  
        <div className="col-sm-8">
          {userData.bloodType}
        </div>
      </div> 

      <hr />

      <div className="row">
        <div className="col">
         Address :   
        </div>  
        <div className="col-sm-8">
          {userData.address}
        </div>
      </div>
    
    </div>
  </div>
  <div className='row'>
    <div className="col text-center h2" id='details2'>
      Account Details
    </div>
  </div>
  <div className="row ">
    <div className='col-sm-3'></div>
  <div className="col card " id='infocard'>
  <div className="row">
    <div className="col">
      Username :    
    </div>  
    <div className="col-sm-8">
      {user}
    </div>
  </div>

  <hr />

  <div className="row">
        <div className="col">
        Email :  
        </div>  
        <div className="col-sm-8">
          {userData.email}
        </div>
  </div>

    <hr />

  <div className="row">
        <div className="col">
        Account Created On:   
        </div>  
        <div className="col-sm-8">
          {format(created)}
        </div>
  </div>
    
    
    </div>
  </div>
</div>
  
  </>
  );
};

export default Profile