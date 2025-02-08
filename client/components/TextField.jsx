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

const StyledPaper = styled("div", {
  shouldForwardProp: (prop) => prop !== "colorSpace",
})(({ theme, colorSpace }) => ({
  backgroundColor: theme.palette[colorSpace].background,
  color: "#444444",
  boxShadow: theme.shadows[8],
}));

const StyledTextComponent = (props) => {
  // const [value, setValue] = React.useState("");

  const { colorSpace = "personalSpace", ...otherProps } = props;
  otherProps;

  // const handleChange = (e) => {
  //   const inputValue = e.target.value;
  //   if (type === "number") {
  //     if (/^\d*\.?\d*$/.test(inputValue)) {
  //       setValue(inputValue);
  //     }
  //   } else {
  //     setValue(inputValue);
  //     props.onChange?.(e);
  //   }
  // };

  return (
    <CssTextField
      {...otherProps}
      variant="filled"
      onChange={(e) => props.onChange(e.target.name, e.target.value)}
      color={colorSpace}
      colorSpace={colorSpace}
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              component: StyledPaper, // Attach the custom styled Paper
              colorSpace: colorSpace,
            },
          },
        },
      }}
    />
  );
};

export default StyledTextComponent;
