import React from 'react'
import './footerDirector.css'
import { Typography} from '@mui/material'
import { Link, useLocation,useNavigate } from 'react-router-dom';
function FooterDirector() {
  return (
    <div className='FDMainDiv'>
        <div className='FDMS1D'>
            <div className='FDMS1DS1D'>
                <img className='FDMS1DS1ImgD' src='/images/footerLogo.png' alt='footer'/>
                <Typography id='FDMS1DS1T1D'>Share. Create. Inspire.</Typography>
            </div>
            <div className='FDMS1DS2D'>
                <div className='FDMS1DS2Main'>
            <div className='FDMS1DS2D1'>
                <Typography id='FDMS1DS2T1D'>Useful Links</Typography>
                <Link to='/Directorhome' id='FDMS1DS2T1Link'><Typography id='FDMS1DS2T2'>Home</Typography></Link>
                <Link to='/services' id='FDMS1DS2T1Link1'><Typography id='FDMS1DS2T3'>Services</Typography></Link>
                <Link to='/ContactUs' id='FDMS1DS2T1Link2' ><Typography id='FDMS1DS2T4'>Contact Us</Typography></Link>
            </div>
            <div className='FDMS1DS2D2'>
                <Typography id='FDMS1DS2T5D'>Address</Typography>
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

export default FooterDirector