import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
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
import { Clear } from "@mui/icons-material";

const fuseOptions = {
  useExtendedSearch: true,
  includeScore: true,
  keys: ["firstname", "lastname", "region"],
  threshold: 0.1,
  ignoreLocation: true,
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

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [filteredMembers, setFilteredMembers] = useState<ParliamentMember[]>(
    []
  );

  const fuse = useMemo(() => {
    return new Fuse(queryRes?.data ?? [], fuseOptions);
  }, [queryRes?.data]);

  const searchDelay = (value: string) => {
    setSearchText(value);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        onSearchSubmit(value);
      }, 500)
    );
  };

  const handleFilterUpdate = (party: string | null) => {
    if (!queryRes?.data) return;
    let filtered;

    if (party === null) {
      fuse.setCollection(queryRes.data);
    } else {
      filtered = queryRes.data.filter((member) => member.party === party);
      setFilteredMembers(filtered);
      fuse.setCollection(filtered);
    }

    setSearchResult(
      searchText.trim().length > 0
        ? fuse.search(searchText).map((res) => res.item)
        : filtered ?? null
    );
  };

  const onSearchSubmit = (value: string) => {
    if (value.trim().length <= 0) {
      setSearchResult(filteredMembers.length > 0 ? filteredMembers : null);
      return;
    }
    setSearchResult(fuse.search(value).map((res) => res.item));
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
            Search for name or region
          </Typography>
        </Box>
        <Grid container wrap="nowrap" gap={2} alignItems="end">
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(event) => searchDelay(event.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setSearchText("");
                      onSearchSubmit("");
                    }}
                  >
                    <Clear />
                  </IconButton>
                ),
              }}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchFilters
              setFilters={(party) => {
                handleFilterUpdate(party);
              }}
            />
          </Grid>
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
