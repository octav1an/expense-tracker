import Stack from "@mui/material/Stack";
import TextField from "./TextField";
import DatePicker from "./DatePicker";

export default Personal = () => {
  return (
    <Stack spacing={3} direction="column">
      <DatePicker colorSpace="personalSpace" />
      <TextField id="outlined-basic" label="Amount (€)" color="personalSpace" />
      <TextField id="outlined-basic" label="Category" color="personalSpace" />
      <TextField
        id="outlined-basic"
        label="Sub-category"
        color="personalSpace"
      />
      <TextField id="outlined-basic" label="Shop" color="personalSpace" />
      <TextField id="outlined-basic" label="Details" color="personalSpace" />
    </Stack>
  );
};
