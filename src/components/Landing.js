import React from 'react'
import './Landing.css'
import { logout } from '../actions/userActions';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Menu from '@mui/icons-material/Menu';
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import Navbarlanding from './navbarlanding/Navbarlanding';
import FooterLanding from './navbarlanding/Footerlanding';
const GridContainer = styled('div')({
    flexGrow: 1,
    margin: 0,
    padding: (props) => props.theme.spacing(2),
});
const Card = styled(Paper)({
    borderRadius: 22,
    background: '#F5F5F5',
    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
    height: 469,
    padding: (props) => props.theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
});
const Landing = () => {
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout);
    };
    return (
        <div>
            {/* <div className='lfirst' style={{ overflow: "hidden" }}>
                <div style={{ margin: '2%' }} className='header'>
                    <nav className='lnavbar' style={{ display: "flex", alignItems: "center" }}>
                        <div className='mainlogo'>
                            <img src={process.env.PUBLIC_URL + '/images/camera.png'} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                        <div className='llinkss'>
                            <ul className='llinksnav'>
                                <li style={{ color: "#14ABE4" }}>Home</li>
                                <li>Services</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='lbutt'>
                            <Menu className='lmenuicon' ></Menu>
                        </div>
                        <div className='ltwobuttons'>
                            {isAuthenticated ? (
                                <Button class="lcustom-button" variant="contained" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button class="lcustom-button" variant="contained" onClick={() => navigate('/login')}>
                                        Login
                                    </Button>
                                    <Button class="lcustom-button" variant="contained" onClick={() => navigate('/signup')}>
                                        Signup
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div> */}
            <Navbarlanding />
            <Container sx={{ overflowX: 'hidden' }}>
                <Grid container spacing={2} style={{ marginTop: '15%' }}>
                    <Grid item xs={12} lg={6}>
                        <Container sx={{ overflowX: 'hidden' }}>
                            <div className='ltwotext' style={{ color: 'green' }}>
                                <h3>NO MORE STORIES UNHEARD</h3>
                            </div>
                            <div className='onepara'>
                                <p>
                                    Script Shop is a gathering of writers and directors. The cleverest way to share scripts and synopsis,
                                    easy collaborations.
                                </p>
                            </div>
                            <div>
                                {isAuthenticated ? (
                                    <Link to="/PublishScript">
                                        <Button className="lbcustom-button" variant="contained" style={{ backgroundColor: "#14ABE4" }}>
                                            Publish Your First Script
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <Button className="lbcustom-button" variant="contained" style={{ backgroundColor: "#14ABE4" }}>
                                            Publish Your First Script
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img src={'/images/landingimage.png'} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ marginTop: '4%', overflowX: 'hidden' }}>
                <div>
                    <h3 style={{ textAlign: 'center' }}>Benifits</h3>
                </div>
                <Container sx={{ marginLeft: '0%', marginTop: '2%' }}>
                    <GridContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} sm={12} lg={4}>
                                <Card className="equal-height-card" style={{ height: 'auto', textAlign: 'center', alignItems: 'center', padding: "2vw" }}>
                                    It allows writers and directors can easily collaborate on film projects, streamlining the
                                    scriptwriting process.
                                    Directors can scout for fresh talent and unique scripts that might not have been
                                    accessible through traditional channels.
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} lg={4}>
                                <Card className="equal-height-card" style={{ height: 'auto ', textAlign: 'center', alignItems: 'center', padding: "2vw" }}>
                                    Analytics tools can provide valuable insights into script engagement, helping writers
                                    understand how readers respond to their work.
                                    Writers can showcase their scripts to a broader audience, increasing their chances
                                    of getting noticed and potentially having their scripts produced
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} lg={4}>
                                <Card className="equal-height-card" style={{ height: 'auto', textAlign: 'center', alignItems: 'center', padding: "2vw" }}>
                                    Implementing security features can protect writers' intellectual property and prevent
                                    unauthorized use of their work.
                                    Users can receive feedback and reviews on their scripts, helping them refine and
                                    improve their work.
                                </Card>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </Container>
            </Container><br /><br />
            <FooterLanding />
        </div>
    )
}
export default Landing;