// external imports
import { Link, ListItem, ListItemButton } from "@mui/material";
import AvatarImg from "../avatar-circle-img/AvatarImg";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";

// internal imports
import { NavLink } from "react-router-dom";
import NotifyCircle from "../../UI/notify-circle/NotifyCircle";

// image button component
const ImgBtn = ({ username, id, avatar = "" }) => {
  const navigate = useNavigate();
  const curAction = useStoreActions(
    (actions) => actions.currentChat.getChatById
  );
  const curUser = useStoreState((state) => state.currentChat.currChat);

  useEffect(() => {
    if (curUser.conversationId) {
      navigate(
        `${curUser.conversationId}/${curUser.isGroup ? "group" : "private"}`
      );
    }
  }, [curUser.conversationId]);

  return (
    <>
      <ListItem onClick={() => curAction(id)} disablePadding>
        <ListItemButton>
          <AvatarImg img_url={avatar} alt_text={username} />
          <Link
            component={NavLink}
            underline="none"
            sx={{
              fontSize: "18px",
              fontWeight: (theme) => theme.typography.fontWeightBold,
              color: (theme) => theme.palette.secondary.main,
              textTransform: "capitalize",
              "&:hover": {
                color: (theme) => theme.palette.accent.dark,
              },
            }}
          >
            {username}
          </Link>
          <NotifyCircle />
        </ListItemButton>
      </ListItem>
    </>
  );
};

// exports
export default ImgBtn;
