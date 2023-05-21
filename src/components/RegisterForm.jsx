import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { IconButton, InputAdornment, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register, reset } from "../redux/slices/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    height: 580,
    margin: "100px auto",
    borderRadius: "15px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    borderRadius: "25px",
    height: "50px",
    width: "150px",
    fontSize: "15px",
    "&:hover": {
      backgroundColor: "black",
      borderColor: "black",
      boxShadow: "none",
    },
  },
  footerLinks: {
    color: "black",
  },
  cardMedia: {
    position: "relative",
  },
}));

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { isNotRegistered, isRegistered } = useSelector(
    (state) => state.authUser
  );
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isNotRegistered === true) {
      enqueueSnackbar("Invalid User Details.", {
        variant: "error",
      });
      dispatch(reset());
    }
  }, [isNotRegistered, dispatch]);
  useEffect(() => {
    if (isRegistered) {
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      navigate("/login");
      dispatch(reset());
      dispatch(reset());
    }
  }, [isRegistered, dispatch]);
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(state));
    setState({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Card className={classes.root}>
        <div className={classes.cardMedia}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="160"
            image="/back.avif"
            title="React is Magic"
          />
          <div
            style={{
              position: "absolute",
              color: "white",
              top: "35%",
              left: "50%",
              fontSize: "40px",
              transform: "translateX(-50%)",
            }}
          >
            Register
          </div>
        </div>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Enter Name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Enter Email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Enter Password"
                  value={state.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="password"
                />
                <Box style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </Box>
                <Box mt={2}>
                  <Grid container>
                    <Grid item xs>
                      <Typography variant="body1" align="center" sx={{ mt: 3 }}>
                        Already have an account?{" "}
                        <RouterLink to="/login">Login here</RouterLink>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </div>
          </Container>
        </CardContent>
      </Card>
    </>
  );
}
