import React from "react";
import { MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import { CATEGORIES } from "../constants";
import { getSubCategory } from "../utils";

export default Common = ({}) => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [shop, setShop] = React.useState("");
  const [details, setDetails] = React.useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Reset sub-category, if category is changed
    setSubCategory("");
  };

  return (
    <Stack spacing={3} direction="column">
      <DatePicker
        label="Date"
        colorSpace="commonSpace"
        required
        value={date}
        onChange={(e) => setDate(e)}
      />
      <TextField
        label="Amount (€)"
        colorSpace="commonSpace"
        type="number"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        label="Category"
        colorSpace="commonSpace"
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
        colorSpace="commonSpace"
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
      <Checkbox colorSpace="commonSpace" />
      <TextField
        label="Shop"
        colorSpace="commonSpace"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <TextField
        label="Details"
        colorSpace="commonSpace"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        multiline
      />
      <SubmitFormButtons
        colorSpace="commonSpace"
        onSubmitClick={() => console.log("click submit")}
        onResetClick={() => console.log("click reset")}
      />
    </Stack>
  );
};
