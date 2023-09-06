import React from "react";
import "./PublishScript.css";

import NavbarWriter from "./writernavbar/NavbarWriter";
import {
  Grid,
  InputBase,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import FooterDirector from "./writernavbar/Footerwriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material";

function PublishScript() {
  return (
    <div>
      <div className="publishscriptHeader">
        <NavbarWriter />
      </div>
      <Grid container spacing={3} className="publishscriptcontent">
        <Grid item xs={12} lg={7} md={7} className="publilcscriptleft">
          <div>
            <Typography className="publishscriptheading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
            <div className="publishscriptsubtext  ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                aliquam rutrum eleifend. Sed vestibulum leo eget neque luctus, a
                convallis est tempus. Proin et rutrum tortor. Aenean ullamcorper
                ultrices nisl, id interdum justo facilisis non. Duis bibendum
                magna ac ante rhoncus aliquam. Suspendisse ornare velit id
                ligula posuere, vel interdum lectus lacinia.
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
              <form action="">
                <TextField
                  id="publishscriptMovie"
                  fullWidth
                  label="Movie Name"
                  margin="dense"
                  sx={{ "& fieldset": { border: "none" } }}
                />
                <TextField
                  id="publishscriptsynopsis"
                  fullWidth
                  label="Synopsis"
                  margin="normal"
                  sx={{ "& fieldset": { border: "none" } }}
                />
                <Select
                  id="publishscriptgenre"
                  fullWidth
                  label="Genre"
                  defaultValue="Genre"
                  sx={{ "& fieldset": { border: "none" } }}
                >
                  <MenuItem value="Genre">Genre</MenuItem>
                </Select>
                <Select
                  id="publishscripttype"
                  fullWidth
                  variant="outlined"
                  label="Script Type"
                  defaultValue="Script Type"
                  sx={{ "& fieldset": { border: "none" } }}
                >
                  <MenuItem value="Script Type">Script Type</MenuItem>
                </Select>
                <Button
                  id="publishscriptupload"
                  fullWidth
                  startIcon={
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      style={{ color: "#14ABE4" }}
                    />
                  }
                  style={{ marginTop: "16px" }}
                >
                  Upload Script
                </Button>
                <Button
                  id="publishscriptimageupload"
                  fullWidth
                  startIcon={
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      style={{ color: "#14ABE4" }}
                    />
                  }
                  style={{ marginTop: "16px" }}
                >
                  Upload Image
                </Button>
                <Button id="publishscriptpublish" fullWidth variant="contained">
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
