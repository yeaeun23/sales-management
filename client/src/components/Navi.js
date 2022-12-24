import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@material-ui/core/InputBase';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

function Navi(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menus = [
    { text: "홈", link: "/", icon: <HomeIcon /> },
    { text: "거래처", link: "/", icon: <FormatListBulletedIcon /> },
    { text: "설정", link: "/", icon: <SettingsIcon /> },
    { text: "로그아웃", link: "/", icon: <LogoutIcon /> },
  ]

  const toggleMenu = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setMenuOpen(open);
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" onClick={toggleMenu(true)}>
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" noWrap>
            Sales Master
          </Typography>
          <div className="grow" />
          {(props.searchKeyword === undefined) ?
            ""
            :
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                className="inputRoot"
                name="searchKeyword"
                value={props.searchKeyword}
                onChange={props.handleValueChange} />
            </div>
          }
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu(false)}>
        <Box
          style={{ width: "250px" }}
          role="presentation"
          onClick={toggleMenu(false)}
          onKeyDown={toggleMenu(false)}>
          <List style={{ paddingTop: 0 }}>
            <ListItem style={{ backgroundColor: "#3f51b5", color: "#fff", height: "64px" }}>
              <ListItemText primary="메뉴" />
            </ListItem>
            {menus.map((menu) => (
              <ListItem key={menu.text} to={menu.link} component={Link} button disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItemButton>
              </ListItem>
            ))
            }
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
}

export default Navi;
