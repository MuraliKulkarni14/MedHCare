import React,{useState,useEffect} from 'react'
import {TextField,FormControl,Button, Select,InputLabel,MenuItem} from '@mui/material';
import {toast} from "react-toastify";

import {setProfile,getProfile} from "../api/user.js";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header'
import "./styles/ProfileEdit.css"

const ProfileEditForm = () => {

  const [userData,setUserData] = useState(null);
  const [fName,setFname] = useState("");
  const [lName,setLname] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [bloodType,setBloodType] = useState("");
  const [profileImage,setProfileImage] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    getProfile().then((profileData) =>{
      setUserData(profileData);
      setFname(profileData.fName);
      setLname(profileData.lName);
      setPhone(profileData.phone);
      setAddress(profileData.address);
      setBloodType(profileData.bloodType);
      setProfileImage(profileData.profileImage);


    }).catch((err) => {
      toast.error("Error Fetching Data",err.message);
    })

  },[]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    
    try {
      const res = await setProfile({fName,lName,phone,address,bloodType});
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
          navigate('/getprofile');
      }
    } catch (err) {
      toast.error(err)
    }

  }

  return (
<>
   <Header /> 
< div id='editgrid' className='container-fluid'>
  <FormControl>
<div className="row">
<div class="col h2 text-center ">Edit Profile</div>
<br />
</div>
<div class="row">
<div className='col-sm-3'>
  <div id='editprofileimg' className='card'>
    <img src={profileImage} className="card-img-top" alt="Not Found" />
    
    {
      //Complete
    }


  </div>
</div>
<div className="col card" id='editinfocard'>
  <div className="row">
    <div className="col">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="First Name"
          value={fName}
          onChange={(e) => setFname(e.target.value)}
        />
    </div>  
    <div className="col-sm-8">
    <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Last Name"
          value={lName}
          onChange={(e) => setLname(e.target.value)}
        />
    </div>
  </div>  
<br />

  <div className="row"> 
    <div className="col-sm-8">
    <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
    </div>
  </div> 

<br />

  <div className="row">
    <div className="col">
    <TextField
          size="small"
           variant="outlined"
           className="form-control"
           label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
    />  
    </div>  
  </div> 

  <br />

  <div className="row">
    <div className="col">
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={bloodType}
    label="Blood Type"
    onChange={(e)=>{
      setBloodType(e.target.value)
    }}
  >
    <MenuItem value="A+">A +</MenuItem>
    <MenuItem value="A-">A -</MenuItem>
    <MenuItem value="B+">B +</MenuItem>
    <MenuItem value="B-">B -</MenuItem>
    <MenuItem value="AB+">AB +</MenuItem>
    <MenuItem value="AB-">AB -</MenuItem>
    <MenuItem value="O+">O +</MenuItem>
    <MenuItem value="O-">O -</MenuItem>

  </Select>  
  </FormControl>
    </div>  
  </div>

  <div className="row">

  <div className='d-grid gap-2 text-center mt-4'><Button variant="contained" disabled={!fName|| !address || !phone|| !bloodType} onClick={handleEditProfile} cla>SUBMIT</Button></div>
  </div>

</div>
</div>
</FormControl>
</div>

</>
  )
}

export default ProfileEditForm