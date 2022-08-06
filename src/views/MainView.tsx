import { Grid } from "@mui/material";
import { FC } from "react";
import { Searchbar } from "../components";
import { MemberList } from "../components";
import { useParliamentMemberStore } from "../hooks/useParliamentMemberStore";

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, parties } =
    useParliamentMemberStore();
  return (
    <Grid container gap={2}>
      <Searchbar />
      <MemberList
        memberList={parliamentMemberList}
        isLoading={queryRes.isLoading}
      />
    </Grid>
  );
};

export default MainView;
