import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState, useMemo, useEffect } from 'react';
import { ParliamentMemberCard, PartyList, SearchFilters } from '../components';
import { PartySettings } from '../constants/Parties';
import { useParliamentMemberStore } from '../contexts/ParliamentMemberContext';
import Fuse from 'fuse.js';
import { ParliamentMember } from '../types';
import DetailedParliamentView from '../components/DetailedParliamentView';
import { Clear } from '@mui/icons-material';
import { useDebounce } from '../hooks/useDebounce';

const fuseOptions = {
  useExtendedSearch: true,
  includeScore: true,
  keys: ['firstname', 'lastname', 'region'],
  threshold: 0.1,
  ignoreLocation: true,
};

const MainView: FC = () => {
  const { queryRes, parliamentMemberList, totalParliamentMembers } =
    useParliamentMemberStore();

  const [partySelected, setPartySelected] = useState<
    PartySettings | undefined
  >();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<ParliamentMember[] | null>(
    null
  );
  const [filteredMembers, setFilteredMembers] = useState<ParliamentMember[]>(
    []
  );

  const debouncedValue = useDebounce(searchText);

  const fuse = useMemo(() => {
    return new Fuse(queryRes?.data ?? [], fuseOptions);
  }, [queryRes?.data]);

  useEffect(() => {
    if (debouncedValue.trim().length <= 0) {
      setSearchResult(filteredMembers.length > 0 ? filteredMembers : null);
      return;
    }
    setSearchResult(fuse.search(debouncedValue).map((res) => res.item));
  }, [debouncedValue, setSearchResult, filteredMembers, fuse]);

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
  };

  const memberList = useMemo(() => {
    if (searchResult?.length === 0)
      return (
        <Typography
          color="primary"
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          No results found
        </Typography>
      );
    return (searchResult ?? queryRes?.data ?? []).map((member) => {
      return (
        <Grid key={member.id} container item md={6} lg={4} padding={2}>
          <ParliamentMemberCard {...member} displayIcon />
        </Grid>
      );
    });
  }, [searchResult, queryRes]);

  if (queryRes?.isLoading) {
    return <CircularProgress sx={{ margin: 'auto', marginTop: 2 }} />;
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
        onPartySelect={setPartySelected}
      />
      <Grid
        container
        direction="column"
        paddingX={{ md: 12, xs: 2 }}
        paddingY={2}
        gap={2}
        sx={{ backgroundColor: '#264653', color: 'white' }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: '#e9c46a' }}>
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
              onChange={(event) => setSearchText(event.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setSearchText('');
                    }}
                  >
                    <Clear />
                  </IconButton>
                ),
              }}
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchFilters setFilters={handleFilterUpdate} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: 'white', borderRadius: '4px', minHeight: 400 }}
        >
          {memberList}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainView;
