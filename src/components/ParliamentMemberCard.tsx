import { Card, Typography } from '@mui/material';
import { FC } from 'react';

interface ParliamentMemberCardProps {
  firstname: string;
  lastname: string;
  picture: string;
}
export const ParliamentMemberCard: FC<ParliamentMemberCardProps> = ({
  firstname,
  lastname,
  picture,
}) => {
  return (
    <Card>
      <img src={picture} alt='profile picture' />
      <Typography>{firstname}</Typography>
      <Typography>{lastname}</Typography>
    </Card>
  );
};
