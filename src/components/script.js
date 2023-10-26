import React, { useEffect, useState } from "react";
import "./script.css";
import Menu from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, TextField, CardActionArea } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllScripts } from "../actions/writerAction";
import Loader from "./Loader";
import Footerwriter from "./writernavbar/Footerwriter";
import NavbarWriter from "./writernavbar/NavbarWriter";
import { Link } from "react-router-dom";
// Import the necessary dependencies
import { useNavigate } from "react-router-dom";
import axios from "axios"; // You need to import axios
import { toast } from "react-toastify"; // You need to import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS for react-toastify

const RoundImage = styled("img")({
  maxWidth: "100%",
  height: "40px",
  borderRadius: "50%",
});

const buttonStyles = {
  borderRadius: "5px",
  border: "1px solid #14ABE4",
  color: "#14ABE4",
  fontWeight: 700,
  background: "#FFF",
};

const MyScript = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { loading, error, scripts } = useSelector((state) => state.writerState);
  const dispatch = useDispatch();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for comment text
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllScripts(user._id));
    }
  }, [dispatch, user]);

  // Define the handleDelete function
  const handleDelete = async (scriptId) => {
    try {
      const response = await axios.delete(`/api/v1/script/${scriptId}`);
      if (response.status === 200) {
        // Show a success toast message
        toast.success("Script deleted successfully!", {
          position: "top-right",
        });

        // After successful deletion, you may want to refresh the script list
        dispatch(getAllScripts(user._id));
      } else {
        // Show an error toast message
        toast.error("Failed to delete script. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting script:", error);
      // Show an error toast message
      toast.error("An error occurred while deleting the script.", {
        position: "top-right",
      });
    }
  };

  // Function to filter scripts based on search query
  const filterScripts = (scripts, query) => {
    return scripts.filter((script) => {
      // Perform case-insensitive search on movieName or synopsis
      const movieName = script.movieName.toLowerCase();
      const synopsis = script.synopsis.toLowerCase();
      const lowerQuery = query.toLowerCase();
      return movieName.includes(lowerQuery) || synopsis.includes(lowerQuery);
    });
  };

  // Filter scripts based on search query
  const filteredScripts = filterScripts(scripts, searchQuery);

  // Function to clear the search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavbarWriter />
      <Container style={{ margin: "0" }}>
        <div>
          <p className="paraf" style={{ marginLeft: "15%", color: "gray" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            convallis faucibus est, vel tincidunt
            <br />
            mi vehicula ac. Curabitur commodo eleifend mauris, in tristique
            ipsum fermentum vitae. Aenean
            <br /> dignissim neque mi, vel dictum nibh aliquam vitae. Donec
            auctor risus at justo dapibus, sed <br />
            efficitur velit sagittis.
          </p>
        </div>
        <div className="textfield-container">
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            style={{
              flex: 1,
              maxWidth: "400px",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#14ABE4", padding: "15px 30px" }}
            onClick={clearSearch}
          >
            Clear
          </Button>
        </div>
      </Container>
      <Container className="slight" style={{ overflow: "hidden" }}>
        <div className="fleximage">
          {filteredScripts.map((item) => {
            const { _id, movieName, synopsis, fileUrl, comments } = item;

            return (
              <div key={_id}>
                <div className="buttonconatiner">
                  <div className="twobuttons-mobile" style={{ float: "right" }}>
                    {/* Pass the script ID to the handleDelete function */}
                    <Link
                      to={`/updatescript/${_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        style={{ color: "black", marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      style={{ color: "white" }}
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <hr className="hrs"></hr>
                <Grid container spacing={2}>
                  <Grid item lg={3} sm={3} xs={12} md={3}>
                    <h2 className="Lorem">{movieName}</h2>
                    <div
                      style={{
                        marginTop: "15%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={fileUrl}
                        alt="Logo"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={9} sm={9} xs={12} md={9}>
                    <h2 className="Lorems">{movieName}</h2>
                    <p>{synopsis}</p>
                  </Grid>
                </Grid>
                <hr className="hrs"></hr>
              </div>
            );
          })}
        </div>
      </Container>{" "}
      <br />
      <Footerwriter />
    </>
  );
};
export default MyScript;
