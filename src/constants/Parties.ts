type PartySettings = {
  title: string;
  icon: string;
};

export const Parties: { [party: string]: PartySettings } = {
  S: {
    title: "Socialdemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/s.jpg`,
  },
  KD: {
    title: "Kristdemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/kd.jpg`,
  },
  SD: {
    title: "Sverigedemokraterna",
    icon: `${process.env.PUBLIC_URL}/icons/sd.jpg`,
  },
  C: {
    title: "Centerpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/c.jpg`,
  },
  M: {
    title: "Moderaterna",
    icon: `${process.env.PUBLIC_URL}/icons/m.jpg`,
  },
  L: {
    title: "Liberalerna",
    icon: `${process.env.PUBLIC_URL}/icons/l.jpg`,
  },
  V: {
    title: "Vänsterpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/v.jpg`,
  },
  MP: {
    title: "Miljöpartiet",
    icon: `${process.env.PUBLIC_URL}/icons/mp.jpg`,
  },
  "-": {
    title: "Utan partibeteckning",
    icon: `${process.env.PUBLIC_URL}/icons/other.png`,
  },
};
