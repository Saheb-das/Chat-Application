// external imports
import { createStore } from "easy-peasy";

// internal imports
import userDetailsModel from "./models/userDetailsModel";
import currentChatModel from "./models/currentChatModel";

// make model
const model = {
  userDetails: userDetailsModel,
  currentChat: currentChatModel,
};

// create store
const store = createStore(model);

// export
export default store;
