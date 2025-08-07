import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card,
  InputGroup,
  Breadcrumb,
  FloatingLabel,
  Spinner,
  Nav,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import TrabajadorMain from "./TrabajadorMain";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TrabajadorCuenta = () => {
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
    await Axios.post(window.globales.url + "/trabajador/modulo_cuenta", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          setFieldValue("operacion", "1");
          setFieldValue("cuenta", res.data.items.cuenta);
          setFieldValue("cci", res.data.items.cci);
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

    await Axios.post(window.globales.url + "/trabajador/guardar_cuenta", _datos)
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
  const initialValues = {
    operacion: "0",
    idmodulo: id ? id : "",
    cuenta: "",
    cci: "",
  };

  const validationSchema = Yup.object({
    cuenta: Yup.string().required("Requerido"),
    cci: Yup.string().required("Requerido"),
  });
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
          <TrabajadorMain modulo="/trabajador_cuenta" />
          <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />

          <div className="d-flex justify-content-between mt-4">
            <div>
              {" "}
              <h5>Cuenta de ahorros </h5>
              <p>
                Indique los datos de la cuenta de ahorros del Banco de la Nación
              </p>
            </div>
            <div>
              <Button type="submit" className="mt-2">
                Guardar
              </Button>
            </div>
          </div>
          <Card className="">
            <Card.Body>
              <Card.Body>
                <Row className="">
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Nro de Cuenta</Form.Label>

                      <Form.Control
                        ref={inputReffocus}
                        required
                        value={values.cuenta}
                        onChange={handleChange}
                        name="cuenta"
                        type="text"
                        maxLength="50"
                        isInvalid={!!errors.cuenta & touched.cuenta}
                        isValid={!!touched.cuenta}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Nro. CCI</Form.Label>

                      <Form.Control
                        required
                        value={values.cci}
                        onChange={handleChange}
                        name="cci"
                        type="text"
                        maxLength="50"
                        isInvalid={!!errors.cci & touched.cci}
                        isValid={!!touched.cci}
                      />
                    </Form.Group>
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

export default TrabajadorCuenta;
