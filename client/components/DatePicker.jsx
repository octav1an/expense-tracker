import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "./TextField";

import dayjs from "dayjs";

export default StyledDatePicker = ({ label, colorSpace, required }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        colorSpace="personalSpace"
        slots={{
          textField: TextField,
        }}
        defaultValue={dayjs(new Date())}
        slotProps={{
          textField: { colorSpace, required },
        }}
      />
    </LocalizationProvider>
  );
};
