export type APIParliamentMember = {
  sourceid: string;
  efternamn: string;
  tilltalsnamn: string;
  parti: string;
  bild_url_192: string;
  status: string;
};

export type ParliamentMember = {
  id: string;
  lastname: string;
  firstname: string;
  party: string;
  picture: string;
  status: string;
};

export interface ParliamentMemberListByParty {
  [key: string]: ParliamentMember[];
}
