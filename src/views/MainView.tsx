import { CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";
import { Parties } from "../constants/Parties";
import { useParliamentMemberStore } from "../hooks/useParliamentMemberStore";

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, parties } =
    useParliamentMemberStore();
  if (queryRes.isLoading) return <CircularProgress />;
  console.log(parliamentMemberList);
  return (
    <Grid container>
      {Object.entries(Parties).map(([_, party]) => {
        return (
          <Grid container item xs={2}>
            <Typography variant="body2">{party.title}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MainView;
