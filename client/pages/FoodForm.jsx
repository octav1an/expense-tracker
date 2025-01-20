import React from "react";
import { MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import { FOOD_SHOPS } from "../constants";

export default Food = () => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [amount, setAmount] = React.useState("");
  const [shop, setShop] = React.useState("");
  const [details, setDetails] = React.useState("");

  return (
    <Stack spacing={3} direction="column">
      <DatePicker
        label="Date"
        colorSpace="foodSpace"
        required
        value={date}
        onChange={(e) => setDate(e)}
      />
      <TextField
        label="Amount (€)"
        colorSpace="foodSpace"
        type="number"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        label="Shop"
        colorSpace="foodSpace"
        required
        select
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      >
        {FOOD_SHOPS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Details"
        colorSpace="foodSpace"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        multiline
      />
      <SubmitFormButtons
        colorSpace="foodSpace"
        onSubmitClick={() => console.log("click submit")}
        onResetClick={() => console.log("click reset")}
      />
    </Stack>
  );
};
