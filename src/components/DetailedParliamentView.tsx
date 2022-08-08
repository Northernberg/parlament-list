import { Box, Grid, Button, Typography, Slide } from "@mui/material";
import { FC } from "react";
import { ParliamentMemberCard } from "./ParliamentMemberCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PartySettings } from "../constants/Parties";
import { ParliamentMemberListByParty } from "../types";

interface DetailedParliamentViewProps {
  partySelected: PartySettings;
  parliamentMemberList: ParliamentMemberListByParty;
  setPartySelected: (party: PartySettings | undefined) => void;
}
const DetailedParliamentView: FC<DetailedParliamentViewProps> = ({
  partySelected,
  setPartySelected,
  parliamentMemberList,
}) => {
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box>
        <Grid paddingX={2} paddingTop={2} sx={{ backgroundColor: "white" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setPartySelected(undefined)}
            sx={{ height: "fit-content" }}
          >
            <ArrowBackIcon /> Back
          </Button>
          <Grid
            container
            justifyContent="center"
            alignItems="end"
            wrap="nowrap"
            gap={2}
            paddingBottom={2}
          >
            <img
              src={partySelected.icon}
              width="50px"
              height="50px"
              style={{ objectFit: "contain" }}
            />
            <Box>
              <Typography textAlign="center">{partySelected.title}</Typography>
              <Typography textAlign="center" variant="body2" fontWeight="bold">
                {parliamentMemberList[partySelected.key].length} Parliament
                Members
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ backgroundColor: "white" }}>
          {parliamentMemberList[partySelected.key].map((member) => (
            <Grid
              key={member.id}
              container
              item
              xs={6}
              md={4}
              paddingY={2}
              paddingX={2}
            >
              <ParliamentMemberCard {...member} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Slide>
  );
};

export default DetailedParliamentView;
