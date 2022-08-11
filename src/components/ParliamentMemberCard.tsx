import { Card, Grid, Typography, Box } from "@mui/material";
import { FC } from "react";
import { Parties } from "../constants/Parties";

interface ParliamentMemberCardProps {
  firstname: string;
  lastname: string;
  picture: string;
  region: string;
  party: string;
  url: string;
  displayIcon?: boolean;
}

const styles: { [key: string]: { color: string } } = {
  S: {
    color: "#E40929",
  },
  KD: {
    color: "#015EA1",
  },
  SD: {
    color: "#5AC0F0",
  },
  C: {
    color: "#134738",
  },
  M: {
    color: "#8ED9F9",
  },
  L: {
    color: "#0168B3",
  },
  V: {
    color: "#DF352B",
  },
  MP: {
    color: "#0FAA4C",
  },
  "-": {
    color: "#264653",
  },
};

export const ParliamentMemberCard: FC<ParliamentMemberCardProps> = ({
  firstname,
  lastname,
  picture,
  region,
  party,
  url,
  displayIcon = false,
}) => {
  return (
    <Card
      sx={{ width: "100%", boxShadow: 6 }}
      onClick={() => {
        window.open(
          `https://www.riksdagen.se/sv/ledamoter-partier/ledamot/${url}`,
          "_blank"
        );
      }}
    >
      <Grid
        container
        wrap="nowrap"
        sx={{
          borderLeft: "4px solid",
          borderColor: party in styles ? styles[party].color : "#264653",
          position: "relative",
        }}
      >
        <img src={picture} width="80" alt="parliament member" />
        <Box display="flex" flexDirection="column" flexGrow={1} paddingX={1}>
          <Typography
            width="100%"
            variant="body1"
            fontWeight="bold"
          >{`${firstname} ${lastname}`}</Typography>
          <Typography
            variant="body2"
            fontWeight="light"
            color="gray"
          >{`${region}`}</Typography>
        </Box>
        {displayIcon && (
          <Box display="flex" alignSelf="start">
            <img
              alt="party icon"
              src={Parties[party].icon}
              width="40"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Grid>
    </Card>
  );
};
