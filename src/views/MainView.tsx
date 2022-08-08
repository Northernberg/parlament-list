import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState, useEffect, useMemo } from "react";
import { ParliamentMemberCard, PartyList } from "../components";
import { PartySettings } from "../constants/Parties";
import { useParliamentMemberStore } from "../contexts/ParliamentMemberContext";
import Fuse from "fuse.js";
import { ParliamentMember } from "../types";
import DetailedParliamentView from "../components/DetailedParliamentView";

const fuseOptions = {
  includeScore: true,
  keys: ["firstname"],
  threshold: 0.1,
};
const MainView: FC = () => {
  const { queryRes, parliamentMemberList, totalParliamentMembers } =
    useParliamentMemberStore();

  const [partySelected, setPartySelected] = useState<
    PartySettings | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<
    Fuse.FuseResult<ParliamentMember>[]
  >([]);

  const fuse = useMemo(() => {
    if (!queryRes?.data) return undefined;
    return new Fuse(queryRes.data, fuseOptions);
  }, [parliamentMemberList]);

  useEffect(() => {
    if (!fuse) return;
    const result = fuse.search(searchText);
    setSearchResult(result);
  }, [searchText, setSearchResult, fuse]);

  if (queryRes?.isLoading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
  }

  if (partySelected)
    return (
      <Grid container>
        <DetailedParliamentView
          partySelected={partySelected}
          parliamentMemberList={parliamentMemberList}
          setPartySelected={setPartySelected}
        />
      </Grid>
    );

  return (
    <Grid container gap={4}>
      <PartyList
        totalParliamentMembers={totalParliamentMembers}
        onPartySelect={(party) => setPartySelected(party)}
      />
      <Grid container direction="column" paddingX={2}>
        <Typography variant="h5">Search for members</Typography>
        <TextField
          size="small"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </Grid>
      <Grid container sx={{ backgroundColor: "white" }}>
        {searchResult.length > 0
          ? searchResult.map((member) => {
              return (
                <Grid
                  key={member.item.id}
                  container
                  item
                  xs={6}
                  md={4}
                  paddingY={2}
                  paddingX={2}
                >
                  <ParliamentMemberCard {...member.item} displayIcon />
                </Grid>
              );
            })
          : queryRes?.data?.map((member) => {
              return (
                <Grid
                  key={member.id}
                  container
                  item
                  xs={6}
                  md={4}
                  paddingY={2}
                  paddingX={2}
                >
                  <ParliamentMemberCard {...member} displayIcon />
                </Grid>
              );
            })}
      </Grid>
    </Grid>
  );
};

export default MainView;
