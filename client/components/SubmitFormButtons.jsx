import { Button } from "@mui/material";

const SubmitFormButtons = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{ color: "#ffffff", width: "80%" }}
        variant="contained"
        type="submit"
        color={props.colorSpace}
        onClick={props.onSubmitClick}
        loading={props.loading}
      >
        Submit
      </Button>
      <Button
        sx={{ width: "15%" }}
        variant="outlined"
        type="reset"
        color={props.colorSpace}
        onClick={props.onResetClick}
        disabled={props.loading}
      >
        Reset
      </Button>
    </div>
  );
};

export default SubmitFormButtons;
