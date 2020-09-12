import { FastField, Form, Formik } from "formik";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import * as Yup from "yup";
import app from "../firesbase/firebase";
import InputField from "../utils/InputField";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("You need enter email here"),
  password: Yup.string().required("You need enter password here"),
  confirmPassword: Yup.string().required(
    "You need enter confirm password here"
  ),
});

function SignUp({ history }) {
  const handleSubmitForm = useCallback(
    async (values, resetForm) => {
      const { email, password, confirmPassword } = values;

      if (password === confirmPassword) {
        // do something here
        try {
          await app.auth().createUserWithEmailAndPassword(email, password);

          history.push("/signin");
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("valid password");
      }

      resetForm();
    },
    [history]
  );
  return (
    <Container>
      <Row>
        <Col sm={10} md={6} className="mx-auto">
          <Card>
            <CardBody>
              <h3 className="text-center text-capitalize">Sign up</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmitForm(values, resetForm)
                }
              >
                {(props) => {
                  return (
                    <Form>
                      <FastField
                        name="email"
                        component={InputField}
                        label="email"
                        type="email"
                      />

                      <FastField
                        name="password"
                        component={InputField}
                        label="Password"
                        type="password"
                      />

                      <FastField
                        name="confirmPassword"
                        component={InputField}
                        label="Confirm password"
                        type="password"
                      />

                      <Button
                        type="submit"
                        color="primary"
                        className="text-capitalize"
                      >
                        Sign up
                      </Button>
                      <h5 className="mt-3">
                        If you have an account? Please
                        <Link to="/signin"> Sign In.</Link>
                      </h5>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
