export type APIParliamentMember = {
  kons: string;
  efternamn: string;
  tilltalsnamn: string;
  parti: string;
  bild_url_80: string;
};

export type ParliamentMember = {
  gender: string;
  lastname: string;
  firstname: string;
  party: string;
  picture: string;
};

export interface ParliamentMemberListByParty {
  [key: string]: ParliamentMember[];
}
