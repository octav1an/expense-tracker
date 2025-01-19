import React from "react";
import Personal from "./Personal";
import Common from "./Common";
import Food from "./Food";

export default TabPanel = ({ tabValue }) => {
  let componentToRender;

  switch (tabValue) {
    case 0:
      componentToRender = <Personal />;
      break;
    case 1:
      componentToRender = <Common />;
      break;
    case 2:
      componentToRender = <Food />;
      break;
    default:
      componentToRender = <div>Default Component</div>;
  }

  return componentToRender;
};
