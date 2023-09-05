import React from 'react'
import './footerlanding.css'
import { Typography} from '@mui/material'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function FooterLanding() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  return (
    <div className='FDMainDiv'>
        <div className='FDMS1D'>
            <div className='FDMS1DS1'>
                <img className='FDMS1DS1Img' src='./images/footerLogo.png' alt='footer'/>
                <Typography id='FDMS1DS1T1'>Share. Create. Inspire.</Typography>
            </div>
            <div className='FDMS1DS2'>
                <div className='FDMS1DS2Main'>
            <div className='FDMS1DS2D1'>
                <Typography id='FDMS1DS2T1'>Useful Links</Typography>
                {!isAuthenticated ? null : (
            <>
              {user.role == 'writer' ? (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Writerhome')}>
                <Typography id='FDMS1DS2T3'>Home</Typography>
                </div>
              ) : (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/Directorhome')}>
                <Typography id='FDMS1DS2T3'>Home</Typography>
                </div>
              )}
            </>
          )}
                <Link to='/services' id='FDMS1DS2T1Link1'><Typography id='FDMS1DS2T3'>Services</Typography></Link>
                <Link to='/ContactUs' id='FDMS1DS2T1Link2' ><Typography id='FDMS1DS2T4'>Contact Us</Typography></Link>
                <div className='line-space'></div>
            </div>
            <div className='FDMS1DS2D2'>
                <Typography id='FDMS1DS2T5'>Address</Typography>
                <Typography id='FDMS1DS2T6'>Address here</Typography>
                
            </div>
            </div>
            </div>
        </div>
        <div className='FMCopyright'>
            <Typography id='FMCopyrightT'>Copyright @ Year, Name. All Right Reserved</Typography>
        </div>
    </div>
  )
}
export default FooterLanding