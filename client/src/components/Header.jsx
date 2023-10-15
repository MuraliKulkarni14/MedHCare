import React , { useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { UserContext } from "../UserContext";

import {Button,Menu,MenuItem} from "@mui/material";


import Logo from "../components/images/Logo.png"; 

import "./styles/Header.css"

//functions
import { logout } from "../api/user";

const Header = () =>{
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);


    const handleLogout =(e) =>{
        e.preventDefault();

        logout().then((res) => {
            toast.success(res.message);
            //set user to null
            setUser(null);
            //redirect to home
            navigate('/login')
        }).catch(err => console.log(err));
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={Logo} alt="" id="logo"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" id="toggler"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                { !user ? (<><li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Contact</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/">About</Link>
                    </li></>)
                    :
                    (<>
                    <div className="container-fluid">
                        <Button id="basic-button" 
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                        {user}
                        </Button>
                        <Menu 
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                        <MenuItem onClick={handleClose}><Link to="/getprofile">Profile</Link></MenuItem>
                        <MenuItem onClick={handleClose}><span onClick={()=>{navigate("/")}}>Contact</span></MenuItem>
                        <MenuItem onClick={handleClose}><span onClick={()=>{navigate("/")}}>About Us</span></MenuItem>

                        <MenuItem onClick={handleClose}><span  style={{cursor: "pointer"}} onClick={handleLogout}>Logout</span></MenuItem>
                        </Menu>
                    </div>
                    </>)
                    }
                </ul>
                </div>
                </div>
            </nav>
    );
};

export default Header;