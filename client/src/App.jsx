import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState,useEffect } from 'react';
import {UserContext} from './UserContext';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//components
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEditForm';
import Footer from './components/Footer'

//functions
import { getUser } from './api/user';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = getUser().then((res) => {
      if(res.error) toast(res.error);
      else setUser(res.username)
    }).catch((err) => toast(err));

    return () => unsubscribe;
  },[]);

  return (
    <>
    <div className='content-container'>
      <Router>
        <UserContext.Provider value = {{user,setUser}}>
          <ToastContainer />
          {/* <Navigate to={user ? '/' : 'signup'}/> */}
          <Routes>
            <Route exact path="/" Component={Home} />
            {
              !user ? (
              <>
              <Route exact path='/login' Component={Login}/>
              <Route exact path="/signup" Component={Signup} />
              </>)
              : (
              <>
              <Route exact path = "/getprofile" Component={Profile}/>
              <Route exact path='/setprofile' Component={ProfileEdit}/>
              </>
              )
            }
            
            
          </Routes>
        </UserContext.Provider>
      </Router>
      </div>
      <footer className='footer--pin'>
      <Footer />
      </footer>
    
    </>
  );
};

export default App;
