import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";


import Logo from "../components/images/Logo.png"; 
import {Button} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles/Register.css"
//design
import { TextField,
        InputAdornment,
        IconButton,
        OutlinedInput,
        FormControl,
        InputLabel,
        FormHelperText,
    } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

//api functions
import{ register } from "../api/user";

const Signup = () =>{
    const navigate = useNavigate();

    //form states
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);


    //password validation
    let hasSixChar = password.length >= 6;
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-z0-9].*)/.test(password);

    const handleRegister = async (e) =>{
        e.preventDefault();

        try {
            const res = await register({username, email, password});
            if(res.error) toast.error(res.error)
            else{
                toast.success(res.message);
                //redirect to login
                navigate('/login');
            }
        } catch (err) {
            toast.error(err);
        }
    };


    return(
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
                    <Link className="nav-link" to="/login">Login</Link>
                    </li> 
                </ul>
                </div>
                </div>
            </nav>

        <div id="signupcontainer">
            <div className="mb-4">
                <label htmlFor="" className="h2">Sign Up</label>
            </div>
            <div className="form-group">
                <TextField size="small" variant="outlined" className="form-control" label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <br />
            <div className="form-group">
                <TextField size="small" variant="outlined" className="form-control" label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <br />
            <div className="form-group">
                <FormControl variant="outlined" size="small" className="form-control">
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput label="Password" 
                        value = {password}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment>
                            <IconButton edge="end" onClick={()=> setShowPassword(!showPassword)}>
                                {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                            </IconButton>
                        </InputAdornment>
                    }/>
                </FormControl>
                {   password &&(
                    
                    <div className="ms-1" style={{ columns:2}}>
                    <div>
							{hasSixChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> At Least 6 Characters</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> At Least 6 Characters</small>
								</span>
							)}
						</div>
                
                        <div>
							{hasLowerChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Lowercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Lowercase</small>
								</span>
							)}
						</div>

                    <div>
                    
                        {hasUpperChar ? (<span className="text-success">
                            <CheckCircleIcon className="mr-1" fontSize="small" />
                            <small> One Uppercase</small></span>):(
                                <span className="text-danger">
                                    <CancelIcon className="mr-1" fontSize="small" />
                                    <small> One Uppercase</small>
                                </span>
                            )}
                    </div>

                    <div>
                    {hasNumber ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Number</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Number</small>
								</span>
							)}
                    </div>

                    <div>
                    {hasSpecialChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Special Symbol</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small> One Special Symbol</small>
								</span>
							)}
                    </div>
                </div>)}
            </div>
                <br />
            <div className="form-group">
                <TextField size="small" type="password" variant="outlined" className="form-control" label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            {   password && confirmPassword &&
                <FormHelperText className="ms-1 mt-1">
                {password === confirmPassword ? <span className="text-success">Password Does Match</span> : <span className="text-danger">Password Does Not Match</span>}
                </FormHelperText>}
            <div className="d-grid gap-2 text-center mt-4">
                <Button variant="contained" disabled={!confirmPassword || !username || !email || !password || password !== confirmPassword || !hasSixChar || !hasLowerChar || !hasUpperChar || !hasNumber || !hasSpecialChar} onClick={handleRegister} id="signupbutton">SIGN UP</Button>
            </div>
        </div>
        </>
    )
}

export default Signup;