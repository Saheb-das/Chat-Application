// external imports
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// internal imports
import {
  InputStyled,
  LableStyled,
} from "../../shared/input-box/StyledInputBox";
import ModalBtn from "../../shared/modal-btn/ModalBtn";
import { io } from "socket.io-client";

// a object for heading set
const heading = {
  favorites: "Add to Favorites",
  singleChats: "Create New Chat",
  groups: "Create Group Chat",
};

// user object init
const user = {
  userLabelIn: "",
  phone: "",
  nameAs: "",
  conversationName: "",
  isGroup: false,
  groupName: "",
};

let creatorScoket;

// component for adding new conversation
const AddItemBar = ({ addUserLabel }) => {
  // take state variable
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({ ...user });
  const [socket, setSocket] = useState(null);

  // function of local state management
  const { updateUserListInLocal, updateUserListInLocalStorage } =
    useStoreActions((actions) => actions.userDetails);

  const addUserFavorite = useStoreActions(
    (actions) => actions.userDetails.addUserFavorite
  );
  const loggedInUser = useStoreState((state) => state.userDetails.userDetails);

  // socket creation
  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }
    creatorScoket = io(`http://localhost:8080/chat`);
    setSocket(creatorScoket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("createdCon", (newCon) => {
        updateUserListInLocal(newCon);
        updateUserListInLocalStorage(newCon);
      });
    }

    return () => {
      if (socket) {
        socket.off("createdCon");
      }
    };
  }, [socket]);

  // hanlder function to change and store data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({
      ...prev,
      userLabelIn: addUserLabel,
      creator: {
        userId: loggedInUser.userId,
        username: loggedInUser.name,
        avatar: loggedInUser.avatar,
      },
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (addUserLabel === "favorites") {
      addUserFavorite(modalData);
    } else {
      socket.emit("createConversation", modalData);
    }

    setModalData({ ...user });
    setOpen(false);
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemButton sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "16px",
                fontWeight: (theme) => theme.typography.fontWeightBold,
                color: (theme) => theme.palette.secondary.light,
              }}
            >
              {addUserLabel}
            </Typography>
            <ListItemIcon>
              <AddIcon
                onClick={() => setOpen(true)}
                sx={{
                  marginLeft: "auto",
                  color: (theme) => theme.palette.accent.dark,
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>

      {/* this is modal for adding new user */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            fontSize: "24px",
            fontWeight: (theme) => theme.typography.fontWeightBold,
          }}
        >
          {heading[addUserLabel]}
        </DialogTitle>
        <DialogContent>
          {addUserLabel !== "favorites" && (
            <>
              <LableStyled>participant phone no</LableStyled>
              <InputStyled
                name="phone"
                value={modalData.phone}
                onChange={handleChange}
              />
            </>
          )}

          {addUserLabel === "favorites" && (
            <>
              <LableStyled>conversation name</LableStyled>
              <InputStyled
                name="conversationName"
                value={modalData.conversationName}
                onChange={handleChange}
              />
            </>
          )}
          {addUserLabel !== "groups" && (
            <>
              <LableStyled>name save as</LableStyled>
              <InputStyled
                name="nameAs"
                value={modalData.nameAs}
                onChange={handleChange}
              />
            </>
          )}

          <div style={{ marginBottom: "10px" }}></div>
          {addUserLabel === "groups" && (
            <>
              <LableStyled sx={{ display: "inline", marginRight: "10px" }}>
                is group
              </LableStyled>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                name="isGroup"
                value={modalData.isGroup}
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </>
          )}

          {modalData.isGroup && (
            <>
              <LableStyled>group name</LableStyled>
              <InputStyled
                name="groupName"
                value={modalData.groupName}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <ModalBtn onClick={() => setOpen(false)}>cancel</ModalBtn>
          <ModalBtn onClick={handleSave}>save</ModalBtn>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddItemBar;
