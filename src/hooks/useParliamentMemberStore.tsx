import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchParliamentMembers,
  ParliamentMemberListResponse,
} from "../adapters/riksdagenAdapter";
import {
  APIParliamentMember,
  ParliamentMember,
} from "../types/ParliamentMember";

export const useParliamentMemberStore = () => {
  const [parliamentMemberList, setParliamentMemberList] = useState<
    ParliamentMember[]
  >([]);

  const queryRes = useQuery(["persons"], fetchParliamentMembers, {
    onSuccess: (parliantMembers) => setParliamentMemberList(parliantMembers),
  });

  return {
    queryRes,
    parliamentMemberList,
  };
};
