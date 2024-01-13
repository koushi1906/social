import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import Reels from '../../components/Reels/Reels'
import CreateReelsForm from '../../components/Reels/CreateReelsForm'
import Profile from '../Profile/Profile'
import HomeRight from '../../components/HomeRight/HomeRight'
import SideBar from '../../components/sidebar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store)
  return (
    <div className='px-20'>
        <Grid container spacing={0}>
            <Grid item xs={0} lg={3}>
                <div className='sticky top-0'>
                    <SideBar />
                </div>
            </Grid>

            <Grid item lg={location.pathname === "/" ? 6 : 9} className='px-5 justify-center flex' xs={12}>
                <Routes>
                    <Route path='/' element={<MiddlePart />} />
                    <Route path='/reels' element={<Reels />} />
                    <Route path='/create-reels' element={<CreateReelsForm />} />
                    <Route path='/profile/:id' element={<Profile />} />

                </Routes>
            </Grid>

            {location.pathname === "/" && <Grid item lg={3} className='relative'>
                <div className='sticky top-0 w-full'>
                    <HomeRight />
                </div>
            </Grid>}
        </Grid>
    </div>
  )
}

export default HomePage