export type APIParliamentMember = {
  efternamn: string;
  kon: string;
  tilltalsnamn: string;
  parti: string;
  bild_url_192: string;
  valkrets: string;
  // Used along with 'sorteringsnamn' to create URL
  sourceid: string;
  sorteringsnamn: string;
};

export type ParliamentMember = {
  id: string;
  lastname: string;
  gender: string;
  firstname: string;
  party: string;
  picture: string;
  region: string;
  url: string;
};

export interface ParliamentMemberListByParty {
  [key: string]: ParliamentMember[];
}
