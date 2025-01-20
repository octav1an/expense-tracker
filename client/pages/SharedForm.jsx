import React from "react";
import { MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { CATEGORIES } from "../constants";
import { getSubCategory } from "../utils";

export default SharedForm = ({ pageType }) => {
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
        colorSpace={pageType}
        required
        value={date}
        onChange={(e) => setDate(e)}
      />
      <TextField
        label="Amount (€)"
        colorSpace={pageType}
        type="number"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        label="Category"
        colorSpace={pageType}
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
        colorSpace={pageType}
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
      {pageType === "commonSpace" && <Checkbox colorSpace={pageType} />}
      <TextField
        label="Shop"
        colorSpace={pageType}
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <TextField
        label="Details"
        colorSpace={pageType}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        multiline
      />
      <SubmitFormButtons
        colorSpace={pageType}
        onSubmitClick={() => console.log("click submit")}
        onResetClick={() => console.log("click reset")}
      />
    </Stack>
  );
};
