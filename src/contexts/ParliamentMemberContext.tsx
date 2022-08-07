import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { fetchParliamentMembers } from '../adapters/riksdagenAdapter';
import { ParliamentMember, ParliamentMemberListByParty } from '../types';

interface ParliamentMemberContextState {
  parliamentMemberList: ParliamentMemberListByParty;
  queryRes: UseQueryResult<ParliamentMember[]> | undefined;
  totalParliamentMembers: number | undefined;
}

const ParliamentMemberContext = createContext<ParliamentMemberContextState>({
  parliamentMemberList: {},
  queryRes: undefined,
  totalParliamentMembers: undefined,
});

const sortMembersByParty = (
  member: ParliamentMember[]
): ParliamentMemberListByParty => {
  return member.reduce(
    (memberList: ParliamentMemberListByParty, currentMember) => {
      const dataToPush: ParliamentMember[] =
        memberList[currentMember.party] ?? [];

      dataToPush.push(currentMember);
      memberList[currentMember.party] = dataToPush;

      return memberList;
    },
    {}
  );
};

export const useParliamentMemberStore = () =>
  useContext(ParliamentMemberContext);

export const ParliamentMemberProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [parliamentMemberList, setParliamentMemberList] =
    useState<ParliamentMemberListByParty>({});

  const queryRes = useQuery(['persons'], fetchParliamentMembers, {
    onSuccess: (ParliamentMembers) => {
      const sortedMemberList = sortMembersByParty(ParliamentMembers);
      setParliamentMemberList(sortedMemberList);
    },
  });

  return (
    <ParliamentMemberContext.Provider
      value={{
        queryRes,
        parliamentMemberList,
        totalParliamentMembers: queryRes?.data?.length,
      }}
    >
      {children}
    </ParliamentMemberContext.Provider>
  );
};
