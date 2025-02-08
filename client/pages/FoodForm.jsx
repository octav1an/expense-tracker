import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { FOOD_SHOPS } from "../utils/constants";
import { useFormHandler } from "../utils";

const submitForm = (data, onSuccess, onError) => {
  try {
    // eslint-disable-next-line no-undef
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onError)
      .POST_foodForm(data);
  } catch (err) {
    onError(err);
  }
};

const Food = () => {
  const initFormData = {
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    amount: "",
    shop: "",
    details: "",
  };

  const { formData, loading, handleFormChange, handleSubmit } = useFormHandler(
    initFormData,
    submitForm
  );

  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e, formData)}>
      <Stack spacing={3} direction="column">
        <DatePicker
          label="Date"
          colorSpace="foodSpace"
          required
          value={formData.date}
          onChange={handleFormChange}
        />
        <TextField
          name="amount"
          label="Amount (€)"
          colorSpace="foodSpace"
          type="number"
          required
          value={formData.amount}
          onChange={handleFormChange}
        />
        <TextField
          name="shop"
          label="Shop"
          colorSpace="foodSpace"
          required
          select
          value={formData.shop}
          onChange={handleFormChange}
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
          onChange={handleFormChange}
          multiline
        />
        <SubmitFormButtons colorSpace="foodSpace" loading={loading} />
      </Stack>
    </Box>
  );
};

export default Food;
