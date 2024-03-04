import { Avatar, Box, Stack, Typography } from "@mui/material";

const MessageBox = ({ side, msg, participant }) => {
  return (
    <>
      <Stack direction={"row"} gap={"5px"} marginBottom={"5px"}>
        <Avatar
          alt={""}
          src={""}
          sx={{
            width: "24px",
            height: "24px",
            marginLeft: side === "right" ? "auto" : "unset",
          }}
        />
        <Typography
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textTransform: "capitalize",
          }}
        >
          {side === "right" ? "you" : participant}
        </Typography>
      </Stack>

      <Box
        sx={{
          backgroundColor: "#fff",
          maxWidth: "80%",
          paddingBlock: "2px",
          paddingInline: "8px",
          marginBottom: "10px",
          borderRadius:
            side === "left" ? "0px 10px 10px 10px" : "10px 0px 10px 10px",
          marginLeft: side === "left" ? "0" : "auto",
        }}
      >
        <Typography paragraph>{msg}</Typography>
      </Box>
    </>
  );
};

export default MessageBox;
