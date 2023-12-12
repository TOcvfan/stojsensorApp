'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@/lib/mui';
import Link from 'next/link';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext } from './AppContext';

const NavBar = ({ navn, aktiv }) => {
    const { isLoggedIn } = useAppContext();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const about = { name: 'About us', link: '/about', targetSegment: 'about' };

    let pagesLoggedIn = [
        { name: 'Frontpage', link: '/frontpage', targetSegment: 'frontpage' },
        { name: 'Control panel', link: '/control', targetSegment: 'control' },
        about
    ]

    let pagesNotLoggedIn = [
        { name: 'Home', link: '/', targetSegment: null },
        about,
        { name: 'Log in', link: '/login', targetSegment: 'login' },
    ]

    /* const logout = () => {
        authenticationService.logout();
    } */

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //background-color: ${(activeSegment === )}

    const MenuItems = ({ farve }) => {
        const StyledLink = styled(Link)`
            text-decoration: none;
            color: ${farve};
                &:focus, &:hover, &:visited, &:link, &:active {
                    text-decoration: none;
                    color: ${farve};
            }
        `;

        const sider = () => {
            if (isLoggedIn) {
                return pagesLoggedIn
            } else {
                return pagesNotLoggedIn
            }
        }
        const bgfarve = farve === 'purple' ? 'yellow' : 'purple'
        const markering = {
            borderRadius: '20%',
            backgroundColor: bgfarve,
            fontWeight: 'bold'
        }

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                {sider().map((p) => {
                    //console.log(p)
                    const aktivSide = (aktiv === p.targetSegment) ? markering : { backgroundColor: 'inherit' }
                    return (
                        <MenuItem onClick={handleCloseNavMenu} key={p.name} sx={
                            aktivSide
                        }>
                            <StyledLink className='link' href={p.link}>
                                <Typography variant="div" textAlign="center">
                                    {p.name}
                                </Typography>
                            </StyledLink>
                        </MenuItem>
                    )
                })}
            </Box>
        )
    }

    return (
        <AppBar position="fixed" sx={{
            color: '#fff',
            background: 'linear-gradient(89deg, #FF5EDF 0%, #04C6DE 100%)'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="purple"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItems farve='purple' />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'purple',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItems farve='white' />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="S">
                            DB
                        </Avatar>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;