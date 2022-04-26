import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import ShowTable from "./ShowTable";
import { useDispatch } from "react-redux";
import { selectProducts } from "../Redux/DataApi/action";

const Table = () => {
  const dispatch = useDispatch();

  const handleSubmitCountry = (event) => {
    event.preventDefault();
    const payload = {
      country: event.target.country.value,
    };
    axios
      .post("https://reactpopulation.herokuapp.com/add-country", payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitCity = (event) => {
    event.preventDefault();
    const payload = {
      city: event.target.city.value,
      population: event.target.population.value,
      country: event.target.country.value,
    };

    axios
      .post("https://reactpopulation.herokuapp.com/add-city", payload)
      .then((response) => {
        console.log(response);
        getCityData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCityData = () => {
    axios
      .get("https://reactpopulation.herokuapp.com/add-city")
      .then((response) => {
        console.log(response.data);
        dispatch(selectProducts([...response.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Container component="main" maxWidth="xs">
          <h1>Add Country</h1>

          <Box
            component="form"
            onSubmit={handleSubmitCountry}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Add Country"
              name="country"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Country
            </Button>
          </Box>
        </Container>

        <Container component="main" maxWidth="xs">
          <h1>Add City</h1>
          <Box
            component="form"
            onSubmit={handleSubmitCity}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="Add City"
              name="city"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="population"
              label="Population"
              name="population"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Add Country"
              name="country"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add City
            </Button>
          </Box>
        </Container>
      </Box>

      <ShowTable />
    </>
  );
};

export default Table;
