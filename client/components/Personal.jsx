import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.personalSpace.background,
    "&:hover": {
      borderBottomColor: theme.palette.personalSpace.placeholder,
      backgroundColor: theme.palette.personalSpace.backgroundHover,
    },
    "&:before": {
      borderBottomColor: theme.palette.personalSpace.placeholder,
    },
  },
  "&& .MuiFilledInput-underline": {
    borderBottomColor: theme.palette.personalSpace.placeholder,
    "&:hover:before": {
      borderBottomColor: theme.palette.personalSpace.placeholder,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.personalSpace.placeholder,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.personalSpace.placeholder,
  },
}));

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
