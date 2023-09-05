import React from 'react'
import './privacypolicy.css'
import NavbarWriter from './writernavbar/NavbarWriter'
import Footerwriter from './writernavbar/Footerwriter'
import { Container, Box } from '@mui/material'
import {useDispatch, useSelector, } from 'react-redux'

import Navbarlanding from './navbarlanding/Navbarlanding';
import FooterLanding from './navbarlanding/Footerlanding';

import Navbar from '../components/director/component/NavbarDirector'
import FooterDirector from '../components/director/component/FooterDirector';
const Privacypolicy = () => {

    const {loading,error,message,user} = useSelector((state)=> state.authState)
    return (
        <div>
           {user ? (user.role[0] === 'director' ? <Navbar /> : <NavbarWriter />) : ( <Navbarlanding />)}<br />
            <div className='wprivacypolicy' style={{ marginTop: '15%' }}>
                <Container >
                <Box>
                <h3>Privacy & Policy</h3>
                    <h5 style={{ marginTop: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h5>
                </Box>
                    <Box
                        sx={{
                            padding: '20px',
                            color: 'rgba(0, 0, 0, 0.50)'
                        }}
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis ante eget risus pellentesque, eget finibus quam interdum. Donec vel libero nec ex pulvinar euismod. Sed vitae turpis ipsum. Morbi in sagittis arcu. Integer sit amet consectetur lorem. Aliquam eget velit nec sem faucibus feugiat vel et justo. Nulla facilisi. Mauris semper enim nec ante finibus malesuada. Aenean ultricies, augue in ullamcorper lobortis, justo erat dignissim quam, a dignissim lectus est in lectus. Sed at ex vestibulum, consequat enim sit amet, placerat velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus eu lacus augue. Integer nec gravida arcu. Donec interdum massa vel purus ultricies tristique. In ullamcorper elementum gravida. Mauris id feugiat ligula. Mauris vulputate tempor gravida. Ut malesuada eu massa at malesuada. Aliquam sit amet tortor ac turpis dictum tincidunt. In et lacus auctor, pellentesque lacus id, consectetur neque. Nullam quis leo sit amet quam sollicitudin ullamcorper nec id sem. Vivamus varius felis a commodo faucibus. Nam eu diam sed neque posuere tincidunt. Curabitur vulputate pharetra felis, sed laoreet lectus tempus at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam</p>
                    </Box>
                </Container>
            </div><br/><br/><br/>
            {user ? (user.role[0] === 'director' ?<FooterDirector/>: <Footerwriter/>) : ( <FooterLanding />)}
        </div>
    )
}
export default Privacypolicy