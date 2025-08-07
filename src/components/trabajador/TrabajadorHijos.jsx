import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import TrabajadorMain from "./TrabajadorMain";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const TrabajadorHijos = () => {
  const inputReffocus = useRef();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      modulo();
    }
    inputReffocus.current.focus();
    // eslint-disable-next-line
  }, [id]);

  const modulo = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/trabajador/modulo_hijos", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          setFieldValue("operacion", "1");
          setFieldValue("cantidad", res.data.items.cantidad);
          setFieldValue("discapacitado", res.data.items.discapacitado);
          setFieldValue("mayor", res.data.items.mayor);
        } else {
          setFieldValue("operacion", "0");
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/trabajador/guardar_hijos", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({ text: res.data.msg, icon: "info" });
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    cantidad: Yup.number()
      .typeError("Debe ingresar un número")
      .required("Este campo es obligatorio")
      .min(0, "Debe ser 0 o mayor"),

    discapacitado: Yup.number()
      .typeError("Debe ingresar un número")
      .required("Este campo es obligatorio")
      .min(0, "Debe ser 0 o mayor"),

    mayor: Yup.date()
      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      })
      .when("cantidad", {
        is: (val) => val > 0,
        then: (schema) => schema.required("La fecha es incorrecta"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const initialValues = {
    operacion: "0",
    idmodulo: id ? id : "",
    cantidad: "0",
    discapacitado: "0",
    mayor: "",
  };
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        guardar(values);
      },
    });
  const componente = (
    <>
      <Container className="mt-3">
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <TrabajadorMain modulo="/trabajador_hijos" />
          <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />
          <div className="d-flex justify-content-between mt-4">
            <div>
              {" "}
              <h5>Hijos menores </h5>
              <p>Consigne la cantidad de hijos de menores de edad</p>
            </div>
            <div>
              <Button className="mt-2" variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </div>

          <Card className="">
            <Card.Body>
              <Card.Body>
                <Row className="">
                  <Col md="6" lg="6">
                    <Form.Group as={Row} className="m-0 mb-2">
                      <Form.Label>Cantidad de hijos</Form.Label>

                      <Form.Control
                        required
                        ref={inputReffocus}
                        value={values.cantidad}
                        onChange={handleChange}
                        name="cantidad"
                        type="number"
                        maxLength="2"
                        isInvalid={!!errors.cantidad & touched.cantidad}
                        isValid={!!touched.cantidad}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.cantidad}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group as={Row} className="m-0 mb-2">
                      <Form.Label>Hijos con discap.</Form.Label>

                      <Form.Control
                        required
                        value={values.discapacitado}
                        onChange={handleChange}
                        name="discapacitado"
                        type="number"
                        maxLength="2"
                        isInvalid={
                          !!errors.discapacitado & touched.discapacitado
                        }
                        isValid={!!touched.discapacitado}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.discapacitado}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    {(values.cantidad > 0 || values.discapacitado > 0) && (
                      <Form.Group as={Row} className="mb-2 m-0">
                        <Form.Label>F. Nac. del mayor</Form.Label>

                        <Form.Control
                          required
                          value={values.mayor}
                          onChange={handleChange}
                          name="mayor"
                          type="date"
                          isInvalid={!!errors.mayor & touched.mayor}
                          isValid={!!touched.mayor}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.mayor}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default TrabajadorHijos;
