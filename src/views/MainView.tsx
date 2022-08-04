import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { useParliamentMemberStore } from "../hooks/useParliamentMemberStore";

export const MainView: FC = () => {
  const { queryRes, parliamentMemberList } = useParliamentMemberStore();
  if (queryRes.isLoading) return <CircularProgress />;
  console.log(parliamentMemberList);
  return <div>{parliamentMemberList.length}</div>;
};
