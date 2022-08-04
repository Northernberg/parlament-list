import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchParliamentMembers } from "../adapters/riksdagenAdapter";
import { ParliamentMember } from "../types/ParliamentMember";

export const useParliamentMemberStore = () => {
  const [parliamentMemberList, setParliamentMemberList] = useState<
    ParliamentMember[]
  >([]);

  const queryRes = useQuery(["persons"], fetchParliamentMembers, {
    onSuccess: (parliantMembers) => setParliamentMemberList(parliantMembers),
  });

  const parties = useMemo(() => {
    return new Set(parliamentMemberList.map((member) => member.party));
  }, [parliamentMemberList]);

  return {
    queryRes,
    parliamentMemberList,
    parties,
  };
};
