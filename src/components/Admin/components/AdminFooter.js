import React from "react";
import "./AdminFooter.css";
import { Typography } from "@mui/material";

function AdminFooter() {
  return (
    <div>
      <div className="FMCopyright">
        <Typography id="FMCopyrightT">
          Copyright @ Year, Name. All Right Reserved
        </Typography>
      </div>
    </div>
  );
}

export default AdminFooter;
