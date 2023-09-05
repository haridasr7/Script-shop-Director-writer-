import './LoginPage.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthError } from "../actions/userActions";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, user, error, isAuthenticated } = useSelector(state => state.authState);
  const handleToggleConfirmPasswordVisibility = () => {
    setShowPassword((Showpassword) => !password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setRole(selectedValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();



    dispatch(login(email, password, role))
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(role)
    // Reset the form
    setEmail('');
    setPassword('');
    setRole('');
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user.role[0] === 'writer') {
        navigate('/Writerhome');
      }
      else if (user.role[0] === 'director') {
        navigate("/Directorhome");
      }

    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };



  // }, [error, isAuthenticated, dispatch, navigate]);
  return (

    <div className='Loginmain'>

      <div>
        {/* <div className='lsub'> */}
        <h4 className='te4'>Welcome ScriptShop.in</h4>
        {'\n'}
        <p className='p1'><b>We missed you. </b>Please enter your<br></br> email address and password to log in.....
        </p>
        <img className='lim1' src='./Images/logoin.png' />
      </div>
      <div className='box'>
        <h2 className='t1'>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            {/* <select className='selection'onChange={handleSelectChange}> 
              <label value="Select Role">Select Role</label>
               <option value="director">Director</option>
               <option value="writer">Writer</option>
              </select> */}
            <select name="role" value={role} className="selection" onChange={handleSelectChange} required>
              <option value="" disabled>
                Select role
              </option>
              <option value="writer">Writer</option>
              <option value="director">Director</option>
              {/* <option value="director/writer">Director/Writer</option> */}
            </select>
            <input type="te" placeholder='Email or Username' className='email' value={email} onChange={handleEmailChange} required />
          </label>
          <br />
          {/* <label>
                <input type="password" placeholder='Password' className='pass' value={password} onChange={handlePasswordChange} required />
              
              </label> */}
          <label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              className="pass"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <VisibilityOffIcon className='siconbutton23' onClick={handleTogglePasswordVisibility} />
            ) : (
              <VisibilityIcon className='siconbutton23' onClick={handleTogglePasswordVisibility} />
            )}
          </label>
          <br />



          <br />
          <button className='llbutt' type="submit">Login</button>
        </form>
        <div>
          <Link to='/Forget'><p className='link1'>Forgot Password</p></Link>
        </div>
        <div>
          <p className='link2'>Don’t have an Account?</p>
          <Link to='/signup'><p className='link9'><b>Sign Up</b></p></Link>
        </div>
      </div>
    </div>

  );
};
export default LoginPage;