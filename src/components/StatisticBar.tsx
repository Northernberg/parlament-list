import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";

interface StatisticBarProps {
  groupA: { title: string; percentage: number };
  groupB: { title: string; percentage: number };
}
export const StatisticBar: FC<StatisticBarProps> = ({ groupA, groupB }) => {
  if (groupA.percentage === -1 || groupB.percentage === -1) return null;
  return (
    <Grid container wrap="nowrap" gap={2} paddingY={2}>
      <Typography variant="body2" fontWeight="bold">
        {groupA.title}
      </Typography>
      <Grid container height="25px">
        <Box
          display="flex"
          flexBasis={`${groupA.percentage}%`}
          borderRadius="4px 0px 0px 4px"
          sx={{ backgroundColor: "#2a9d8f" }}
        />
        <Box
          display="flex"
          flexBasis={`${groupB.percentage}%`}
          borderRadius="0px 4px 4px 0px"
          sx={{ backgroundColor: "#f4a261" }}
        />
      </Grid>
      <Typography variant="body2" fontWeight="bold">
        {groupB.title}
      </Typography>
    </Grid>
  );
};
