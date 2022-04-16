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
import { useSelector, useDispatch } from "react-redux";
import { deleteId } from "../Redux/action";

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
  useSelector((store) => store.delete.data);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/add-city/${id}`)
      .then((response) => {
        console.log(response);
        getCityData();
        localStorage.setItem("data", JSON.stringify(response.data));
        const localStorageToken = localStorage.getItem("data");
        dispatch(deleteId(localStorageToken));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCityData = () => {
    axios
      .get("http://localhost:8080/add-city")
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

  const localStorageToken = localStorage.getItem("data");
  dispatch(deleteId(localStorageToken));

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
                    {<Button variant="contained">Edit</Button>}
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
