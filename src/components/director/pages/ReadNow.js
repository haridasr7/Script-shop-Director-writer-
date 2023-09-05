import React, { useEffect,Fragment,useState } from 'react'
import './readAndDownload.css'
import {useDispatch, useSelector, } from 'react-redux'
import { getPdf } from '../../../actions/scriptAction';
import Loader from '../../Loader';
import { saveAs } from 'file-saver';
import BlobPDFViewer from '../component/PDFViewer';
import { toast } from "react-toastify";
import { clearAuthError } from '../../../actions/userActions';
import { useNavigate,useLocation, Link, Navigate,useParams } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';
import Navbar from '../component/NavbarDirector'
import { Button, Typography } from '@mui/material';
import FooterDirector from '../component/FooterDirector';

function ReadNow() {

    const {scriptId} = useParams()
 
    const [pdfUrl, setpdfUrl] = useState(false)

    const { loading,error,script,pdfFile } = useSelector(state => state.scriptsState)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {

      if(scriptId){
        dispatch(getPdf(scriptId))
        setpdfUrl(true)

      }
      else{
        navigate('/purchasehistory')
      }
   
    }, [])
    useEffect(() => {

      if(error){
        toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
         
        })
       navigate('/purchasehistory')
       

      }
      
   
    }, [error])

    
    const handleDownloadPDF = () => {
      saveAs(pdfFile, 'downloaded_file.pdf');
    };

    const handleBackRM = () =>{
      navigate('/purchasehistory')
    }
    
    
    


    
  return (
    <Fragment>
   
    {loading ? <Loader/>:
      <Fragment>
        <div>
        <Navbar/>
    <div className='RADMain'>
      <div className='RADMainS1'>
        <div className='RADMainS1Back'><Button onClick={handleBackRM} id='RADMainS1Backbutton'>Back</Button></div>
      <div className='RADMainS1D1'> 
      <Typography>Download File</Typography>
      <IconButton id='scriptDownloadRNIB' onClick={handleDownloadPDF}><CloudDownloadIcon id='scriptDownloadRM'/></IconButton>
      </div>
      {pdfUrl &&
      <BlobPDFViewer blobURL = {pdfFile}/>
      
    }
     </div>
    </div>
    <FooterDirector/>
    </div>
    </Fragment>
    }
    </Fragment>
  )
}

export default ReadNow