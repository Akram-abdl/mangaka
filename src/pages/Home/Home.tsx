import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Manga } from "../../models/Manga";
import MangaCardComponent from "../../component/MangaItem/MangaCardComponent";
import { getAllMangas } from "../../API_Calls/getAllMangas";
import { alpha, Box, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMangas, setSearch } from "../../redux/mangaSlice";

export interface IHomePageProps {}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const auth = getAuth();

  const [mangas, setMangas] = useState<Manga[]>([]);
  const { search, mangasList, error } = useAppSelector((store) => store.mangas);
  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    dispatch(setSearch(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchMangas(""));
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      setMangas(
        mangas.filter((manga) =>
          manga.attributes.title.en.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setMangas(mangasList);
    }
  }, [search, mangasList]);

  return (
    <div>
      <p>Home Page (Protected by Firebase!)</p>

      <Container>
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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={handleChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container spacing={4}>
          {mangas.map((manga) => (
            <Grid item key={manga.id}>
              <MangaCardComponent
                title={manga.attributes.title.en}
                mangaId={manga.id}
                description={manga.attributes.description.en}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
    </div>
  );
};

export default HomePage;
