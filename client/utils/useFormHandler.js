import React from "react";

export const useFormHandler = (initData, submitCallback) => {
  const [formData, setFormData] = React.useState(initData);
  const [loading, setLoading] = React.useState(false);

  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "category" && { subCategory: "" }), // reset subCategory when category is changed
    }));
  };

  const handleSuccessSubmit = () => {
    // Form has to be reset after each successful transaction
    setFormData(initData);
    setLoading(false);
  };

  const handleErrorSubmit = (err) => {
    console.error("error ", err);
    setLoading(false);
    // TODO: add an error snack bar
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    console.log("Form Submitted:", formData);
    try {
      submitCallback(formData, handleSuccessSubmit, handleErrorSubmit);
    } catch (err) {
      handleErrorSubmit(err);
    }
  };

  return {
    formData,
    loading,
    handleFormChange,
    handleSubmit,
  };
};
