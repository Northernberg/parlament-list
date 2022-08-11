import { Box, Grid, Button, Typography, Slide } from "@mui/material";
import { FC, useMemo } from "react";
import { ParliamentMemberCard } from "./ParliamentMemberCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PartySettings } from "../constants/Parties";
import { ParliamentMemberListByParty } from "../types";
import { StatisticBar } from ".";

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
  const genderStatistics = useMemo(() => {
    const allPartyMembers = parliamentMemberList[partySelected.key];
    const maleAmount = allPartyMembers.filter(
      (member) => member.gender === "man"
    );
    const femaleAmount = allPartyMembers.filter(
      (member) => member.gender === "kvinna"
    );
    return {
      gender: [
        (maleAmount.length / allPartyMembers.length) * 100,
        (femaleAmount.length / allPartyMembers.length) * 100,
      ],
    };
  }, [parliamentMemberList, partySelected.key]);

  return (
    <Slide
      direction="right"
      in={true}
      mountOnEnter
      unmountOnExit
      style={{ width: "100%", backgroundColor: "white" }}
    >
      <Box>
        <Grid container paddingX={12} paddingTop={2}>
          <Button
            color="primary"
            size="small"
            variant="text"
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
              alt="party icon"
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
          <Typography variant="body1" fontWeight="bold">
            Gender distribution in party
          </Typography>
          <StatisticBar
            groupA={{ title: "Male", percentage: genderStatistics.gender[0] }}
            groupB={{ title: "Female", percentage: genderStatistics.gender[1] }}
          />
        </Grid>
        <Grid container paddingX={10}>
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
