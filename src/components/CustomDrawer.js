import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Apartment, BarChart, Kitchen, Person } from "@mui/icons-material";
import { Profile } from "../pages/Profile";
import { Locations } from "../pages/Locations";
import { Devices } from "../pages/Devices";
import { Showcase } from "../pages/Showcase";
import { Chart1 } from "../pages/Chart1";
import { Chart2 } from "../pages/Chart2";
import { Chart3 } from "../pages/Chart3";
import { Chart4 } from "../pages/Chart4";

const drawerWidth = 240;

const drawerItems = [
  { itemLabel: "Profile", itemIcon: <Person color="secondary" /> },
  { itemLabel: "Locations", itemIcon: <Apartment color="secondary" /> },
  { itemLabel: "Devices", itemIcon: <Kitchen color="secondary" /> },
  { itemLabel: "Chart-1", itemIcon: <BarChart color="secondary" />},
  { itemLabel: "Chart-2", itemIcon: <BarChart color="secondary" />},
  { itemLabel: "Chart-3", itemIcon: <BarChart color="secondary" />},
  { itemLabel: "Chart-4", itemIcon: <BarChart color="secondary" />},
];

export const CustomDrawer = ({ window, mainComponent }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showComponent, setShowComponent] = useState("Profile");

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      bgcolor={theme.palette.primary.dark}
      sx={{
        height: "100vh",
        borderRight: "1px solid",
        borderColor: "#444444",
      }}
    >
      {/* App header */}
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        p="1rem"
        onClick={() => setShowComponent("showcase")}
      >
        <Typography
          textAlign="left"
          variant="h4"
          color="secondary"
          fontWeight="600"
        >
          SHEMS
        </Typography>
      </Box>

      <List sx={{ width: "100%" }}>
        {drawerItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => setShowComponent(item.itemLabel)}
              sx={{ borderBottom: "1px solid #444444", margin: "0.5rem" }}
            >
              <ListItemIcon color="secondary">{item.itemIcon}</ListItemIcon>
              <Typography color="secondary">{item.itemLabel}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
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

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "500px" }}>
        {showComponent === "Profile" && <Profile />}
        {showComponent === "Locations" && <Locations />}
        {showComponent === "Devices" && <Devices />}
        {showComponent === "showcase" && <Showcase />}
        {showComponent === "Chart-1" && <Chart1 />}
        {showComponent === "Chart-2" && <Chart2 />}
        {showComponent === "Chart-3" && <Chart3 />}
        {showComponent === "Chart-4" && <Chart4 />}
      </Box>
    </Box>
  );
};
