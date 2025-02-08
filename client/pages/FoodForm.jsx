import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { FOOD_SHOPS } from "../constants";

const Food = () => {
  const initFormData = {
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    amount: "",
    shop: "",
    details: "",
  };

  const [formData, setFormData] = React.useState(initFormData);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    // Date picker on change is different and only exposes the date directly not an event
    setFormData((prevData) => ({
      ...prevData,
      ["date"]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    console.log("Form Submitted:", formData);
    try {
      // eslint-disable-next-line no-undef
      google.script.run
        .withSuccessHandler(handleSuccessSubmit)
        .withFailureHandler(handleFailedSubmit)
        .POST_foodForm(formData);
    } catch (e) {
      handleFailedSubmit(e);
    }
  };

  const handleSuccessSubmit = () => {
    // Form has to be reset after each successful transaction
    setFormData(initFormData);
    setLoading(false);
  };

  const handleFailedSubmit = (res) => {
    console.log("error ", res);
    setLoading(false);
    // TODO: add an error snack bar
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} direction="column">
        <DatePicker
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
        <SubmitFormButtons colorSpace="foodSpace" loading={loading} />
      </Stack>
    </Box>
  );
};

export default Food;
