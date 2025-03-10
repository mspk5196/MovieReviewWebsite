import React, { useEffect, useState } from 'react'
import '../../styles/pages/Home.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import HomeSlider from '../../components/Slider/HomeSlider';
import Movies from './Movies';
import Shows from './Shows';

export default function Home() {

  return (
    <div className='HomeDiv'>
      <div className='slider'>
      <HomeSlider />
      </div>

      <Movies/>

      <Shows/>
    </div>
  )
}
