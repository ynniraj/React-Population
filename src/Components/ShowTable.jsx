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
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../Redux/DataApi/action";

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

export default function ShowTable() {
  const dispatch = useDispatch();
  const getTableData = useSelector(
    (store) => store.getDataReducer.selectedProduct
  );
  useEffect(() => {
    getCityData();
  }, []);
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
        dispatch(selectProducts([...response.data]));

        // setData([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSortAsc = () => {
    axios
      .get("https://reactpopulation.herokuapp.com/add-city?_sort=population")
      .then((response) => {
        console.log(response);
        dispatch(selectProducts([...response.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSortDesc = () => {
    axios
      .get(
        "https://reactpopulation.herokuapp.com/add-city?_sort=population&_order=desc"
      )
      .then((response) => {
        console.log(response);
        dispatch(selectProducts([...response.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pop, setPop] = useState("");
  const [ids, setId] = useState("");
  const handleUpdateChanges = () => {
    const payload = {
      city: city,
      population: pop,
      country: country,
    };
    axios
      .patch(`https://reactpopulation.herokuapp.com/add-city/${ids}`, payload)
      .then((response) => {
        console.log(response);
        getCityData();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(ids);
    console.log(payload);
  };

  const [countryFilter, setCountryFilter] = useState("");

  const handleCountryFilters = () => {
    axios
      .get(
        `https://reactpopulation.herokuapp.com/add-city?country=${countryFilter}`
      )
      .then((response) => {
        console.log(response);
        dispatch(selectProducts([...response.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="contained"
          sx={{ m: 3, height: "50%" }}
          onClick={handleSortAsc}
        >
          Sort Population By Asc
        </Button>
        <Button
          variant="contained"
          sx={{ m: 3, height: "50%" }}
          onClick={handleSortDesc}
        >
          Sort Population By Desc
        </Button>

        <Box sx={{ width: "20%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="population"
            onChange={(e) => setCountryFilter(e.target.value)}
            label="Seach By Country"
            name="population"
            autoFocus
          />

          <Button
            onClick={handleCountryFilters}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Search Country
          </Button>
        </Box>
      </Box>

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
              {getTableData.map((el) => (
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
                        onClick={(e) => setOpen(true) || setId(el.id)}
                      >
                        Edit
                      </Button>
                    }
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
                            onClick={handleUpdateChanges}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Update Changes
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
