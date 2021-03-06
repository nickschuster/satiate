import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Link,
  Typography,
  Button,
} from "@material-ui/core";
import { AuthStates } from "./AuthStates";

// Styling.
const useStyles = makeStyles((theme) => ({
  input2: {
    width: "100%",
    marginTop: 20,
  },
  input1: {
    width: "100%",
    marginTop: 30,
  },
  control: {
    marginBottom: 10,
    [theme.breakpoints.down(400)]: {
      justifyContent: "center",
    },
  },
}));

export const ForgotPassword = ({ setAuthState, forgotPassword }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  return (
    <>
      <form>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <TextField
              className={classes.input1}
              id="outlined"
              label="Email, phone number or username"
              variant="outlined"
              value={email}
              onChange={(evt) => handleChange(evt)}
            />
          </Grid>
          <Grid item xs={10}>
            <Grid
              container
              spacing={3}
              justify="space-between"
              direction="row"
              alignItems="center"
              className={classes.control}
            >
              <Grid item>
                <Typography variant="h5">
                  <Link
                    onClick={() => setAuthState(AuthStates.login)}
                    underline="always"
                  >
                    Sign in
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => forgotPassword(email)}
                >
                  <Typography variant="h5">Send code</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
