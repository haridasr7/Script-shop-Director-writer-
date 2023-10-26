import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./Admincustomerqueries.css";
import {
  Grid,
  Typography,
  TextField,
  Container,
  Box,
  Button,
  Card,
  Item,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AdminFooter from "../components/AdminFooter";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Admincustomerqueries() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/Admin/api/v1/admin/contacts`);
        setContacts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Script not found.");
      }
    };
    fetchContacts();
  }, []);

  const navigate = useNavigate();

  const Contactsdel = async (itemId) => {
    try {
      const response = await axios.delete(
        `/Admin/api/v1/admin/contactsdelete/${itemId}`
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Script not found.");
    }
  };
  Contactsdel();

  const Contactsread = async (itemId) => {
    try {
      const response = await axios.put(
        `/Admin/api/v1/admin/contacts/${itemId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Script not found.");
    }
  };

  Contactsread();
  //   const [buttonColor, setButtonColor] = useState(' #DDE4E7'); // Initial background color
  // const handleButtonClick = () => {
  //   // Change the background color when the button is clicked
  //   setButtonColor('#fff');
  // };

  const [buttonColors, setButtonColors] = useState(true);
  const handleButtonClick = async (itemId) => {
    try {
      const response = await axios.put(
        `/Admin/api/v1/admin/contacts/${itemId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Script not found.");
    }

    // const updatedButtonColors = { ...buttonColors };

    // if (updatedButtonColors[`${itemId}`] === "#fff") {
    //   updatedButtonColors[`${itemId}`] = "white";
    // } else {
    //   updatedButtonColors[`${itemId}`] = "#fff";
    // }

    // setButtonColors(updatedButtonColors);
  };

  const [searched, setSearched] = useState("");
  const [filteredMessage, setFilteredMessage] = useState([]);
  const handlechangesearch = (event) => {
    const Search = event.target.value;
    setSearched(Search);
    const filteredcontacts = contacts.filter((filt) =>
      filt.firstName.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredMessage(filteredcontacts || []);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={9}>
          <Container>
            <Grid container spacing={2} id="admincustomerqueriesHeadingBox">
              <Grid lg={5}>
                <Typography id="admincustomerqueriesHeading">
                  Customer Queries
                </Typography>
              </Grid>
              <Grid lg={7}>
                <TextField
                  id="admincustomerqueriesSearchBox"
                  placeholder="Search by Username"
                  onChange={handlechangesearch}
                  sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon style={{ fontSize: "37px" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid>
                <Typography id="admincustomerqueriessubHeading">
                  Find and give reply to all the concerns of your customers.
                </Typography>
              </Grid>
            </Grid>
          </Container>
          {/* <Container>
                <Grid container spacing={1} id="admincustomerqueriesbutton" gap={4}>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Delete
                </Button>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Mark as read
                </Button>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Filter
                </Button>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Categorize
                </Button>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Block
                </Button>
                <Button id="admincustomerqueriesbut" variant="contained">
                  Print
                </Button>
                </Grid>
                  </Container> */}
          <Box id="admincustomerqueriesbox">
            <Typography id="admincustomerqueriesnew">Total messages</Typography>
            <Typography id="admincustomerqueriesnew2">
              ({contacts.length})
            </Typography>
          </Box>
          <Container>
            <Grid container spacing={2}>
              {searched === ""
                ? contacts.map((item, index) => (
                    <Grid
                      item
                      lg={12}
                      key={index}
                      gap={2}
                      id="admincustomerqueriesmessage"
                    >
                      <Container
                        id="admincustomerqueriesmestop"
                        style={{
                          // background: buttonColors[item._id] || " #DDE4E7",
                          background:
                            buttonColors === item.readMessage
                              ? "#fff"
                              : "#DDE4E7",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // flexDirection: "column",

                          // maxHeight: "200px",
                          overflowY: "auto",
                          height: "fit-content",
                        }}
                      >
                        {/* <input type="checkbox" id="check"/> */}
                        <Typography id="customerqueriesmestex">
                          {item.firstName}
                        </Typography>
                        <Typography id="customerqueriesmestex">
                          {item.subject}
                        </Typography>
                        <Typography id="customerqueriesmesabt">
                          {item.text}
                        </Typography>
                        <Typography id="customerqueriesmestextime">
                          {item.createdAt.slice(11, 16)}
                        </Typography>
                      </Container>
                      <Box
                        id="admincustomerqueriesmesbottom"
                        style={{
                          // background: buttonColors[item._id] || " #DDE4E7",
                          background:
                            buttonColors === item.readMessage
                              ? "#fff"
                              : "#DDE4E7",
                        }}
                      >
                        {/* <Button
                          id="messagebtn"
                          variant="contained"
                          onClick={() => Contactsread(item._id)}
                        >
                          Read
                        </Button> */}
                        {/* <a href={`mailto:${item.email}?Subject=${item.subject}&body=${item.text}`}> */}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                        >
                          <Button
                            id="messagebtn"
                            variant="contained"
                            onClick={() => handleButtonClick(item._id)}
                          >
                            Send a Messgae
                          </Button>{" "}
                        </a>
                        <Button
                          id="messagebtn"
                          variant="contained"
                          onClick={() => Contactsdel(item._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  ))
                : filteredMessage.map((item, index) => (
                    <Grid
                      item
                      lg={12}
                      key={index}
                      gap={2}
                      id="admincustomerqueriesmessage"
                    >
                      <Container
                        id="admincustomerqueriesmestop"
                        style={{
                          background:
                            buttonColors === item.readMessage
                              ? "#fff"
                              : "#DDE4E7",
                        }}
                      >
                        {/* <input type="checkbox" id="check"/> */}
                        <Typography id="customerqueriesmestex">
                          {item.firstName}
                        </Typography>
                        <Typography id="customerqueriesmestex">
                          {item.subject}
                        </Typography>
                        <Typography id="customerqueriesmesabt">
                          {item.text}
                        </Typography>
                        <Typography id="customerqueriesmestextime">
                          {item.createdAt.slice(11, 16)}
                        </Typography>
                      </Container>
                      <Box
                        id="admincustomerqueriesmesbottom"
                        style={{
                          background:
                            buttonColors === item.readMessage
                              ? "#fff"
                              : "#DDE4E7",
                        }}
                      >
                        {/* <Button
                          id="messagebtn"
                          variant="contained"
                          onClick={() => Contactsread(item._id)}
                        >
                          Read
                        </Button> */}
                        {/* <a href={`mailto:${item.email}?Subject=${item.subject}&body=${item.text}`}> */}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                        >
                          <Button
                            id="messagebtn"
                            variant="contained"
                            onClick={() => handleButtonClick(item._id)}
                          >
                            Send a Messgae
                          </Button>{" "}
                        </a>
                        <Button
                          id="messagebtn"
                          variant="contained"
                          onClick={() => Contactsdel(item._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}
export default Admincustomerqueries;
