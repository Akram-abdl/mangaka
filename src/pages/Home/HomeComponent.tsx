import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';



import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField/TextField';
import { MangaTest } from '../Test/MangaTest';
import { Manga } from '../../models/Manga';
import MangaCard from '../../component/MangaItem/MangaCard';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const auth = getAuth();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [mangas, setMangas] = useState<Manga[]>([]);
    const getAllMangas = async () => {
        const mangas = await MangaTest();
        setMangas(mangas);
    }

    useEffect(() => {
        async function fetchMangas () {
            await getAllMangas();

        }
        fetchMangas();
    },[])
    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            

            
                <Container>
                <AppBar position="relative">
                
                    <Toolbar>
                    
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button variant="contained">
                        Search
                    </Button>
                    </Toolbar>
                </AppBar>
                    <Grid container spacing={4}>
                        {mangas.map((manga) => (
                            <Grid item key={manga.id}><MangaCard title={manga.attributes.title.en}/></Grid>
                        ))}
                    </Grid>
                </Container>
                
            
            
            <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
        </div>
    );
};

export default HomePage;