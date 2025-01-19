import Stack from "@mui/material/Stack";
import TextField from "./TextField";
import DatePicker from "./DatePicker";

export default Personal = () => {
  return (
    <Stack spacing={3} direction="column">
      <DatePicker label="Date" colorSpace="personalSpace" required />
      <TextField
        id="outlined-basic"
        label="Amount (€)"
        color="personalSpace"
        type="number"
        required
      />
      <TextField
        id="outlined-basic"
        label="Category"
        color="personalSpace"
        required
      />
      <TextField
        id="outlined-basic"
        label="Sub-category"
        color="personalSpace"
        required
      />
      <TextField id="outlined-basic" label="Shop" color="personalSpace" />
      <TextField
        id="outlined-basic"
        label="Details"
        color="personalSpace"
        multiline
      />
    </Stack>
  );
};
