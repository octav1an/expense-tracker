import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { CATEGORIES } from "../constants";
import { getSubCategory } from "../utils";

const SharedForm = ({ pageType }) => {
  const initFormData = {
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    amount: "",
    category: "",
    subCategory: "",
    shop: "",
    details: "",
    paidForOtherPartner: false, // FIXME
    _formType: "",
  };

  const [formData, setFormData] = React.useState(initFormData);

  React.useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      _formType: pageType,
    }));
  }, [pageType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "category" && { subCategory: "" }), // reset subCategory when category is changed
    }));
  };

  const handleDateChange = (date) => {
    // Date picker on change is different and only exposes the date directly not an event
    setFormData((prevData) => ({
      ...prevData,
      ["date"]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form Submitted:", formData);
    // eslint-disable-next-line no-undef
    google.script.run
      .withSuccessHandler(() => handleSuccessSubmit())
      .withFailureHandler((res) => console.log("error ", res))
      .POST_sharedForm(formData);
  };

  const handleSuccessSubmit = () => {
    // Form has to be reset after each successful transaction
    setFormData(initFormData);
    // TODO: add completion animation
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} direction="column">
        <DatePicker
          label="Date"
          colorSpace={pageType}
          required
          value={formData.date}
          onChange={handleDateChange}
        />
        <TextField
          name="amount"
          label="Amount (€)"
          colorSpace={pageType}
          type="number"
          required
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="Category"
          colorSpace={pageType}
          required
          select
          value={formData.category}
          onChange={handleChange}
        >
          {Object.keys(CATEGORIES).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="subCategory"
          label="Sub-category"
          colorSpace={pageType}
          required
          select
          value={formData.subCategory}
          onChange={handleChange}
        >
          {getSubCategory(formData.category).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {pageType === "commonSpace" && <Checkbox colorSpace={pageType} />}
        <TextField
          name="shop"
          label="Shop"
          colorSpace={pageType}
          value={formData.shop}
          onChange={handleChange}
        />
        <TextField
          name="details"
          label="Details"
          colorSpace={pageType}
          value={formData.details}
          onChange={handleChange}
          multiline
        />
        <SubmitFormButtons
          colorSpace={pageType}
          onSubmitClick={() => console.log("click submit")}
          onResetClick={() => console.log("click reset")}
        />
      </Stack>
    </Box>
  );
};

export default SharedForm;
