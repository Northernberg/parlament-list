import { Grid } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <Grid container justifyContent="center" wrap="nowrap" gap={2}>
      <NavLink to="/">Partier</NavLink>
      <NavLink to="/search">Sök medlemmar</NavLink>
    </Grid>
  );
};
