import React, {useEffect, useState,useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbarlanding.css';
import '../Landing.css';
import { Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

function Navbarlanding() {
  const [isOpenD1, setIsOpenD1] = useState(false);
  const [isOpenD2, setIsOpenD2] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );

  const handleArrowClick = () => {
    setIsOpenD1(!isOpenD1);
  };

  const handleLogout = () => {
    dispatch(logout);
  };

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside the dropdown container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenD1(false);
      }
    };

    // Attach the event listener when the popup is open
    if (isOpenD1) {
      document.addEventListener('click', handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or the popup is closed
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpenD1]);

  return (
    <div className="navbarMainDiv">
      <nav className="CommonNavbar">
        <div className="Navleft-section">
        <Link style={{ textDecoration: 'none' }} id='DNImageLink' to={'/'}> <img
            className="CNavLogo"
            src="./images/navbarLogo.png"
            alt="Logo"
          /></Link>
        </div>
        <div className="Navcenter-section">
          {!isAuthenticated ? null : (
            <>
              {user.role == 'writer' ? (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Writerhome')}>
                <Typography id="navbarC3Typo">Home</Typography>
                </div>
                 
               
              ) : (
               
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Directorhome')}>
                <Typography id="navbarC3Typo">Home</Typography>
                </div>
                
              )}
            </>
          )}
          <Link
            to="/services"
            className={location.pathname === '/services' ? 'Navbaractive' : 'NavbarInactive'}
          >
            <Typography id="navbarC3Typo1">Services</Typography>
          </Link>
          <Link
            to="/ContactUs"
            className={
              location.pathname === '/ContactUs' ? 'Navbaractive' : 'NavbarInactive'
            }
          >
            <Typography id="navbarC3Typo2">Contact Us</Typography>
          </Link>
        </div>

        <div className="Navright-section" style={{ paddingLeft: '20%' }}>
          <div className="ltwobuttons">
            {isAuthenticated ? (
              <Button
                class="lcustom-button"
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  class="lcustom-button"
                  variant="contained"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  class="lcustom-button"
                  variant="contained"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="navbarFollowers">
        <IconButton
          id="NavbarCMenu"
          sx={{ marginLeft: 'auto' }}
          onClick={(event)=>{ event.stopPropagation(); setIsOpenD1(!isOpenD1)}}
        >
          <MenuIcon />
        </IconButton>

        {isOpenD1 && (
          <div className="navbarCdropdown-menu1" ref={dropdownRef}>
            <div className="navbarCdropdown-menuDiv">
              <Typography className="navbarCdropdown-menuTypo">Menu</Typography>
              <IconButton onClick={() => setIsOpenD1(!isOpenD1)}>
                <CloseIcon />
              </IconButton>
            </div>
            <hr className="navdropHr2"></hr>
            <ul className="navbarCdropdown-menuUL">
                <li>
                {!isAuthenticated ? null : (
            <>
              {user.role == 'writer' ? (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Writerhome')}>
                <p className="navbarCdropdown-menuTypo">Home</p>
                </div>
                 
               
              ) : (
             
               
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Directorhome')}>
                <p className="navbarCdropdown-menuTypo">Home</p>
                </div>
                
              )}
            </>
          )}
                </li>
             
              <Link to="/services" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Services</p>
                    <IconButton>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/contact" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Contact Us</p>
                    <IconButton>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/login" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Login</p>
                    <IconButton>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/signup" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Sign Up</p>
                    <IconButton>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
            </ul>

            <hr className="navdropHr1"></hr>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbarlanding;