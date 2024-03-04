import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("chat-app-token")) navigate("/login");
  }, []);
  return (
    <>
      <h2>This is user profile page</h2>
    </>
  );
};

// exports
export default Profile;
