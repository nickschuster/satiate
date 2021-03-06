import {
  makeStyles,
  TextField,
  Grid,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { AuthStates } from "./AuthStates";
import React, { useState } from "react";
import { formIsValid, validate, validateAll } from "../../util/formValidation";

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
  forgotPassword: {
    paddingLeft: 14,
  },
  control: {
    marginBottom: 10,
    [theme.breakpoints.down(400)]: {
      justifyContent: "center",
    },
  },
}));

export const Login = ({ setAuthState, login }) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  // Update form values.
  const handleChange = (type, event) => {
    const value = event.target.value;
    setUser((prev) => {
      prev[type] = value;
      return { ...prev };
    });
    validate(type, value, setFormErrors);
  };

  // Verify form values and login.
  const handleSubmit = () => {
    validateAll(formErrors, user, setFormErrors);
    if (formIsValid(formErrors)) {
      login(user);
    }
  };

  return (
    <>
      <form>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <TextField
              className={classes.input1}
              id="outlined"
              label="Email"
              variant="outlined"
              value={user.email}
              onChange={(event) => handleChange("email", event)}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              className={classes.input2}
              id="outlined"
              label="Password"
              variant="outlined"
              type="password"
              value={user.password}
              onChange={(event) => handleChange("password", event)}
            />
            <Typography variant="body2" className={classes.forgotPassword}>
              <Link
                onClick={() => setAuthState(AuthStates.resetPassword)}
                underline="always"
              >
                Forgot password?
              </Link>
            </Typography>
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
                    onClick={() => setAuthState(AuthStates.register)}
                    underline="always"
                  >
                    Create account.
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                >
                  <Typography variant="h5">Log in</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
