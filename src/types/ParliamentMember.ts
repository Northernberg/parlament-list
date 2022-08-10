export type APIParliamentMember = {
  sourceid: string;
  efternamn: string;
  tilltalsnamn: string;
  parti: string;
  bild_url_192: string;
  valkrets: string;
};

export type ParliamentMember = {
  id: string;
  lastname: string;
  firstname: string;
  party: string;
  picture: string;
  region: string;
};

export interface ParliamentMemberListByParty {
  [key: string]: ParliamentMember[];
}
