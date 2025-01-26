import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import TextField from "./TextField";

const StyledDatePicker = (props) => {
  const { colorSpace, required, value, onChange, ...otherProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...otherProps}
        colorSpace={colorSpace}
        slots={{
          textField: TextField,
        }}
        format="DD/MM/YYYY" // User facing formatting
        value={dayjs(value)}
        onChange={(date) => onChange(date.format("YYYY-MM-DD"))} // Server format
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

export default StyledDatePicker;
