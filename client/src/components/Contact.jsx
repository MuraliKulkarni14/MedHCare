import React,{useRef} from 'react'
import { TextField,Button } from '@mui/material'
const Contact = () => {

const contactSectionRef = useRef(null);
  return (
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
  )
}

export default Contact