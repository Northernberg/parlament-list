import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <Grid
      container
      justifyContent='center'
      wrap='nowrap'
      gap={2}
      bgcolor='#264653'
      padding={2}
    >
      <Typography variant='h5' sx={{ color: '#e9c46a' }}>
        Parliament Helper
      </Typography>
    </Grid>
  );
};
