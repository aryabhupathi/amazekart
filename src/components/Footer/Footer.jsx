import React from 'react'
import { Box, Typography } from '@mui/material'
const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: "center", py: 2, mt: 4, backgroundColor: "#C0C0C0" }}>
    <Typography variant="body2" color="textSecondary"> {new Date().getFullYear()} CodeGama. All rights reserved.</Typography>
  </Box>
  )
}

export default Footer