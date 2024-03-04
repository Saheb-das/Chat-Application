// external imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// internal imports
import Home from "../components/pages/home/Home";
import SignUp from "../components/pages/signup/SignUp";
import LogIn from "../components/pages/login/LogIn";
import ChatDashboard from "../components/pages/chat-dashboard/ChatDashboard";
import ChatHeadingWithImg from "../components/UI/chat-heading-with-img/ChatHeadingWithImg";
import NewConversation from "../components/UI/new-conversation/NewConversation";
import Profile from "../components/pages/user-profile/Profile";

// router object
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
      <Route path="chats" element={<ChatDashboard />}>
        <Route index element={<NewConversation />} />
        <Route path=":userId/:mode" element={<ChatHeadingWithImg />} />
      </Route>
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

// exports
export default router;
