import React from "react";
import { Button, MenuItem, Stack } from "@mui/material";

import TextField from "./TextField";
import DatePicker from "./DatePicker";
import SubmitFormButtons from "./SubmitFormButtons";
import { CATEGORIES } from "../constants";
import { getSubCategory } from "../utils";

import dayjs from "dayjs";

export default Personal = ({}) => {
  const [date, setDate] = React.useState(dayjs(new Date())); // Maybe set it to today?
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [shop, setShop] = React.useState("");
  const [details, setDetails] = React.useState("");

  console.log(date, amount, category, subCategory, shop, details);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Reset sub-category, if category is changed
    setSubCategory("");
  };

  return (
    <Stack spacing={3} direction="column">
      <DatePicker
        label="Date"
        colorSpace="personalSpace"
        required
        value={date}
        onChange={(e) => setDate(e)}
      />
      <TextField
        label="Amount (€)"
        color="personalSpace"
        type="number"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        label="Category"
        color="personalSpace"
        required
        select
        value={category}
        onChange={handleCategoryChange}
      >
        {Object.keys(CATEGORIES).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Sub-category"
        color="personalSpace"
        required
        select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      >
        {getSubCategory(category).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Shop"
        color="personalSpace"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <TextField
        label="Details"
        color="personalSpace"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        multiline
      />
      <SubmitFormButtons
        colorSpace="personalSpace"
        onSubmitClick={() => console.log("click submit")}
        onResetClick={() => console.log("click reset")}
      />
    </Stack>
  );
};
