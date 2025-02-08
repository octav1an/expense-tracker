import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { CATEGORIES } from "../utils/constants";
import { getSubCategory } from "../utils/utils";

const SharedForm = ({ pageType }) => {
  const [formType, setFormType] = React.useState("");
  const initFormData = {
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    amount: "",
    category: "",
    subCategory: "",
    shop: "",
    details: "",
    paidForOtherPartner: false,
  };

  const [formData, setFormData] = React.useState(initFormData);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setFormType(pageType);
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
    setLoading(true);
    const fullFormData = { ...formData, _formType: formType };
    console.log("Form Submitted:", fullFormData);
    try {
      // eslint-disable-next-line no-undef
      google.script.run
        .withSuccessHandler(handleSuccessSubmit)
        .withFailureHandler(handleFailedSubmit)
        .POST_sharedForm(fullFormData);
    } catch (e) {
      handleFailedSubmit(e);
    }
  };

  const handleSuccessSubmit = () => {
    // Form has to be reset after each successful transaction
    setFormData(initFormData);
    setLoading(false);
  };

  const handleFailedSubmit = (res) => {
    console.error("error ", res);
    setLoading(false);
    // TODO: add an error snack bar
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
        {pageType === "commonSpace" && (
          <Checkbox
            name="paidForOtherPartner"
            checked={formData.paidForOtherPartner}
            onChange={(e) => {
              const { name, checked } = e.target;
              setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
              }));
            }}
            colorSpace={pageType}
          />
        )}
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
        <SubmitFormButtons colorSpace={pageType} loading={loading} />
      </Stack>
    </Box>
  );
};

export default SharedForm;
