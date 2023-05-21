import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from "./routes/Routes";
function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#337ab7" },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes />
        <SnackbarProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
