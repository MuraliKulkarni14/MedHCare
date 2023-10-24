import React, {useContext,useRef} from "react";
import { UserContext } from "../UserContext";
import {Button,TextField} from "@mui/material"



import Header from "../components/Header"
import Slider from "../components/Slider"

import Medtracker from "../images/medtracker.jpg"
import HealthRecord from "../images/healthrecord.jpg"


import "./styles/Home.css"



const Home = () =>{
    const {user} = useContext(UserContext);
    const contactSectionRef = useRef(null); 
    const username = (user)=>{ 
      let string = user;
      return(string[0].toUpperCase() +
          string.slice(1));
  }

  const images = [
    { text: 'Img1' },
    { text: 'Img2' },
    { text: 'Img3' },
  ];

  const captions = [];
  if(user){
    captions.push({ title: `Welcome Back ${username(user)}`, description: 'We Look Out For All Your Health Care Needs.' });
  }
  else{
    captions.push({ title: 'Welcome To MedHCare', description: 'We Look Out For All Your Health Care Needs.' })
  }

  captions.push(
    { title: 'Digitized Documents', description: 'Store Various Health Care Documents in One Place and Find Them When Needed.' },
    { title: '24/7 Support Services', description: 'We Provide Support Literally 24/7 in Case You Require It.' }
  );

    return(
        <>
          <Header />
          <div id="slider">
          <Slider images={images} captions={captions} />
          </div>
          <div class="card-container" id="herotext">
            <div class="row">
              <div class="col-sm">
                <h1>Storing All Your Health Records Made Possible</h1>
                <br />
                <p>Store All Your Health Documents in One Place</p>
                <Button id="medtrackbutton">Store Records</Button>
              </div>
              <div className="col" id="medtrack">
                <img id="trackimg"src={HealthRecord} alt="Med Tracker" />
              </div>
            </div>
          </div>
          <div className="card-container" id="contact" ref={contactSectionRef}>
            <label className="h1 mb-5">Contact</label>
            <div className="form-group">
              <TextField 
              size="small"
              variant="outlined"
              className="form-control"
              label="Email"
              /></div>
              <br />
              <div>
              <TextField 
                multiline
                size="small"
                variant="outlined"
                className="form-control"
                label="Description"
              />
            </div>
            <br />
              <Button variant="contained" className="btn circle"id="loginbutton">Submit</Button>
          </div>
            
        
        </>
    );
};

export default Home;