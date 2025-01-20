import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "./TextField";

import dayjs from "dayjs";

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
        slotProps={{
          textField: { colorSpace, required },
        }}
      />
    </LocalizationProvider>
  );
};
