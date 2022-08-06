import { FC, useState } from "react";
import { Parties } from "../constants/Parties";
import { Button, Grid, Slide } from "@mui/material";
import { PartyCard } from ".";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const PartyList: FC = () => {
  const [partySelected, setPartySelected] = useState<string | undefined>();
  return (
    <Grid container gap={4}>
      {partySelected ? (
        <div>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div>
              <Button onClick={() => setPartySelected(undefined)}>
                <ArrowBackIcon /> Tillbaka
              </Button>
              <p> {partySelected}</p>
            </div>
          </Slide>
        </div>
      ) : (
        <>
          {Object.entries(Parties).map(([_, party]) => {
            return (
              <Grid key={party.title} container item xs={4} sm={3} md={2}>
                <PartyCard
                  {...party}
                  onClick={() => setPartySelected(party.title)}
                />
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};
