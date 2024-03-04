// external imports
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

// internal imports
import IconGroup from "../../UI/icon-group/IconGroup";
import CustomDrawerList from "../../UI/custom-drawer-list/CustomDrawerList";
import ChatsArea from "../../UI/chats-area/ChatsArea";
import MsgInputBox from "../../UI/msg-input-box/MsgInputBox";

const drawerWidth = 280;

function ChatDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = useStoreState((state) => state.userDetails.userDetails);
  const updateUserFromStorage = useStoreActions(
    (actions) => actions.userDetails.getUserFromLocalStorage
  );

  // check cookie to protect this component
  useEffect(() => {
    if (!Cookies.get("chat-app-token")) {
      navigate("/login");
    }
  }, []);

  // set loggedIn user save to localstorage
  useEffect(() => {
    if (
      Cookies.get("chat-app-token") &&
      localStorage.getItem("localUser") === null
    ) {
      localStorage.setItem("localUser", JSON.stringify(user));
    } else {
      updateUserFromStorage(JSON.parse(localStorage.getItem("localUser")));
    }
  }, []);

  // socket impliment

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
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

            <Outlet />

            <IconGroup />
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
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
            <CustomDrawerList />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <CustomDrawerList />
          </Drawer>
        </Box>

        <ChatsArea drawerWidth={drawerWidth} />
        <MsgInputBox drawerWidth={drawerWidth} />
      </Box>
    </>
  );
}

export default ChatDashboard;
