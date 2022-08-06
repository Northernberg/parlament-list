import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { PartyList } from "../components";
import { PartySettings } from "../constants/Parties";
import { useParliamentMemberStore } from "../contexts/ParliamentMemberContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, totalParliamentMembers } =
    useParliamentMemberStore();
  const [partySelected, setPartySelected] = useState<
    PartySettings | undefined
  >();

  if (queryRes?.isLoading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  console.log(parliamentMemberList);

  return (
    <Grid container>
      {partySelected ? (
        <Box paddingX={2}>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Grid container direction="column">
              <Button
                variant="outlined"
                onClick={() => setPartySelected(undefined)}
              >
                <ArrowBackIcon /> Tillbaka
              </Button>
              <Grid container wrap="nowrap">
                <img
                  src={partySelected.icon}
                  width="50px"
                  height="50px"
                  style={{ objectFit: "contain" }}
                />
                <p> {partySelected.title}</p>
                <Grid container direction="column">
                  <p> Members: </p>
                  {parliamentMemberList[partySelected.key].map((member) => (
                    <p>{member.firstname}</p>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Slide>
        </Box>
      ) : (
        <PartyList
          totalParliamentMembers={totalParliamentMembers}
          onPartySelect={(party) => setPartySelected(party)}
        />
      )}
    </Grid>
  );
};

export default MainView;
