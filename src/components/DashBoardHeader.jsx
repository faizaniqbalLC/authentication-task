import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/auth/authSlice";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={handleLogOut}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
