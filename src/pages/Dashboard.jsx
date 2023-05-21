import { useLayoutEffect } from "react";

import { Box, Toolbar, Typography, Container } from "@mui/material";
import DashboardHeader from "../components/DashBoardHeader";
import TableDashBoard from "../components/TableDashBoard";

const Dashboard = () => {
  useLayoutEffect(() => {
    document.title = "DashBoard Page";
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardHeader />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="md">
          <Typography variant="h6" color="text.primary" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          <Typography
            variant="p"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Check Baseball Players Name by Sample API
          </Typography>
          <TableDashBoard />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
