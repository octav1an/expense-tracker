import { shouldForwardProp, styled } from "@mui/system";
import { TextField } from "@mui/material";

const CssTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "colorSpace",
})(({ theme, colorSpace }) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette[colorSpace].background,
    "&:hover": {
      borderBottomColor: theme.palette[colorSpace].placeholder,
      backgroundColor: theme.palette[colorSpace].backgroundHover,
    },
    "&:before": {
      borderBottomColor: theme.palette[colorSpace].placeholder,
    },
  },
  "&& .MuiFilledInput-underline": {
    borderBottomColor: theme.palette[colorSpace].placeholder,
    "&:hover:before": {
      borderBottomColor: theme.palette[colorSpace].placeholder,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette[colorSpace].placeholder,
  },
  "& .MuiInputBase-input": {
    color: "#444444",
  },
}));

export default StyledTextComponent = (props) => {
  const { colorSpace = "personalSpace", ...otherProps } = props;
  return (
    <CssTextField
      {...otherProps}
      variant="filled"
      color={colorSpace}
      colorSpace={colorSpace}
    />
  );
};
