import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../Sidebar'

const Layout = ({children, sidebar}) => {
  return (
    <Container>
        <Grid container spacing={3} py={4} sx={{alignItems: 'flex-start'}}>
            <Grid size={{xs: 12, md: 3}} bgcolor={'white'} boxShadow={1}>
                <Box>
                    {sidebar}
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 9}}>
                {children}
            </Grid>
        </Grid>
    </Container>
  )
}

export default Layout