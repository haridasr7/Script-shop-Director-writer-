import React, { useEffect } from 'react';
import './script.css'
import Menu from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField, CardActionArea } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScripts } from '../actions/writerAction'
import Loader from './Loader';
import Footerwriter from './writernavbar/Footerwriter';
import NavbarWriter from './writernavbar/NavbarWriter';
const RoundImage = styled('img')({
  maxWidth: '100%',
  height: '40px',
  borderRadius: '50%',
});
const buttonStyles = {
  borderRadius: '5px',
  border: '1px solid #14ABE4',
  color: '#14ABE4',
  fontWeight: 700,
  background: '#FFF',
};
const MyScript = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { loading, error, scripts } = useSelector((state) => state.writerState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllScripts(user._id));
    }
  }, [dispatch, user]);

  if (loading) {
    return <Loader />;
  }


  return (

    <>


      <NavbarWriter />


      <Container style={{ margin: '0' }} >
        <div >
          <p className='paraf' style={{ marginLeft: '15%', color: "gray" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis faucibus est, vel tincidunt<br />
            mi vehicula ac. Curabitur commodo eleifend mauris, in tristique ipsum fermentum vitae. Aenean<br /> dignissim neque mi, vel dictum nibh aliquam vitae. Donec auctor risus at justo dapibus, sed <br />
            efficitur velit sagittis.</p>
        </div>
        <div className='textfield-container' >
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            style={{
              flex: 1,
              maxWidth: '400px'
            }}
          />
          <Button variant="contained" style={{ backgroundColor: '#14ABE4', padding: "15px 30px" }}>Search</Button>
        </div>
      </Container>



      <Container className='slight' style={{ overflow: 'hidden' }}>
        <div className='fleximage'>
          {scripts.map((item) => {
            const {_id, movieName, synopsis, fileUrl } = item;
            return (
              <div key={_id}>
                <div className='buttonconatiner'>
                  <div className='twobuttons-mobile' style={{ float: "right" }}>
                    <Button variant="outlined" style={{ color: 'black', marginRight: "10px" }}>Edit</Button>
                    <Button variant="contained" style={{ color: 'white' }}>Delete</Button>
                  </div>
                </div>
                <hr className='hrs'></hr>
                <Grid container spacing={2}>
                  <Grid item lg={3} sm={3} xs={12} md={3}>
                    <h2 className='Lorem'>{movieName}</h2>
                    <div style={{ marginTop: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={fileUrl} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
                    </div>
                  </Grid>
                  <Grid item lg={9} sm={9} xs={12} md={9}>
                    <h2 className='Lorems'>{movieName}</h2>
                    <p>
                      {synopsis}
                    </p>
                  </Grid>
                </Grid>
                <hr className='hrs'></hr>
              </div>
            );
          })}
        </div>
      </Container> <br />

      <Footerwriter />



    </>
  );
};

export default MyScript;