// external imports
import { action, thunk } from "easy-peasy";
import axios from "axios";
import Cookies from "js-cookie";

// make model
const model = {
  userDetails: {
    userId: "",
    name: "",
    email: "",
    avatar: "",
    favorites: [{ conversationId: "", name: "", avatar: "" }],
    singleChats: [{ conversationId: "", name: "", avatar: "" }],
    groups: [{ conversationId: "", name: "", avatar: "" }],
  },

  /* thunk */

  // (communicate with database)
  addUserFavorite: thunk(async (actions, payload) => {
    const updatedUser = await axios.patch(
      `http://localhost:8080/api/v1/profile/${payload.creator.userId}`,
      payload,
      {
        headers: {
          Authorization: Cookies.get("chat-app-token"),
        },
      }
    );

    actions.updateUserListInLocal(updatedUser.data);
    actions.updateUserListInLocalStorage(updatedUser.data);
  }),

  // create new private or group chat and update user
  createNewChat: action((actions, payload) => {
    const updatedUserList = payload;

    actions.updateUserListInLocal(updatedUserList.data);
    actions.updateUserListInLocalStorage(updatedUserList.data);
  }),

  /* action */

  /**
   * @description - communicate with local model or state
   */
  getUserByLogin: action((state, payload) => {
    state.userDetails = {
      userId: payload._id,
      name: payload.username,
      email: payload.email,
      avatar: payload.avatar || "",
      favorites: Array.isArray(payload.favorites) ? [...payload.favorites] : [],
      singleChats: Array.isArray(payload.singleChats)
        ? [...payload.singleChats]
        : [],
      groups: Array.isArray(payload.groups) ? [...payload.groups] : [],
    };
  }),

  /**
   * @description - After refresh local data will lost.
   * this function get data from local storage and update local state
   */
  getUserFromLocalStorage: action((state, payload) => {
    state.userDetails = payload;
  }),

  /**
   * @description - Update array or list in local data
   */
  updateUserListInLocal: action((state, payload) => {
    const self = state.userDetails;

    state.userDetails[payload.field] =
      payload.creator.userId === self.userId
        ? [...payload.creator.lists]
        : [...payload.participant.lists];
  }),

  /**
   * @description - Update info ( lists ) in local storage
   */
  updateUserListInLocalStorage: action((state, payload) => {
    const self = JSON.parse(localStorage.getItem("localUser"));

    self[payload.field] =
      payload.creator.userId === self.userId
        ? [...payload.creator.lists]
        : [...payload.participant.lists];

    localStorage.setItem("localUser", JSON.stringify(self));
  }),

  /**
   * update local data
   */
  updateUserPropertyInLocal: action((state, payload) => {}),
};

// exports
export default model;
