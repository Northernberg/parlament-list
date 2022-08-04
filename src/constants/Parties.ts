type PartySettings = {
  title: string;
};

export const Parties: { [party: string]: PartySettings } = {
  S: {
    title: "Socialdemokraterna",
  },
  KD: {
    title: "Kristdemokraterna",
  },
  SD: {
    title: "Sverigedemokraterna",
  },
  C: {
    title: "Centerpartiet",
  },
  M: {
    title: "Moderaterna",
  },
  L: {
    title: "Liberalerna",
  },
  V: {
    title: "Vänsterpartiet",
  },
  MP: {
    title: "Miljöpartiet",
  },
  "-": {
    title: "Utan partibeteckning",
  },
};
