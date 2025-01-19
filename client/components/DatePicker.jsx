import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "./TextField";

export default CssDatePicker = ({ label, colorSpace }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        colorSpace="personalSpace"
        slots={{
          textField: TextField,
        }}
        slotProps={{
          textField: { colorSpace },
        }}
      />
    </LocalizationProvider>
  );
};
