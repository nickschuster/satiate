import { Container, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({});

const Leaderboards = () => {
  const classes = useStyles();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) setUser(currentUser);
    })();
  }, []);

  return (
    <>
      <Container>
        <LeaderboardTitle />
        <Leaderboard />
      </Container>
    </>
  );
};

export default Leaderboards;
