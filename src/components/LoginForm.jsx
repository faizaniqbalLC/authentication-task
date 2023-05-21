import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { enqueueSnackbar } from "notistack";

import { IconButton, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login, reset } from "../redux/slices/auth/authSlice";

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

export default function LoginForm({ isAuthenticated }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticate, isNotRegistered, isLoggedOut } = useSelector(
    (state) => state.authUser
  );
  useEffect(() => {
    if (isLoggedOut) {
      enqueueSnackbar("Logged Out SuccessFully", { variant: "success" });
      dispatch(reset());
    }
  }, [isLoggedOut, dispatch]);
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(state));
  };
  useEffect(() => {
    if (isNotRegistered === true) {
      enqueueSnackbar("Provide Correct Credentials or SignUp First.", {
        variant: "error",
      });
      dispatch(reset());
    }
  }, [isNotRegistered, dispatch]);
  useEffect(() => {
    if (isAuthenticate) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isAuthenticate]);

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
            Sign In
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
                  id="email"
                  label="Enter Email"
                  name="email"
                  autoFocus
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
                <Box mt={2}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Box>
                <Box style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                </Box>
                <Box mt={5}>
                  <Grid container>
                    <Grid item xs>
                      <RouterLink
                        to="/register"
                        variant="body2"
                        className={classes.footerLinks}
                      >
                        Register Now!
                      </RouterLink>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        className={classes.footerLinks}
                      >
                        Forgot Password?
                      </Link>
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

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool,
};
