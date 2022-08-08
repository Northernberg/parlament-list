import axios from "axios";
import { APIParliamentMember, ParliamentMember } from "../types";

export interface ParliamentMemberListResponse {
  personlista: {
    person: APIParliamentMember[];
  };
}
const reviveParliamentMemberList = (
  person: APIParliamentMember
): ParliamentMember => {
  return {
    id: person.sourceid || "",
    firstname: person.tilltalsnamn || "",
    lastname: person.efternamn || "",
    party: person.parti || "",
    picture: person.bild_url_192 || "",
    status: person.status || "",
  };
};

export const fetchParliamentMembers = async () => {
  const res = await axios.get<ParliamentMemberListResponse>(
    "https://data.riksdagen.se/personlista/?utformat=json"
  );
  return res.data.personlista.person.map(reviveParliamentMemberList);
};
