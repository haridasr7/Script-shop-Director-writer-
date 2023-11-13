import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  CircularProgress,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatedNav from "./Updatednav";
import UpdatedFooter from "./UpdatedFooter";

const Updatescript = () => {
  const { scriptId } = useParams();

  const [scriptData, setScriptData] = useState({
    movieName: "",
    genre: "",
    synopsis: "",
    scriptType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScriptData({
      ...scriptData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .put(`/api/v1/script/${scriptId}`, scriptData)
      .then((response) => {
        setIsSubmitting(false);
        toast.success("Script updated successfully!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response) {
          console.error("Error updating script:", error.response.data);
        } else {
          console.error("Error updating script:", error.message);
        }
        toast.error("Failed to update script. Please try again.", {
          position: "top-right",
        });
      });
  };

  return (
    <div>
      <UpdatedNav />
      <br />
      <br />
      <br />

      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Script
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Movie Name"
                variant="outlined"
                name="movieName"
                value={scriptData.movieName}
                onChange={handleInputChange}
                style={{ width: "100%", maxWidth: "300px" }}
              />
              <br />
              <br />
              <FormControl
                variant="outlined"
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <InputLabel htmlFor="genre">Genre</InputLabel>
                <Select
                  label="Genre"
                  name="genre"
                  value={scriptData.genre}
                  onChange={handleInputChange}
                >
                  {[
                    "comedy",
                    "horror",
                    "action",
                    "family",
                    "romance",
                    "thriller",
                    "adventure",
                    "crime",
                    "fantasy",
                    "musical",
                    "sci-fi",
                    "war",
                    "animation",
                    "drama",
                    "film-noir",
                    "mystery",
                    "short",
                    "western",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <TextareaAutosize
                rowsMin={10}
                cols={70}
                placeholder="Synopsis"
                name="synopsis"
                value={scriptData.synopsis}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  padding: "10px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
              <br />
              <br />
              <FormControl
                variant="outlined"
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <InputLabel htmlFor="scriptType">Script Type</InputLabel>
                <Select
                  label="Script Type"
                  name="scriptType"
                  value={scriptData.scriptType}
                  onChange={handleInputChange}
                >
                  <MenuItem value="" disabled>
                    Default Script Type
                  </MenuItem>
                  {["shortFilm", "mainStreamFilm"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ width: "100%", maxWidth: "300px" }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Update Script"
                )}
              </Button>
            </form>
          </div>
        </Paper>
      </Container>

      <br />
      <br />
      <br />
      <div>
        <UpdatedFooter />
      </div>
    </div>
  );
};

export default Updatescript;
