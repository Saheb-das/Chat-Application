// external imports
import { useStoreState } from "easy-peasy";
import { Divider, List, Toolbar } from "@mui/material";

// internal imports
import SearchInputBox from "../search-input-box/SearchInputBox";
import AddItemBar from "../add-item-bar/AddItemBar";
import ImgBtn from "../../shared/img-btn/ImgBtn";

const CustomDrawerList = () => {
  const user = useStoreState((state) => state.userDetails.userDetails);

  return (
    <>
      <div>
        <Toolbar>
          <SearchInputBox />
        </Toolbar>
        <Divider />
        <AddItemBar addUserLabel={"favorites"} />
        <List>
          {user &&
            user.favorites.map(({ conversationId, name, avatar }) => (
              <ImgBtn
                username={name}
                id={conversationId}
                avatar={avatar}
                key={conversationId}
              />
            ))}
        </List>
        <Divider />
        <AddItemBar addUserLabel={"singleChats"} />
        <List>
          {user &&
            user.singleChats.map(({ conversationId, name, avatar }) => (
              <ImgBtn
                username={name}
                id={conversationId}
                avatar={avatar}
                key={conversationId}
              />
            ))}
        </List>
        <Divider />
        <AddItemBar addUserLabel={"groups"} />
        <List>
          {user &&
            user.groups.map(({ conversationId, name, avatar, _id }) => (
              <ImgBtn
                username={name}
                id={conversationId}
                avatar={avatar}
                key={_id}
              />
            ))}
        </List>
      </div>
    </>
  );
};

export default CustomDrawerList;
