import React from "react";
import "./PublishScript.css";

import NavbarWriter from "./writernavbar/NavbarWriter";
import { Typography } from "@mui/material";
import FooterDirector from "./writernavbar/Footerwriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
function PublishScript() {
  return (
    <div>
      <div className="publishscriptHeader">
        <NavbarWriter />
      </div>
      <div className="publishscriptcontent row">
        <div className="publilcscriptright col-lg-7 ">
          <div>
            <Typography className="publishscriptheading me-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
            <div className="publishscriptsubtext mt-3 mb-4 ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                aliquam rutrum eleifend. Sed vestibulum leo eget neque luctus, a
                convallis est tempus. Proin et rutrum tortor. Aenean ullamcorper
                ultrices nisl, id interdum justo facilisis non. Duis bibendum
                magna ac ante rhoncus aliquam. Suspendisse ornare velit id
                ligula posuere, vel interdum lectus lacinia.
              </p>
            </div>
            <div className="publishscriptimage mt-4 container">
              <img
                className="publishscriptgroupimage img-fluid"
                src="./Images/Group.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="publishscriptleft col   ml-2  ">
          <div className="publishscriptbox">
            <div className="publishscriptboxContent mt-4">
              <div className="publishscripttitle">Publish Your Script</div>
              <form action="">
                <input
                  type="text"
                  className="publishscriptMovie mt-4 "
                  placeholder="Movie Name"
                />
                <input
                  type="text"
                  className="publishscriptsynopsis mt-3"
                  placeholder="Synopsis"
                />
                <select
                  type="text"
                  className="publishscriptgenre mt-3"
                  placeholder="Genre"
                >
                  {" "}
                  <option value="Genre">Genre</option>
                </select>
                <select
                  type="text"
                  className="publishscripttype mt-3"
                  placeholder="Genre"
                >
                  {" "}
                  <option value="Genre">Script Type</option>
                </select>
                <button className="publishscriptupload mt-3" type="submit">
                  <span>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      style={{ color: "#14ABE4" }}
                    />
                  </span>
                  Uplaod Script
                </button>
                <button type="submit" className="publishscriptpublish mt-3">
                  Publish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="publishscriptfooter">
        <FooterDirector />
      </div>
    </div>
  );
}

export default PublishScript;
