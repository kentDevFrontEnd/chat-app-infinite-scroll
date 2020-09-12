import React from "react";
import * as Yup from "yup";
import InputField from "../../utils/InputField";
import { Formik, Form, FastField } from "formik";

const initialValues = {
  searchTerm: "",
};

const validationSchema = Yup.object().shape({
  searchTerm: Yup.string().required("What do you want to search?"),
});

function Search({ getSearchTerm }) {
  const handleSubmitSearch = (values, resetForm) => {
    getSearchTerm(values);
    // resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) =>
        handleSubmitSearch(values, resetForm)
      }
    >
      {(props) => {
        return (
          <Form>
            <FastField
              name="searchTerm"
              component={InputField}
              label="Search"
              type="text"
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default Search;
