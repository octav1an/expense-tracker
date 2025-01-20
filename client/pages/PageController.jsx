import React from "react";
import SharedForm from "./SharedForm";
import Food from "./FoodForm";

export default PageController = ({ tabValue }) => {
  const [date, setDate] = React.useState(); // Maybe set it to today?
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");

  let componentToRender;
  console.log(category);

  switch (tabValue) {
    case 0:
      componentToRender = (
        <SharedForm
          pageType="personalSpace"
          // category={category}
          // onSetCategory={(e) => setCategory(e.target.value)}
        />
      );
      break;
    case 1:
      componentToRender = <SharedForm pageType="commonSpace" />;
      break;
    case 2:
      componentToRender = <Food />;
      break;
    default:
      componentToRender = <div>Default Component</div>;
  }

  return componentToRender;
};
