import React from "react";
import { styled } from "@mui/system";
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

const isNumber = (value, type) => {
  if (type == "number") {
    setError(!isNaN(value) && value.trim() !== "");
  }
};

export default StyledTextComponent = (props) => {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { colorSpace = "personalSpace", type, ...otherProps } = props;
  otherProps;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (type === "number") {
      if (/^\d*\.?\d*$/.test(inputValue)) {
        setValue(inputValue);
      }
    } else {
      setValue(inputValue);
    }
  };

  return (
    <CssTextField
      {...otherProps}
      value={value}
      variant="filled"
      onChange={(e) => handleChange(e)}
      color={colorSpace}
      colorSpace={colorSpace}
    />
  );
};
