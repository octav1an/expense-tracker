import TextField from "@mui/material/TextField";
import { borderBottom, styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fcfcfc",
    "&:hover": {
      borderBottomColor: " #dec2ff",
      backgroundColor: "#faf6ff",
    },
    "&:before": {
      borderBottomColor: " #dec2ff",
    },
  },
  "&& .MuiFilledInput-underline": {
    borderBottomColor: "#dec2ff",
    "&:hover:before": {
      borderBottomColor: "#dec2ff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#dec2ff",
  },
  "& .MuiInputBase-input": {
    color: "#434343",
  },
});

export default Personal = () => {
  return (
    <div>
      <StyledTextField
        id="outlined-basic"
        label="Outlined"
        variant="filled"
        color="personalSpace"
      />
    </div>
  );
};
