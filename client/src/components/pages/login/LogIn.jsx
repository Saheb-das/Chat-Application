// external import
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";

// internal import
import HeadingTitle from "../../shared/heading-title/HeadingTitle";
import {
  LableStyled,
  InputStyled,
} from "../../shared/input-box/StyledInputBox";
import StyledBtn from "../../shared/button/StyledBtn";
import RedirectTitle from "../../shared/redirect-title/RedirectTitle";
import ShowError from "../../shared/show-error/ShowError";

// data for this component
const logHeading = "Log In To Your Account";
const redirectInfo = "have no account?";
const redirectLinkText = "sign up";
const fieldData = [
  {
    id: 11,
    label: "phone number",
    title: "phone",
    type: "number",
  },
  {
    id: 12,
    label: "password",
    title: "password",
    type: "password",
  },
];

// login data object
const userData = {
  phone: {
    data: "",
    err: "",
  },
  password: {
    data: "",
    err: "",
  },
};

// this is component
const LogIn = () => {
  // data for log in
  const [logInData, setLogInData] = useState({ ...userData });
  const userDetails = useStoreActions((actions) => actions.userDetails);
  const navigate = useNavigate();

  // function to handle input field
  const handleChange = (e) => {
    const { name: key, value } = e.target;

    setLogInData((prev) => ({
      ...prev,
      [key]: { ...prev[key], data: value, err: "" },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/v1/login", logInData)
      .then(({ data }) => {
        if (data.success) {
          Cookies.set("chat-app-token", data.token, { expires: 1 });
          userDetails.getUserByLogin(data.loggedInUser);
          setLogInData({ ...userData });
          navigate("/chats");
        }
      })
      .catch((e) => {
        const errMsg = e?.response?.data?.error;
        console.log("ErrMsg:", errMsg);

        if (typeof errMsg !== "string") {
          Object.keys(errMsg).forEach((key) => {
            setLogInData((prev) => ({
              ...prev,
              [key]: { err: errMsg[key] },
            }));
          });
        } else {
          Object.keys(logInData).forEach((key) => {
            setLogInData((prev) => ({
              ...prev,
              [key]: { ...prev[key], err: errMsg },
            }));
          });
        }
      });
  };

  return (
    <>
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Paper
          elevation={0}
          sx={{
            border: (theme) => `3px solid ${theme.palette.secondary.main}`,
            paddingBlock: "40px",
            paddingInline: "30px",
            borderRadius: "20px",
          }}
        >
          <HeadingTitle text={logHeading} />
          <form onSubmit={handleSubmit}>
            {fieldData.map(({ label, title, type }) => (
              <>
                <LableStyled> {label} </LableStyled>
                <InputStyled
                  type={type}
                  name={title}
                  value={logInData[title].data}
                  onChange={handleChange}
                />
                {logInData[title].err && (
                  <ShowError errMsg={logInData[title].err} />
                )}
              </>
            ))}
            <StyledBtn type="submit" text="log in" />
          </form>

          <RedirectTitle
            info={redirectInfo}
            link_text={redirectLinkText}
            url={"/"}
          />
        </Paper>
      </Box>
    </>
  );
};

export default LogIn;
