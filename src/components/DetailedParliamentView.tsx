import { Box, Grid, Button, Typography, Slide } from '@mui/material';
import { FC, useMemo } from 'react';
import { ParliamentMemberCard } from './ParliamentMemberCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PartySettings } from '../constants/Parties';
import { ParliamentMemberListByParty } from '../types';
import { StatisticBar } from '.';

interface DetailedParliamentViewProps {
  partySelected: PartySettings;
  parliamentMemberList: ParliamentMemberListByParty;
  setPartySelected: (party: PartySettings | undefined) => void;
}
const DetailedParliamentView: FC<DetailedParliamentViewProps> = ({
  partySelected,
  setPartySelected,
  parliamentMemberList,
}) => {
  const genderStatistics = useMemo(() => {
    const allPartyMembers = parliamentMemberList[partySelected.key];
    const maleAmount = allPartyMembers.filter(
      (member) => member.gender === 'man'
    );
    const femaleAmount = allPartyMembers.filter(
      (member) => member.gender === 'kvinna'
    );
    return {
      gender: [
        parseInt(
          ((maleAmount.length / allPartyMembers.length) * 100).toFixed()
        ),
        parseInt(
          ((femaleAmount.length / allPartyMembers.length) * 100).toFixed()
        ),
      ],
    };
  }, [parliamentMemberList, partySelected.key]);

  return (
    <Slide
      direction="right"
      in={true}
      mountOnEnter
      unmountOnExit
      style={{ width: '100%', backgroundColor: 'white' }}
    >
      <Box>
        <Grid container paddingX={{ md: 12, xs: 2 }} paddingTop={2}>
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={() => setPartySelected(undefined)}
            sx={{ height: 'fit-content' }}
          >
            <ArrowBackIcon /> Back
          </Button>
          <Grid container wrap="nowrap" alignItems="start">
            <Grid
              container
              justifyContent="center"
              alignItems="end"
              wrap="nowrap"
              gap={2}
              paddingBottom={2}
            >
              <img
                alt="party icon"
                src={partySelected.icon}
                width="50px"
                height="50px"
                style={{ objectFit: 'contain' }}
              />
              <Typography textAlign="center" variant="h5">
                {partySelected.title}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" fontWeight="bold" width="100%">
            {`${parliamentMemberList[partySelected.key].length} Parliament
                Members with`}{' '}
            <span
              style={{ color: '#2a9d8f' }}
            >{`${genderStatistics.gender[0]}%`}</span>{' '}
            Male and{' '}
            <span
              style={{ color: '#f4a261' }}
            >{`${genderStatistics.gender[1]}%`}</span>{' '}
            Female members
          </Typography>
          <StatisticBar
            groupA={{ title: 'Male', percentage: genderStatistics.gender[0] }}
            groupB={{ title: 'Female', percentage: genderStatistics.gender[1] }}
          />
        </Grid>
        <Grid container paddingX={{ md: 10 }}>
          {parliamentMemberList[partySelected.key].map((member) => (
            <Grid key={member.id} container item md={6} lg={4} padding={2}>
              <ParliamentMemberCard {...member} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Slide>
  );
};

export default DetailedParliamentView;
