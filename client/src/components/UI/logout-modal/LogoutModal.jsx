// external imports
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

// list data
const moreData = [
  { id: 1, title: "my profile", asAllItem: true },
  { id: 2, title: "add member", asAllItem: false, isGroup: true },
  { id: 3, title: "change avatar", asAllItem: false, isGroup: true },
  { id: 4, title: "logout", asAllItem: true },
];

const LogoutModal = () => {
  const { mode } = useParams();
  const navigate = useNavigate();

  const handleClick = (e) => {
    let text = e.target.innerText;
    text = text.toLowerCase();

    if (text === "my profile") {
      //TODO: here redirect user profile page and api call to backend
      // navigate("/profile");
      console.log("myProfile", text);
    } else if (text === "add member") {
      //TODO: here we make api request to add group member
      console.log("addMember", text);
    } else if (text === "change avatar") {
      //TODO: here we make api request to add image of group
      console.log("chnageAvatar", text);
    } else {
      Cookies.remove("chat-app-token");
      localStorage.removeItem("localUser");
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: "180px",
          position: "absolute",
          right: "4%",
          top: "60px",
        }}
      >
        <List>
          {mode && mode === "group"
            ? moreData.map((item) => {
                if (item.asAllItem || item.isGroup) {
                  return (
                    <ListItemButton key={item.id} onClick={handleClick}>
                      <ListItemText
                        sx={{
                          textTransform: "capitalize",
                          "& .MuiTypography-root": {
                            fontSize: "18px",
                            fontWeight: (theme) =>
                              theme.typography.fontWeightBold,
                            color: (theme) => theme.palette.secondary.dark,
                          },
                        }}
                        primary={item.title}
                      />
                    </ListItemButton>
                  );
                }
              })
            : moreData.map((item) => {
                if (item.asAllItem) {
                  return (
                    <ListItemButton key={item.id} onClick={handleClick}>
                      <ListItemText
                        sx={{
                          textTransform: "capitalize",
                          "& .MuiTypography-root": {
                            fontSize: "18px",
                            fontWeight: (theme) =>
                              theme.typography.fontWeightBold,
                            color: (theme) => theme.palette.secondary.dark,
                          },
                        }}
                        primary={item.title}
                      />
                    </ListItemButton>
                  );
                }
              })}
        </List>
      </Paper>
    </>
  );
};

// exports
export default LogoutModal;
