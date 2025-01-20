import { Stack, MenuItem } from "@mui/material";
import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import { CATEGORIES } from "../constants";

export default Common = ({}) => {
  return (
    <Stack spacing={3} direction="column">
      <DatePicker label="Date" colorSpace="commonSpace" required />
      <TextField
        id="outlined-basic"
        label="Amount (€)"
        colorSpace="commonSpace"
        type="number"
        required
      />
      {/* <TextField
        id="outlined-basic"
        label="Category"
        color="commonSpace"
        required
        select
        // value={category}
        // onChange={onSetCategory}
      >
        {CATEGORIES.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
      <TextField
        id="outlined-basic"
        label="Sub-category"
        colorSpace="commonSpace"
        required
      />
      <Checkbox colorSpace="commonSpace" />
      <TextField id="outlined-basic" label="Shop" colorSpace="commonSpace" />
      <TextField
        id="outlined-basic"
        label="Details"
        colorSpace="commonSpace"
        multiline
      />
    </Stack>
  );
};
