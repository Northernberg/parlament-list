import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState, useMemo } from "react";
import { ParliamentMemberCard, PartyList, SearchFilters } from "../components";
import { PartySettings } from "../constants/Parties";
import { useParliamentMemberStore } from "../contexts/ParliamentMemberContext";
import Fuse from "fuse.js";
import { ParliamentMember } from "../types";
import DetailedParliamentView from "../components/DetailedParliamentView";

const fuseOptions = {
  useExtendedSearch: true,
  includeScore: true,
  keys: ["firstname", "lastname", "region", "party"],
  threshold: 0.2,
};

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, totalParliamentMembers } =
    useParliamentMemberStore();

  const [partySelected, setPartySelected] = useState<
    PartySettings | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<ParliamentMember[] | null>(
    null
  );

  const [filters, setFilters] = useState<{ party: string | null }>({
    party: null,
  });

  const fuse = useMemo(() => {
    return new Fuse(queryRes?.data ?? [], fuseOptions);
  }, [queryRes?.data]);

  const onSearchSubmit = () => {
    let filteredQueryRes;
    if (queryRes?.data) {
      if (filters.party === null) {
        fuse.setCollection(queryRes.data);
      } else {
        const filtered = queryRes.data.filter(
          (member) => member.party === filters.party
        );
        fuse.setCollection(filtered);
        filteredQueryRes = filtered;
      }
    }
    if (searchText.trim().length <= 0) {
      setSearchResult(filteredQueryRes ?? queryRes?.data ?? null);
      return;
    }
    setSearchResult(fuse.search(searchText).map((res) => res.item));
  };

  const memberList = useMemo(() => {
    if (searchResult?.length === 0)
      return (
        <Typography
          color="primary"
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          No results found
        </Typography>
      );
    return (searchResult ?? queryRes?.data ?? []).map((member) => {
      return (
        <Grid
          key={member.id}
          container
          item
          xs={6}
          md={4}
          paddingY={2}
          paddingX={2}
          height="fit-content"
        >
          <ParliamentMemberCard {...member} displayIcon />
        </Grid>
      );
    });
  }, [searchResult, queryRes]);

  if (queryRes?.isLoading) {
    return <CircularProgress sx={{ margin: "auto", marginTop: 2 }} />;
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
      <Grid
        container
        direction="column"
        paddingX={12}
        paddingY={2}
        gap={2}
        sx={{ backgroundColor: "#264653", color: "white" }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: "#e9c46a" }}>
            Search for members
          </Typography>
          <Typography variant="body2" fontStyle="italic">
            Search for name, region or party
          </Typography>
        </Box>
        <Grid container wrap="nowrap" gap={2} alignItems="end">
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchFilters
              setFilters={(value) => setFilters({ party: value })}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={onSearchSubmit}>
            Search
          </Button>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "4px", minHeight: 400 }}
        >
          {memberList}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainView;
