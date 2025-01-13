import React from "react";
import Personal from "./Personal";

export default TabPanel = ({ tabValue }) => {
  let componentToRender;

  switch (tabValue) {
    case 0:
      componentToRender = <Personal />;
      break;
    case 1:
      componentToRender = <div>Common</div>;
      break;
    case 2:
      componentToRender = <div>Food</div>;
      break;
    default:
      componentToRender = <div>Default Component</div>;
  }

  return componentToRender;
};
