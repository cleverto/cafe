import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import TrabajadorMain from "./TrabajadorMain";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TrabajadorPension = () => {
  const [listaPension, setlistaPension] = useState([]);
  const inputReffocus = useRef();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      modulo();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    get_lista_pension();

    inputReffocus.current.focus();
    // eslint-disable-next-line
  }, []);

  const modulo = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/trabajador/modulo_pension", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          setFieldValue("operacion", "1");
          setFieldValue("id_pension", res.data.items.id_pension);
          setFieldValue("afiliado", res.data.items.afiliado);
          setFieldValue("cuspp", res.data.items.cuspp);
        } else {
          setFieldValue("operacion", "0");
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const get_lista_pension = async () => {
    let _datos = JSON.stringify({
      modulo: "pension",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaPension(res.data.items);
    setFieldValue("id_pension", res.data.items[0].id_pension);
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(
      window.globales.url + "/trabajador/guardar_pension",
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
    id_pension: "",
    afiliado: new Date().toISOString().split("T")[0],
    cuspp: "",
  };

  const validationSchema = Yup.object({
    id_pension: Yup.string().required("Requerido"),
    afiliado: Yup.date()
      .required("La fecha de afiliación es obligatoria")
      .typeError("Debe ser una fecha válida")
      .nullable()
      .max(new Date(), "La fecha no puede ser hoy"),
    cuspp: Yup.string().required("Requerido"),
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
          <TrabajadorMain modulo="/trabajador_pension" />
          <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />
          <div className="d-flex justify-content-between mt-4">
            <div>
              {" "}
              <h5>Sistema de de pensiones </h5>
              <p>Elección del sistema pensionario SNP / AFP</p>
            </div>
            <div>
              <Button className="mt-4 mb-4" variant="primary" type="submit">
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
                      <Form.Label>Sistema de pensión</Form.Label>

                      <Form.Select
                        ref={inputReffocus}
                        value={values.id_pension}
                        onChange={handleChange}
                        name="id_pension"
                        isValid={!!touched.id_pension}
                        isInvalid={!!errors.id_pension & touched.id_pension}
                      >
                        {listaPension.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.descripcion}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.id_pension}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Fecha afiliado</Form.Label>

                      <Form.Control
                        required
                        value={values.afiliado}
                        onChange={handleChange}
                        name="afiliado"
                        type="date"
                        isInvalid={!!errors.afiliado & touched.afiliado}
                        isValid={!!touched.afiliado}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.afiliado}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6" lg="6">
                    <Form.Group className="mb-2 m-0">
                      <Form.Label>Nro CUSPP</Form.Label>

                      <Form.Control
                        required
                        value={values.cuspp}
                        onChange={handleChange}
                        name="cuspp"
                        type="text"
                        maxLength="35"
                        isInvalid={!!errors.cuspp & touched.cuspp}
                        isValid={!!touched.cuspp}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.cuspp}
                      </Form.Control.Feedback>
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

export default TrabajadorPension;
