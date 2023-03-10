import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Menu,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/users/userSlice';

function Header({ theme, onClick }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    () => localStorage.getItem('i18nextLng') || 'id'
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate('/login');
  };

  const handleLangChange = (evt) => {
    const lang = evt.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar
      sx={{
        bgcolor: 'secondary.main',
        backgroundImage: 'none',
        boxShadow: 'none',
        position: 'static',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '16px',
        paddingRight: '16px',
        py: '4px',
        px: '16px',
      }}
    >
      <Link to="/">
        <Typography variant="h4" color="#262626">
          <strong>W</strong>Form
        </Typography>
      </Link>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant="standard">
          <Select
            sx={{
              color: '#262626',
              ':before': { borderBottom: 'none' },
              ':hover:not(.Mui-disabled):before': { borderBottom: 'none' },
            }}
            defaultValue="id"
            value={language}
            onChange={handleLangChange}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="en">EN</MenuItem>
          </Select>
        </FormControl>
        <Toolbar style={{ paddingRight: '0px' }}>
          <IconButton
            onClick={onClick}
            sx={{
              color: '#262626',
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
        {userInfo && (
          <div>
            <IconButton
              sx={{ color: '#262626' }}
              size="large"
              aria-label="User Avatar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              sx={{ mt: '45px' }}
              anchorEl={anchorEl}
              keepMounted
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Box>
    </AppBar>
  );
}

Header.defaultProps = {
  theme: {},
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      mode: PropTypes.string,
    }),
  }),
};

export default Header;
