export type PartySettings = {
  key: string;
  title: string;
  icon: string;
};

export const Parties: { [party: string]: PartySettings } = {
  S: {
    key: "S",
    title: "Socialdemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/s.jpg`,
  },
  KD: {
    key: "KD",
    title: "Kristdemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/kd.jpg`,
  },
  SD: {
    key: "SD",
    title: "Sverigedemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/sd.jpg`,
  },
  C: {
    key: "C",
    title: "Centerpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/c.jpg`,
  },
  M: {
    key: "M",
    title: "Moderaterna",
    icon: `${process.env.PUBLIC_URL}/icons/m.jpg`,
  },
  L: {
    key: "L",
    title: "Liberalerna",
    icon: `${process.env.PUBLIC_URL}/icons/l.jpg`,
  },
  V: {
    key: "V",
    title: "Vänsterpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/v.jpg`,
  },
  MP: {
    key: "MP",
    title: "Miljöpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/mp.jpg`,
  },
  "-": {
    key: "-",
    title: "Utan partibeteckning",
    icon: `${process.env.PUBLIC_URL}/icons/other.png`,
  },
};
