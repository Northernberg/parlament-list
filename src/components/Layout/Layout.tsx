import { Grid } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Grid container padding={2}>
        {children}
      </Grid>
    </>
  );
};
