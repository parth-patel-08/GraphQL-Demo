import React from 'react'
import { CircularProgress } from '@mui/material'

function Spinner() {
  return (
    <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }} />
  )
}

export default Spinner
