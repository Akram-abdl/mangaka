import { Button, Container, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addMoney, getMoney } from "../../utils/firebaseSetup";

export default function Profile() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchAmount() {
      if (!user?.email) return;
      const result = await getMoney(user.email);
      if (result === undefined) {
        setBalance(0);
      } else {
        setBalance(result);
      }
    }
    fetchAmount();
  }, [user?.email]);

  if (loading) {
    return <Typography> Loading... </Typography>;
  } else if (user?.email) {
    return (
      <Container>
        <Typography>Current user : {user.displayName}</Typography>
        <Typography>Current balance: {balance}</Typography>
      </Container>
    );
  } else if (error) {
    return <Typography>There was an authentication error.</Typography>;
  }
  return (
    <Container>
      <Typography>Current user : not found</Typography>
    </Container>
  );
}
