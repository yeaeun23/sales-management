import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navi.module.scss";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
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
    { text: "공지사항", link: "/board", icon: <NotificationsNoneOutlinedIcon />, admin: false },
    { text: "거래처", link: "/account", icon: <FormatListBulletedIcon />, admin: false },
    { text: "계정관리", link: "/user", icon: <SettingsIcon />, admin: false },
    { text: "로그아웃", link: "/", icon: <LogoutIcon />, admin: false },
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
          <IconButton className={styles.menuButton} color="inherit" onClick={toggleMenu(true)} title="메뉴">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img src={process.env.PUBLIC_URL + '/img/logo_gauge_eng_white.png'} width="150px" alt="THE GAUGE" />
          </Typography>
          <div className={styles.grow} />
          {(props.searchKeyword !== undefined) ?
            <div className={styles.search}>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="이름 검색"
                className={styles.inputRoot}
                name="searchKeyword"
                value={props.searchKeyword}
                onChange={props.handleValueChange} />
            </div>
            : ""
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
              <ListItemText primary={sessionStorage.getItem("user_name") + " 님의 게이지"} />
            </ListItem>
            {menus.map((menu) => (
              menu.admin ?
                (sessionStorage.getItem('user_status') === '9' ?
                  <ListItem key={menu.text} to={menu.link} component={Link} button disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText primary={menu.text} />
                    </ListItemButton>
                  </ListItem>
                  : "")
                :
                <ListItem key={menu.text} to={menu.link} component={Link} button disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.text} />
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
          <Divider />
          <div className={styles.nav_footer}>
            <img src={process.env.PUBLIC_URL + '/img/logo_sales.png'} alt="Sales Master" />
            <p>ⓒ 2023. 세일즈마스터코리아 Inc.</p>
            <p>All rights reserved.</p>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default Navi;
