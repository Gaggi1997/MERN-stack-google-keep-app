import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    marginRight: theme.spacing(2),
    width: '200rem',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: 'rgba(0,0,0,.3)',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'rgba(0,0,0,.5)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1.5, 1.5, 0),
        borderRadius: '10px',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '70ch',
        },
    },
}));

const SearchBar = () => {
    const links = {
        textDecoration: 'none',
        color: 'black'
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const logoutUser = () => {
        localStorage.removeItem('token')
    }

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {localStorage.getItem('token') ? <Link to="/Login" style={links}> <MenuItem onClick={ logoutUser}>Logout</MenuItem></Link>
                :
                <>
                    <Link to="/Login" style={links}> <MenuItem onClick={handleMenuClose}>Login</MenuItem></Link>
                    <Link to="/Signup" style={links}><MenuItem onClick={handleMenuClose}>Sign up</MenuItem></Link>
                </>
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" >
                    <Badge badgeContent={4} color="error">
                        <MailIcon color='danger' />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <i className="fa-regular fa-rotate-right"></i>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>

            <Toolbar style={{ marginLeft: '40px' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <RefreshIcon className='icons' />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <SettingsIcon className='icons' />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <AppsIcon className='icons' />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle className='icons'></AccountCircle>

                    </IconButton>
                </Box>
            </Toolbar>

            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
export default SearchBar