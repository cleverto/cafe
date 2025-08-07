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

const TrabajadorFamiliar = () => {
  const [lista, setlista] = useState([]);
  const inputReffocus = useRef();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      modulo();
    }
    // eslint-disable-next-line
  }, [id, lista]);

  useEffect(() => {
    get_lista();

    // eslint-disable-next-line
  }, []);

  const modulo = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(
      window.globales.url + "/trabajador/modulo_familiar",
      _datos
    )
      .then((res) => {
        if (res.data.rpta === "1") {
          setFieldValue("operacion", "1");
          setFieldValue("id_parentezco", res.data.items.id_parentezco);
          setFieldValue("familiar", res.data.items.familiar);
          setFieldValue("direccion", res.data.items.direccion);
          setFieldValue("celular", res.data.items.celular);

          console.log(res.data.items.id_parentezco);
        } else {
          setFieldValue("operacion", "0");
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const get_lista = async () => {
    let _datos = JSON.stringify({
      modulo: "parentezco",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlista(res.data.items);
    setFieldValue("id_parentezco", res.data.items[0].id);
  };
  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(
      window.globales.url + "/trabajador/guardar_familiar",
      _datos
    )
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
    id_parentezco: "",
    familiar: "",
    direccion: "",
    celular: "",
  };

  const validationSchema = Yup.object({
    id_parentezco: Yup.string().required("Requerido"),
    familiar: Yup.string().required("familiar"),
    direccion: Yup.string().required("direccion"),
    celular: Yup.string().required("celular"),
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
          <TrabajadorMain modulo="/trabajador_familiar" />
          <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />

          <div className="d-flex justify-content-between mt-4">
            <div>
              {" "}
              <h5>Familiar a notificar </h5>
              <p>
                Indique los datos de un familiar a quién notificar en una
                situación de emergencia
              </p>
            </div>
            <div>
              <Button type="submit" className="mt-1">
                Guardar
              </Button>
            </div>
          </div>
          <Card className="">
            <Card.Body>
              <Card.Body>
                <Row className="g-3">
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Parentezco</Form.Label>

                      <Form.Select
                        ref={inputReffocus}
                        value={values.id}
                        onChange={handleChange}
                        name="id_parentezco"
                        isValid={!!touched.id}
                        isInvalid={!!errors.id & touched.id}
                      >
                        {lista.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.descripcion}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Familiar</Form.Label>

                      <Form.Control
                        required
                        value={values.familiar}
                        onChange={handleChange}
                        name="familiar"
                        type="text"
                        maxLength="50"
                        isInvalid={!!errors.familiar & touched.familiar}
                        isValid={!!touched.familiar}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Dirección</Form.Label>

                      <Form.Control
                        required
                        value={values.direccion}
                        onChange={handleChange}
                        name="direccion"
                        type="text"
                        maxLength="50"
                        isInvalid={!!errors.direccion & touched.direccion}
                        isValid={!!touched.direccion}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Celular</Form.Label>

                      <Form.Control
                        required
                        value={values.celular}
                        onChange={handleChange}
                        name="celular"
                        type="text"
                        maxLength="50"
                        isInvalid={!!errors.celular & touched.direccion}
                        isValid={!!touched.celular}
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

export default TrabajadorFamiliar;
