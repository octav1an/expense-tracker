import { Stack } from "@mui/material";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import { common } from "@mui/material/colors";

export default Common = () => {
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
      <TextField
        id="outlined-basic"
        label="Category"
        colorSpace="commonSpace"
        required
      />
      <TextField
        id="outlined-basic"
        label="Sub-category"
        colorSpace="commonSpace"
        required
      />
      <Checkbox colorSpace="commonSpace" />
      <TextField id="outlined-basic" label="Shop" colorSpace="commonSpace" />
      <TextField id="outlined-basic" label="Details" colorSpace="commonSpace" />
    </Stack>
  );
};
