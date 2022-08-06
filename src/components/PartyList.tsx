import { Grid, Box, Typography } from "@mui/material";
import { FC } from "react";
import { Parties, PartySettings } from "../constants/Parties";
import { PartyCard } from "./PartyCard";

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
        <Typography variant="body1" width="100%">
          Partierna i riksdagen
        </Typography>
        <Typography variant="body2">
          Det finns {totalParliamentMembers} ledamöter
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
              md={2}
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
