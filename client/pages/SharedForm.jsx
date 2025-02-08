import React from "react";
import { Box, MenuItem, Stack } from "@mui/material";
import dayjs from "dayjs";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import Checkbox from "../components/Checkbox";
import SubmitFormButtons from "../components/SubmitFormButtons";
import { CATEGORIES } from "../utils/constants";
import { getSubCategory, useFormHandler } from "../utils";

const submitForm = (data, onSuccess, onError) => {
  try {
    // eslint-disable-next-line no-undef
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onError)
      .POST_sharedForm(data);
  } catch (e) {
    onError(e);
  }
};

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

  const { formData, loading, handleFormChange, handleSubmit } = useFormHandler(
    initFormData,
    submitForm
  );

  React.useEffect(() => {
    setFormType(pageType);
  }, [pageType]);

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e, { ...formData, _formType: formType })}
    >
      <Stack spacing={3} direction="column">
        <DatePicker
          name="date"
          label="Date"
          colorSpace={pageType}
          required
          value={formData.date}
          onChange={handleFormChange}
        />
        <TextField
          name="amount"
          label="Amount (€)"
          colorSpace={pageType}
          type="number"
          required
          value={formData.amount}
          onChange={handleFormChange}
        />
        <TextField
          name="category"
          label="Category"
          colorSpace={pageType}
          required
          select
          value={formData.category}
          onChange={handleFormChange}
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
          onChange={handleFormChange}
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
              handleFormChange(e.target.name, e.target.checked);
            }}
            colorSpace={pageType}
          />
        )}
        <TextField
          name="shop"
          label="Shop"
          colorSpace={pageType}
          value={formData.shop}
          onChange={handleFormChange}
        />
        <TextField
          name="details"
          label="Details"
          colorSpace={pageType}
          value={formData.details}
          onChange={handleFormChange}
          multiline
        />
        <SubmitFormButtons colorSpace={pageType} loading={loading} />
      </Stack>
    </Box>
  );
};

export default SharedForm;
