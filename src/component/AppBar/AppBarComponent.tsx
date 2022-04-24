import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

export default function AppBarComponent() {
  const auth = getAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MANGAKA
          </Typography>
          <Link href="/" underline="hover" color={"white"}>
            {"Home"}
          </Link>
          <Link href="/profile" underline="hover" color={"white"} sx={{ m: 2 }}>
            {"Profile"}
          </Link>
          <button onClick={() => signOut(auth)}>Sign out</button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
