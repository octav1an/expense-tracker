import { Button } from "@mui/material";

export default SubmitFormButtons = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{ color: "#ffffff", width: "80%" }}
        variant="contained"
        color={props.colorSpace}
        onClick={props.onSubmitClick}
      >
        Submit
      </Button>
      <Button
        sx={{ width: "15%" }}
        variant="outlined"
        color={props.colorSpace}
        onClick={props.onResetClick}
      >
        Reset
      </Button>
    </div>
  );
};
