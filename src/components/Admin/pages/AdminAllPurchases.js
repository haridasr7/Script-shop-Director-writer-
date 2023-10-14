import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminAllPurchases.css";
import { Grid, Box, Container, Typography, TextField } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AdminFooter from "../components/AdminFooter";

function AdminAllPurchases() {
  const purchasedDetails = [
    {
      scriptNo: 145678,
      date: "06/08/21",
      scriptName: "The Confession",
      writer: "John Doe",
      director: "William John",
    },
    {
      scriptNo: 145678,
      date: "06/08/21",
      scriptName: "The Confession",
      writer: "John Doe",
      director: "William John",
    },
    {
      scriptNo: 145678,
      date: "06/08/21",
      scriptName: "The Confession",
      writer: "John Doe",
      director: "William John",
    },
  ];
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
                  placeholder="Search Here"
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
            </Grid>
            <Box id="adminAllpurchasedirectorbox">
              <Typography id="adminAllpurchasedirectorsubhead">
                View all the scripts purchased by the Directors recently.
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid lg={12} sx={{ marginTop: "5vw" }}>
                <TableContainer>
                  <Table sx={{ backgroundColor: "#EBEBEB" }}>
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
                      {purchasedDetails.map((details, index) => (
                        <TableRow key={index}>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.scriptNo}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.date}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.scriptName}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.writer}
                          </TableCell>
                          <TableCell id="adminAllpurchasedirectorTableBody">
                            {details.director}
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
