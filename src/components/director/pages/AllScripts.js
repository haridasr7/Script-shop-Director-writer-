import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Typography,Pagination } from '@mui/material'
import Navbar from '../component/NavbarDirector'
import FooterDirector from '../component/FooterDirector';
import {useDispatch, useSelector, } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllScripts } from '../../../actions/scriptAction';
import Loader from '../../Loader';
import './allScripts.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { toast } from "react-toastify";
import { clearAuthError } from '../../../actions/userActions';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';


function AllScripts() {

    const [ currentPage,setCurrentPage] = useState(1)
    const [siblingCount, setSiblingCount] = useState(1);
    const [paginationSize, setPaginationSize] = useState("medium");
  
    const {loading,scripts,error,totalPages} = useSelector((state)=> state.scriptsState)

    const {genre,type} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
     
    dispatch(getAllScripts(type,genre,currentPage))
      
    }, [dispatch,currentPage])

    useEffect(() => {
     
      if(error){
        toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          
          
        })
        navigate('/Directorhome')
       
      }
     
    }, [error])


    //pagination size change
  useEffect(() => {
    function updateSiblingCount() {
      const screenWidth = window.innerWidth;
      // You can adjust the breakpoint and siblingCount values as per your design needs
      if (screenWidth <= 600) {
        setSiblingCount(0); // On smaller devices, set siblingCount to 0 to stack all buttons
        setPaginationSize("small")
      } else {
        setSiblingCount(1); // On larger devices, set siblingCount to 1 for default behavior
        setPaginationSize("medium")
      }
    }

    // Update siblingCount on initial mount and when the window is resized
    updateSiblingCount();
    window.addEventListener('resize', updateSiblingCount);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateSiblingCount);
    };
  }, []);

  const handleBackward = () =>{
    
    navigate('/Directorhome')
  }
  const handleReadmore = (scriptId) =>{

    

    
    navigate(`/readmore/${scriptId}`);


  }
    

  return (
    <Fragment>
      {loading ? <Loader/> :
      
      <Fragment>
        <div>
        <Navbar/>
        
      <div className='ASMain'>
      <div className='ASMS1'>
         {scripts && scripts.length > 0 ? (
          <div className='ASMS1DM'>
          <div className='ASMS1DMD1'>
          <IconButton onClick={handleBackward}><KeyboardBackspaceIcon id='ASMS1DMD1Icon'/></IconButton>
          <Typography id='ASMS1DMD1T1'>{genre?genre:"all"}</Typography> 
          </div>
          <div className='ASMS1DMD2'>
          
          {scripts && scripts.map((script)=>(
          <Card key={script._id} id='ASMS1DMCard' onClick={()=>handleReadmore(script._id)}>
              
              {script.fileUrl ? <img className='ASMS1DMCardI' src={script.fileUrl} alt='CardImage' />:
              <IconButton>
                <MovieFilterOutlinedIcon id='DHIIcon2'/>
              </IconButton>
              }
              <div className='ASMS1DMCardT1D'>{script.movieName}</div>
              <Typography id='ASMS1DMCardT2'>$1000</Typography>

            </Card>
            ))}
           
           
           
            
          </div>
          </div>):<div className='DHMS5NO'> <p>No {genre} scripts available.</p></div>
          }
       </div>

      </div>

      <div className='ASpagination'>
      <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            size={paginationSize}
            showFirstButton
            showLastButton
            siblingCount={siblingCount}
            boundaryCount={1}
            
            
       />
      </div>
      <FooterDirector/>
      </div>
      </Fragment>}
    </Fragment>

    
  )
}

export default AllScripts