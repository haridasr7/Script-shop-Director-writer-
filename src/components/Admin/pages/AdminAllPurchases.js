import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminAllPurchases.css";
import { Grid, Box, Container, Typography, TextField } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AdminFooter from "../components/AdminFooter";
import axios from "axios";

function AdminAllPurchases() {
  const [userpurchase, setpurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/Admin/api/v1/user-purchased")
      .then((response) => {
        // Set the user purchase details to state
        setpurchase(response.data);
        setLoading(false);
        console.log(userpurchase);
      })
      .catch((error) => {
        console.error("Error fetching user purchase details:", error);
        setLoading(false);
      });
  }, []);

  const formatPurchaseDate = (purchaseDate) => {
    const date = new Date(purchaseDate);
    return date.toISOString().slice(0, 10);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPurchases = userpurchase.filter((details) =>
    details.scriptName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={9}>
          <Container>
            <Grid container spacing={2} id="adminAllpurchaseHeadingBox">
              <Grid lg={4}>
                <Typography id="adminAllpurchaseHeading">
                  All Purchases
                </Typography>
              </Grid>

              <Grid lg={8}>
                <TextField
                  id="adminAllpurchaseSearchBox"
                  placeholder="Search User"
                  sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                  fullWidth
                  onChange={handleSearch}
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
            </Grid>
            <Box id="adminAllpurchasedirectorbox">
              <Typography id="adminAllpurchasedirectorsubhead">
                View all the scripts purchased by the Directors recently.
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid lg={12} sx={{ marginTop: "5vw" }}>
                <TableContainer>
                  <Table
                    sx={{
                      backgroundColor: "#EBEBEB",
                      borderCollapse: "separate",
                      borderSpacing: "0 4px",
                      borderRadius: "53px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell id="adminAllpurchasedirectorTableHead">
                          Script No #
                        </TableCell>
                        <TableCell id="adminAllpurchasedirectorTableHead">
                          Date
                        </TableCell>
                        <TableCell id="adminAllpurchasedirectorTableHead">
                          Script Name
                        </TableCell>
                        <TableCell id="adminAllpurchasedirectorTableHead">
                          Writer
                        </TableCell>
                        <TableCell id="adminAllpurchasedirectorTableHead">
                          Purchased By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{ backgroundColor: " #FFF", padding: "2px" }}
                    >
                      {filteredPurchases.map((details, index) => (
                        <TableRow key={index}>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.scriptid}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {formatPurchaseDate(details.dateofpurchase)}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.scriptName}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.writerUsername}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.purchasedBy}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}

export default AdminAllPurchases;
