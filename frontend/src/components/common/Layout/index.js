import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import AlertMessage from "../AlertMessage"
import { resetUser, setUser } from "../../../redux/user/userSlice"
import { parseJwt } from "../../../utils"
import { allRoutes, isDisplayRoute } from "../../../utils/routes"

const drawerWidth = 240

const Layout = ({ window, children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const user = useSelector((state) => state.user)

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleClickRoute = (path, name) => {
    if (name === "logout") {
      dispatch(resetUser())
      navigate("/")
    } else {
      navigate(path)
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Shop
      </Typography>
      <Divider />
      <List>
        {allRoutes.map(({ route, path, name }) => {
          const isShow = isDisplayRoute(user.isLogin, user.role, name)
          const isActive = pathname === path && name !== "logout"
          return isShow ? (
            <ListItem
              key={route}
              disablePadding
              onClick={() => {
                handleClickRoute(path, name)
              }}
            >
              <ListItemButton
                sx={{
                  borderBottom: isActive && "3px solid yellow",
                  textAlign: "center",
                }}
              >
                <ListItemText primary={route} />
              </ListItemButton>
            </ListItem>
          ) : null
        })}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : null

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Shop
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {allRoutes.map(({ route, path, name }) => {
              const isShow = isDisplayRoute(user.isLogin, user.role, name)
              const isActive = pathname === path && name !== "logout"
              return isShow ? (
                <Button
                  key={route}
                  sx={{
                    color: "#fff",
                    borderBottom: isActive && "3px solid yellow",
                  }}
                  onClick={() => {
                    handleClickRoute(path, name)
                  }}
                >
                  {route}
                </Button>
              ) : null
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ height: "calc(100vh - 64px)", width: "100vw" }}
      >
        <Toolbar />
        <AlertMessage />
        {children}
      </Box>
    </Box>
  )
}
export default Layout
