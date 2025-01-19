import Stack from "@mui/material/Stack";
import StyledTextField from "./TextField";

export default Common = () => {
  return (
    <Stack spacing={3} direction="column">
      <StyledTextField
        id="outlined-basic"
        label="Date (dd/mm/yyyy)"
        colorSpace="commonSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Amount (€)"
        colorSpace="commonSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Category"
        colorSpace="commonSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Sub-category"
        colorSpace="commonSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Shop"
        colorSpace="commonSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Details"
        colorSpace="commonSpace"
      />
    </Stack>
  );
};
