import axios from "axios";
import {
  APIParliamentMember,
  ParliamentMember,
} from "../types/ParliamentMember";

export interface ParliamentMemberListResponse {
  personlista: {
    person: APIParliamentMember[];
  };
}
const reviveParliamentMemberList = (
  person: APIParliamentMember
): ParliamentMember => {
  return {
    gender: person.kons || "",
    firstname: person.tilltalsnamn || "",
    lastname: person.efternamn || "",
    party: person.parti || "",
    picture: person.bild_url_80 || "",
  };
};

export const fetchParliamentMembers = async () => {
  const res = await axios.get<ParliamentMemberListResponse>(
    "https://data.riksdagen.se/personlista/?utformat=json"
  );
  return res.data.personlista.person.map(reviveParliamentMemberList);
};
