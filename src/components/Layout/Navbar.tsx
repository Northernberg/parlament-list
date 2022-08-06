import { Button, Grid } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent="center"
      wrap="nowrap"
      gap={2}
      bgcolor="#264653"
    >
      <Button
        onClick={() => navigate("/")}
        sx={{
          color: "white",
        }}
      >
        Partier
      </Button>
      <Button
        onClick={() => navigate("/search")}
        sx={{
          color: "white",
        }}
      >
        Sök medlemmar
      </Button>
    </Grid>
  );
};
