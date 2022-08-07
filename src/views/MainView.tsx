import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState, useEffect, useMemo } from 'react';
import { ParliamentMemberCard, PartyList } from '../components';
import { PartySettings } from '../constants/Parties';
import { useParliamentMemberStore } from '../contexts/ParliamentMemberContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fuse from 'fuse.js';
import { ParliamentMember } from '../types';

const fuseOptions = {
  includeScore: true,
  keys: ['firstname'],
  threshold: 0.1,
};
const MainView: FC = () => {
  const { queryRes, parliamentMemberList, totalParliamentMembers } =
    useParliamentMemberStore();

  const [partySelected, setPartySelected] = useState<
    PartySettings | undefined
  >();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<
    Fuse.FuseResult<ParliamentMember>[]
  >([]);

  console.log(parliamentMemberList);
  console.log(parliamentMemberList);
  const fuse = useMemo(
    () =>
      new Fuse(
        Object.values(parliamentMemberList).reduce((allMembers, currParty) => {
          allMembers.push(...currParty);
          return allMembers;
        }, []),
        fuseOptions
      ),
    [parliamentMemberList]
  );

  console.log(fuse);

  console.log(fuse.search('ebba'));
  useEffect(() => {
    console.log(searchText);
    const result = fuse.search(searchText);
    setSearchResult(result);
  }, [searchText, setSearchResult, fuse]);

  if (queryRes?.isLoading) {
    return <CircularProgress sx={{ margin: 'auto' }} />;
  }

  console.log(searchResult);
  return (
    <Grid container>
      {partySelected ? (
        <Grid container paddingX={2}>
          <Slide direction='right' in={true} mountOnEnter unmountOnExit>
            <Box>
              <Grid container wrap='nowrap'>
                <Button
                  variant='outlined'
                  onClick={() => setPartySelected(undefined)}
                >
                  <ArrowBackIcon /> Back
                </Button>
                <Grid
                  container
                  justifyContent='center'
                  alignItems='end'
                  wrap='nowrap'
                >
                  <img
                    src={partySelected.icon}
                    width='50px'
                    height='50px'
                    style={{ objectFit: 'contain' }}
                  />
                  <Box>
                    <Typography textAlign='center'>
                      {partySelected.title}
                    </Typography>
                    <Typography
                      textAlign='center'
                      variant='body2'
                      fontWeight='bold'
                    >
                      {parliamentMemberList[partySelected.key].length}
                      Parliament Members
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                {parliamentMemberList[partySelected.key].map((member) => (
                  <Grid container item xs={4}>
                    <ParliamentMemberCard {...member} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        </Grid>
      ) : (
        <PartyList
          totalParliamentMembers={totalParliamentMembers}
          onPartySelect={(party) => setPartySelected(party)}
        />
      )}
      <Grid container direction='column'>
        <Typography variant='h5'>Search for members</Typography>
        <TextField
          size='small'
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {searchResult.map((resultingMember) => resultingMember.item.firstname)}
      </Grid>
    </Grid>
  );
};

export default MainView;
