// external import
import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
const signUpHeading = "create a new account";
const redirectInfo = "already have an account.";
const redirectLinkText = "log in";
const fieldData = [
  {
    id: 1,
    label: "full name",
    title: "fullname",
    type: "text",
  },
  {
    id: 2,
    label: "email",
    title: "email",
    type: "email",
  },
  {
    id: 3,
    label: "phone number",
    title: "phone",
    type: "number",
  },
  {
    id: 4,
    label: "password",
    title: "password",
    type: "password",
  },
  {
    id: 5,
    label: "avatar",
    title: "avatar",
    type: "file",
  },
];

const initRegisterData = {
  fullname: { data: "", err: "" },
  email: { data: "", err: "" },
  phone: { data: "", err: "" },
  password: { data: "", err: "" },
  avatar: { data: "", err: "" },
};

// this is component
const SignUp = () => {
  // data for sign up
  const [signUpData, setSignUpData] = useState({ ...initRegisterData });
  const navigate = useNavigate();

  // function to handle input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: { ...prev[name], data: value, err: "" },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1", signUpData)
      .then(({ data }) => {
        if (data.success) {
          setSignUpData({ ...initRegisterData });
          navigate("/login");
        }
      })
      .catch((err) => {
        const errMsg = err.response.data.error;

        Object.keys(errMsg).forEach((key) => {
          setSignUpData((prev) => ({
            ...prev,
            [key]: { err: errMsg[key] },
          }));
        });
      });
  };

  return (
    <>
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Paper
          elevation={0}
          sx={{
            border: (theme) => `3px solid ${theme.palette.secondary.main}`,
            paddingBlock: "20px",
            paddingInline: "30px",
            borderRadius: "20px",
          }}
        >
          <HeadingTitle text={signUpHeading} />
          <form onSubmit={handleSubmit}>
            {fieldData.map(({ label, title, type }, index) => (
              <>
                <div key={index}>
                  <LableStyled> {label} </LableStyled>
                  <InputStyled
                    type={type}
                    name={title}
                    value={signUpData[title].data}
                    onChange={handleChange}
                  />
                  {signUpData[title].err && (
                    <ShowError errMsg={signUpData[title].err} />
                  )}
                </div>
              </>
            ))}

            <StyledBtn type="submit" text="sign up" />
          </form>
          <RedirectTitle
            info={redirectInfo}
            link_text={redirectLinkText}
            url={"login"}
          />
        </Paper>
      </Box>
    </>
  );
};

export default SignUp;
