import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './Loading.css'


const Loading = ({open}) => {
  return (
    <div className='loading-page'>
      <div className="loader">
<CircularProgress color="warning"/>

      </div>
    </div>
  )
}

export default Loading