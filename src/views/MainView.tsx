import { Grid } from "@mui/material";
import { FC } from "react";
import { PartyList, Searchbar } from "../components";
import { useParliamentMemberStore } from "../hooks/useParliamentMemberStore";

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, parties } =
    useParliamentMemberStore();
  return (
    <Grid container gap={2}>
      <Searchbar />
      <PartyList />
    </Grid>
  );
};

export default MainView;
