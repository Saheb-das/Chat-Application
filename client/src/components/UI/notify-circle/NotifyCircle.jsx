import { Avatar } from "@mui/material";

let notification = "0";

const NotifyCircle = () => {
  return (
    <>
      <Avatar
        src="/dummy"
        alt={notification}
        sx={{
          width: "20px",
          height: "20px",
          textAlign: "center",
          marginLeft: "auto",
          fontSize: "13px",
          fontWeight: (theme) => theme.typography.fontWeightBold,
          backgroundColor: (theme) => theme.palette.accent.main,
          color: (theme) => theme.palette.secondary.dark,
          display: notification > "0" ? "grid" : "none",
          placeItems: "center",
        }}
      />
    </>
  );
};

export default NotifyCircle;
