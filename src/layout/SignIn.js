import { FastField, Form, Formik } from "formik";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import * as Yup from "yup";
import InputField from "../utils/InputField";
import app from "../firesbase/firebase";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("The field need enter email"),
  password: Yup.string().required("The field need enter password"),
});

function SignIn({ history }) {
  const handleSubmitForm = useCallback(
    async (values, resetForm) => {
      const { email, password } = values;

      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (err) {
        console.log(err);
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
              <h3 className="text-center text-capitalize">Sign in</h3>
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

                      <Button
                        type="submit"
                        color="info"
                        className="text-capitalize"
                      >
                        Sign In
                      </Button>
                      <h5 className="mt-3">
                        If you don't have an account? Please
                        <Link to="/signup"> Sign Up.</Link>
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

export default SignIn;
