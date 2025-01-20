import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "./TextField";

export default StyledDatePicker = (props) => {
  const { colorSpace, required, ...otherProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...otherProps}
        colorSpace={colorSpace}
        slots={{
          textField: TextField,
        }}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            colorSpace,
            required,
            sx: (theme) => ({
              "& .MuiSvgIcon-root": {
                color: theme.palette[colorSpace]?.light,
              },
            }),
          },
        }}
      />
    </LocalizationProvider>
  );
};
