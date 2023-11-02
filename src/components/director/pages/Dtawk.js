import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Navbar from "../component/NavbarDirector";
import FooterDirector from "../component/FooterDirector";

const TawkToComponent = () => {
  useEffect(() => {
    const loadTawkTo = () => {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/652e10ec6fcfe87d54ba7157/1hctv47fi";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    };
    // Add your conditions here for when to load the tawk.to script
    const shouldLoadTawkTo = true; // Replace with your specific conditions
    if (shouldLoadTawkTo) {
      loadTawkTo();
    }
  }, []);
  const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: "auto",
    // marginTop: 100,
    padding: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    boxShadow: "0 8px 16px -8px rgba(0,0,0,0.4)",
    textAlign: "center",
    marginTop: "25vw",
  });
  const StyledButton = styled(Button)({
    marginTop: 20,
    color: "white",
    backgroundColor: "#4CAF50", // Green color
    "&:hover": {
      backgroundColor: "#43A047",
    },
  });
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome to Our Chat!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Have any questions? We're here to help!
            </Typography>
            <StyledButton variant="contained">
              Click the green button to chat with us
            </StyledButton>
          </CardContent>
        </StyledCard>
      </Box>
      <FooterDirector />
    </>
  );
};
export default TawkToComponent;
