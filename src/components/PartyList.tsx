import { Grid, Typography } from '@mui/material';
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
      <Grid
        container
        paddingY={2}
        paddingX={{ xs: 4, md: 12 }}
        sx={{ backgroundColor: '#264653' }}
      >
        <Typography variant="h5" width="100%" sx={{ color: '#e9c46a' }}>
          Parties
        </Typography>
        <Typography variant="body2" sx={{ color: 'white' }}>
          There are {totalParliamentMembers} parliament members
        </Typography>
      </Grid>
      <Grid container paddingX={{ xs: 2, md: 10 }}>
        {Object.entries(Parties).map(([_, party]) => {
          return (
            <Grid
              key={party.title}
              container
              item
              xs={6}
              sm={4}
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
