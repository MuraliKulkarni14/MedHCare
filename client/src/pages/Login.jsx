import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { TextField, InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel, Button} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles/Login.css";

//header imports
import Logo from "../components/images/Logo.png"; 
import { Link } from "react-router-dom";





const Login = () => {
  const navigate = useNavigate();
  const { setUser} = useContext(UserContext);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        setUser(res.username);
          navigate('/');
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={Logo} alt="" id="logo"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" id="toggler"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="#">Contact</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li> 
                </ul>
                </div>
                </div>
            </nav>




    <div id="logincontainer">
      <div className=" mb-5 ">
        <label htmlFor="" className="h2">Login</label>
        <br />
        <br />
        <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div className="form-group">
        <FormControl variant="outlined" size="small" className="form-control">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment>
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className=" d-grid gap-2 text-center mt-4 ">
        <Button variant="contained" disabled={!email || !password} onClick={handleLogin} className="btn circle"id="loginbutton">Login</Button>
      </div>
      </div>
    </div>
    
    
    
    </>
  );
}

export default Login;
