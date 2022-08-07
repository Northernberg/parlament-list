import { Grid, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { Parties, PartySettings } from '../constants/Parties';
import { PartyCard } from './PartyCard';

interface PartyListProps {
  totalParliamentMembers: number | undefined;
  onPartySelect: (party: PartySettings) => void;
}
export const PartyList: FC<PartyListProps> = ({
  totalParliamentMembers,
  onPartySelect,
}) => {
  return (
    <Grid container>
      <Box paddingX={2}>
        <Typography variant='h5' width='100%'>
          Parties
        </Typography>
        <Typography variant='body2'>
          There are {totalParliamentMembers} parliament members
        </Typography>
      </Box>
      <Grid container>
        {Object.entries(Parties).map(([_, party]) => {
          return (
            <Grid
              key={party.title}
              container
              item
              xs={4}
              sm={3}
              paddingX={2}
              paddingY={2}
            >
              <PartyCard {...party} onClick={() => onPartySelect(party)} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
