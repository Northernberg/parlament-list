import { Card, Grid, Typography, Box } from "@mui/material";
import { FC } from "react";
import { Parties } from "../constants/Parties";

interface ParliamentMemberCardProps {
  firstname: string;
  lastname: string;
  picture: string;
  status: string;
  party: string;
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
  status,
  party,
  displayIcon = false,
}) => {
  return (
    <Card sx={{ width: "100%", boxShadow: 6 }}>
      <Grid
        container
        wrap="nowrap"
        sx={{
          borderLeft: "4px solid",
          borderColor: party in styles ? styles[party].color : "#264653",
          position: "relative",
        }}
      >
        <img src={picture} width="80" alt="profile picture" />
        <Box>
          <Typography
            width="100%"
            variant="body1"
            fontWeight="bold"
          >{`${firstname} ${lastname}`}</Typography>
          <Typography
            variant="body2"
            fontWeight="light"
            color="gray"
          >{`${status}`}</Typography>
        </Box>
        {displayIcon && (
          <img
            src={Parties[party].icon}
            width="40"
            style={{ objectFit: "contain", position: "absolute", right: 0 }}
          />
        )}
      </Grid>
    </Card>
  );
};
