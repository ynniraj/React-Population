import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ShowTable({ tableData, setData }) {
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`https://reactpopulation.herokuapp.com/add-city/${id}`)
      .then((response) => {
        console.log(response);
        getCityData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCityData = () => {
    axios
      .get("https://reactpopulation.herokuapp.com/add-city")
      .then((response) => {
        console.log(response.data);
        setData([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [order, setOrder] = useState("ASC");
  const handlesort = (col) => {
    if (order === "ASC") {
      const sorted = [...tableData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DESC");
    }
    if (order === "DESC") {
      const sorted = [...tableData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pop, setPop] = useState("");

  const handleUpdateChanges = (id) => {
    console.log(city);
    console.log(country);
    console.log(pop);
    const payload = {
      city: city || tableData[id].city,
      population: pop || tableData[id].population,
      country: country || tableData[id].country,
    };
    axios
      .patch(`https://reactpopulation.herokuapp.com/add-city/${id}`, payload)
      .then((response) => {
        console.log(response);
        getCityData();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
    console.log(payload);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ m: 3 }}
        onClick={() => handlesort("ASC")}
      >
        Sort Population
      </Button>
      <Container component="main" maxWidth="m">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Country</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Population</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((el) => (
                <StyledTableRow key={el.id}>
                  <StyledTableCell component="th" scope="el">
                    {el.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.country}</StyledTableCell>
                  <StyledTableCell align="right">{el.city}</StyledTableCell>
                  <StyledTableCell align="right">
                    {el.population}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Button
                        variant="contained"
                        onClick={(e) => setOpen(true)}
                      >
                        Edit
                      </Button>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </Button>
                    }
                  </StyledTableCell>
                  <Modal
                    open={open}
                    onClose={(e) => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "400px",
                        height: "400px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                    >
                      <Box noValidate sx={{ mt: 1, padding: "30px" }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="country"
                          label="Update Country"
                          name="country"
                          onChange={(e) => setCountry(e.target.value)}
                          autoFocus
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          onChange={(e) => setCity(e.target.value)}
                          id="city"
                          label="Update City"
                          name="city"
                          autoFocus
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="population"
                          onChange={(e) => setPop(e.target.value)}
                          label="Update Population"
                          name="population"
                          autoFocus
                        />

                        <Button
                          onClick={() => handleUpdateChanges(el.id)}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update Changes
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
