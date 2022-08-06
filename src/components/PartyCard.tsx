import { Card, Grid, Typography } from "@mui/material";
import { FC } from "react";

interface PartyCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}
export const PartyCard: FC<PartyCardProps> = ({ title, icon, onClick }) => {
  return (
    <Card sx={{ width: "100%" }} onClick={onClick}>
      <Grid container alignItems="center" direction="column">
        <img
          src={`${icon}`}
          width="80"
          height="80"
          style={{ objectFit: "contain" }}
        />
        <Typography variant="body2">{title}</Typography>
      </Grid>
    </Card>
  );
};
