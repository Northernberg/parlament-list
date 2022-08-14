import { MenuItem, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useParliamentMemberStore } from "../contexts/ParliamentMemberContext";

interface SearchFiltersProps {
  setFilters: (value: string | null) => void;
}
export const SearchFilters: FC<SearchFiltersProps> = ({ setFilters }) => {
  const { parliamentMemberList } = useParliamentMemberStore();
  const [partyFilter, setPartyFilter] = useState<string>("");

  return (
    <TextField
      label="Party"
      select
      variant="filled"
      value={partyFilter}
      fullWidth
      sx={{ backgroundColor: "white", borderRadius: "4px" }}
    >
      <MenuItem
        key="reset"
        value=""
        onClick={() => {
          setPartyFilter("");
          setFilters(null);
        }}
      >
        All
      </MenuItem>
      {Object.keys(parliamentMemberList ?? {}).map((party) => {
        if (party === "-") {
          return (
            <MenuItem
              key={party}
              value={party}
              onClick={() => {
                setPartyFilter(party);
                setFilters(party);
              }}
            >
              Without party designation
            </MenuItem>
          );
        }
        return (
          <MenuItem
            key={party}
            value={party}
            onClick={() => {
              setPartyFilter(party);
              setFilters(party);
            }}
          >
            {party}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
