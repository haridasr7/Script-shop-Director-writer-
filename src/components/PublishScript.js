import React, { useState, useEffect } from "react";
import "./PublishScript.css";
import NavbarWriter from "./writernavbar/NavbarWriter";
import {
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Input,
} from "@mui/material";
import FooterDirector from "./writernavbar/Footerwriter";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { writerPay } from "../actions/scriptAction";
const genres = [
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
];

function PublishScript() {
  const [movieName, setMovieName] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("Genre");
  const [scriptType, setScriptType] = useState("Script Type");
  const [scriptFile, setScriptFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const [amount] = useState(1000);

  
  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleSynopsisChange = (e) => {
    setSynopsis(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleScriptTypeChange = (e) => {
    setScriptType(e.target.value);
  };

  const handleScriptFileChange = (e) => {
    const file = e.target.files[0];
    setScriptFile(file);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
  };
  
 
  useEffect(() => {
    if (isSubmitting) {
      const formData = new FormData();
      formData.append("movieName", movieName);
      formData.append("synopsis", synopsis);
      formData.append("genre", genre);
      formData.append("scriptType", scriptType);
      formData.append("scriptFile", scriptFile);
      formData.append("imageFile", imageFile);
  
      console.log(movieName, synopsis, genre, scriptType, scriptFile, imageFile);
      // Replace with your actual API endpoint URL
      const apiUrl = `/api/v1/publish/new/${user._id}`; // API to send the request
  
      fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Handle success, set the success state
            toast.success("Script uploaded successfully. Thank you!");
            console.log("Script uploaded successfully!");
            dispatch(writerPay(user._id, movieName, amount)); // Dispatch writerPay here
          } else {
            // Handle errors, set the error state
            toast.error("File uploading failed. Please try again.");
            console.error("File uploads failed.");
          }
        })
        .catch((error) => {
          // Handle network errors or other errors
          toast.error("An error occurred. Please try again later.");
          console.error("An error occurred:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }, [user._id, isSubmitting, movieName, synopsis, genre, scriptType, scriptFile, imageFile]);
  
 
  return (
    <div>
      <div className="publishscriptHeader">
        <NavbarWriter />
      </div>
      <Grid container spacing={2} className="publishscriptcontent" gap={"4vw"}>
        <Grid item xs={12} lg={7} md={7} className="publilcscriptleft">
          <div>
            <Typography className="publishscriptheading">
              Potential Lies in Relationships
            </Typography>
            <div className="publishscriptsubtext  ">
              <p>
                People are eagerly waiting to see what you came up with, publish
                your script now.
              </p>
            </div>
            <div className="publishscriptimage">
              <img
                className="publishscriptgroupimage "
                src="./Images/Group.png"
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={4} md={4} className="publishscriptleft">
          <div className="publishscriptbox">
            <div className="publishscriptboxContent mt-4">
              <div className="publishscripttitle">Publish Your Script</div>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="publishscriptMovie"
                  fullWidth
                  label="Movie Name"
                  margin="dense"
                  sx={{ "& fieldset": { border: "none" } }}
                  value={movieName}
                  onChange={handleMovieNameChange}
                />
                <TextField
                  id="publishscriptsynopsis"
                  fullWidth
                  label="Synopsis"
                  margin="normal"
                  sx={{ "& fieldset": { border: "none" } }}
                  value={synopsis}
                  onChange={handleSynopsisChange}
                />
                <Select
                  id="publishscriptgenre"
                  fullWidth
                  label="Genre"
                  defaultValue="Genre"
                  sx={{ "& fieldset": { border: "none" } }}
                  value={genre}
                  onChange={handleGenreChange}
                >
                  <MenuItem value="Genre" disabled>
                    Genre
                  </MenuItem>
                  {genres.map((genreOption) => (
                    <MenuItem key={genreOption} value={genreOption}>
                      {genreOption}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  id="publishscripttype"
                  fullWidth
                  variant="outlined"
                  label="Script Type"
                  defaultValue="Script Type"
                  sx={{ "& fieldset": { border: "none" } }}
                  value={scriptType}
                  onChange={handleScriptTypeChange}
                >
                  <MenuItem value="Script Type" disabled>
                    Script Type
                  </MenuItem>
                  <MenuItem value="shortFilm">Short Film</MenuItem>
                  <MenuItem value="mainStreamFilm">Mainstream Film</MenuItem>
                  {/* Add other script type options here */}
                </Select>
                <br />
                <br />
                {/* Script File Upload */}
                <Input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleScriptFileChange}
                  style={{ display: "none" }}
                  id="scriptFileInput"
                />
                <label htmlFor="scriptFileInput">
                  <Button
                    component="span"
                    fullWidth
                    variant="outlined"
                    id="publishscriptupload"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        style={{ color: "#14ABE4" }}
                      />
                    }
                    style={{ marginTop: "16px" }}
                  >
                    Upload Script File
                  </Button>
                </label>{" "}
                <br />
                <br />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  style={{ display: "none" }}
                  id="imageFileInput"
                />
                <label htmlFor="imageFileInput">
                  <Button
                    component="span"
                    fullWidth
                    variant="outlined"
                    id="publishscriptimageupload"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        style={{ color: "#14ABE4" }}
                      />
                    }
                    style={{ marginTop: "-4px" }}
                  >
                    Upload Image File
                  </Button>
                </label>
                <Button
                  type="submit"
                  id="publishscriptpublish"
                  fullWidth
                  variant="contained"
                >
                  Publish
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="publishscriptfooter">
        <FooterDirector />
      </div>
    </div>
  );
}
export default PublishScript;
