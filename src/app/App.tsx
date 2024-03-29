import React, {useEffect, useLayoutEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType, setIsInitialised} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC, meTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {

    const isInitialised = useAppSelector<boolean>(state => state.app.isInitialised)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(meTC())
    }, []);
    if (!isInitialised) {
        return <div style={{textAlign: "center", marginTop: "30%"}}>
            <CircularProgress/>
        </div>
    }

    const logoutHandler = () => dispatch(logoutTC())

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn &&
                        <Button color="inherit"
                                style={{marginLeft: "auto"}}
                                onClick={logoutHandler}
                        >Logout
                        </Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={
                        <h1>404: Page not found</h1>
                    }/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
