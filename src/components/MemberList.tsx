import { FC } from "react";
import { ParliamentMember } from "../types";
import { Parties } from "../constants/Parties";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { PartyCard } from ".";

interface MemberListProps {
  memberList: ParliamentMember[];
  isLoading?: boolean;
}

export const MemberList: FC<MemberListProps> = ({
  memberList,
  isLoading = false,
}) => {
  if (isLoading) return <CircularProgress />;

  return (
    <Grid container gap={4}>
      {Object.entries(Parties).map(([_, party]) => {
        return (
          <Grid container item xs={4} sm={3} md={2}>
            <PartyCard {...party} />
          </Grid>
        );
      })}
    </Grid>
  );
};
