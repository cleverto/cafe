import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CambiarContrasena = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    //inputRefdescripcion.current.focus();
    // eslint-disable-next-line
  }, []);

  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);
    await Axios.post(window.globales.url + "/auth/cambiar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({
            text: res.data.msg,
            icon: "info",
          }).then(() => {
            delete Axios.defaults.headers.common["Authorization"];
            localStorage.clear();
            navigate("/login");
          });
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("La contraseña actual es obligatoria"),
    newPassword: Yup.string()
      .required("La contraseña nueva es obligatoria")
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
    confirmPassword: Yup.string()
      .required("Confirme la nueva contraseña")
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(valores) => {
        guardar(valores);
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Container
          fluid
          className="d-flex align-items-center justify-content-center vh-100 "
          style={{
            backgroundImage:
              "url('https://getwallpapers.com/wallpaper/full/7/9/4/60142.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
           {/* Hace fondo de color negro <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)"

    }}
  ></div> */}
          <Row className="w-100">
            <Col xs={12} md={6} lg={4} className="mx-auto">
              <Card className="p-4">
                <Card.Body>
                  <h3 className="text-center mb-4">Cambiar Contraseña</h3>
                  <Form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Form.Group className="mb-3">
                    <Form.Label>Contraseña actual</Form.Label>
                        <Form.Control
                          required
                          value={values.password}
                          onChange={handleChange}
                          name="password"
                          type="password"
                          isInvalid={
                            !!errors.currentPassword && touched.currentPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.currentPassword}
                        </Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Contraseña nueva</Form.Label>
                        <Form.Control
                          required
                          value={values.newPassword}
                          onChange={handleChange}
                          name="newPassword"
                          type="password"
                          isInvalid={
                            !!errors.newPassword && touched.newPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Confirmar contraseña nueva</Form.Label>
                        <Form.Control
                          required
                          value={values.confirmPassword}
                          onChange={handleChange}
                          name="confirmPassword"
                          type="password"
                          isInvalid={
                            !!errors.confirmPassword && touched.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-4"
                      size="lg"
                      style={{
                        background: "linear-gradient(-135deg, #c850c0, #4158d0)",
                      }}
                    >
                      Cambiar Contraseña
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

export default CambiarContrasena;
