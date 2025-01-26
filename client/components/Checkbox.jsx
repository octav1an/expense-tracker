import { FormControlLabel, Checkbox } from "@mui/material";

const StyledCheckbox = (props) => {
  const { colorSpace = "personalSpace", ...otherProps } = props;
  return (
    <FormControlLabel
      control={<Checkbox {...otherProps} color={colorSpace} />}
      label="I paid for my partner"
    />
  );
};

export default StyledCheckbox;
