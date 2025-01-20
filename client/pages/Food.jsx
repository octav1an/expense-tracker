import Stack from "@mui/material/Stack";
import StyledTextField from "./TextField";

export default Food = () => {
  return (
    <Stack spacing={3} direction="column">
      <StyledTextField
        id="outlined-basic"
        label="Date (dd/mm/yyyy)"
        colorSpace="foodSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Amount (€)"
        colorSpace="foodSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Category"
        colorSpace="foodSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Sub-category"
        colorSpace="foodSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Shop"
        colorSpace="foodSpace"
      />
      <StyledTextField
        id="outlined-basic"
        label="Details"
        colorSpace="foodSpace"
      />
    </Stack>
  );
};
