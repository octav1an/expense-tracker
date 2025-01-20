import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import { FOOD_SHOPS } from "../constants";

export default Food = () => {
  const [formData, setFormData] = React.useState({
    date: dayjs(new Date()),
    amount: "",
    shop: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    // Date picker on change is different and only exposes the date directly
    console.log(date);
    setFormData((prevData) => ({
      ...prevData,
      ["date"]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form Submitted:", formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} direction="column">
        <DatePicker
          name="date"
          label="Date"
          colorSpace="foodSpace"
          required
          value={formData.date}
          onChange={handleDateChange}
        />
        <TextField
          name="amount"
          label="Amount (€)"
          colorSpace="foodSpace"
          type="number"
          required
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          name="shop"
          label="Shop"
          colorSpace="foodSpace"
          required
          select
          value={formData.shop}
          onChange={handleChange}
        >
          {FOOD_SHOPS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="details"
          label="Details"
          colorSpace="foodSpace"
          value={formData.details}
          onChange={handleChange}
          multiline
        />
        <SubmitFormButtons
          colorSpace="foodSpace"
          onSubmitClick={() => console.log("click submit")}
          onResetClick={() => console.log("click reset")}
        />
      </Stack>
    </Box>
  );
};
