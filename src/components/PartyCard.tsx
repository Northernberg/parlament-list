import { Card, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface PartyCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}
export const PartyCard: FC<PartyCardProps> = ({ title, icon, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        backgorundColor: 'black',
        width: '100%',
        cursor: 'pointer',
        transition: 'all 150ms ease-in-out',
        '&: hover': {
          transform: 'scale(1.15)',
          filter: 'brightness(0.9)',
        },
      }}
    >
      <Grid container alignItems='center' direction='column'>
        <img
          alt='Party image'
          src={`${icon}`}
          width='80'
          height='80'
          style={{ objectFit: 'contain' }}
        />
        <Typography
          variant='body2'
          width='100%'
          textAlign='center'
          sx={{ backgroundColor: '#264653', color: 'white' }}
        >
          {title}
        </Typography>
      </Grid>
    </Card>
  );
};
