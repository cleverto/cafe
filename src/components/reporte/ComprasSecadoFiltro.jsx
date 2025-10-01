import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dashboard from "../dashboard/Dashboard.jsx";
import { abrirReporte } from "../global/utils.js";


const ComprasSecadoFiltro = () => {
  const initialValues = {
    desde: new Date().toISOString().slice(0, 10),
    hasta: new Date().toISOString().slice(0, 10),
  };

  const buscar = async () => {
    abrirReporte(
      `#/reporte/compras-secado?desde=${values.desde}&hasta=${values.hasta}`
    );
  };

  const validationSchema = Yup.object({
    desde: Yup.date()
      .required("Debe ingresar la fecha de inicio")
      .typeError("Fecha inválida"),

    hasta: Yup.date()
      .required("Debe ingresar la fecha final")
      .typeError("Fecha inválida")
      .min(
        Yup.ref("desde"),
        "La fecha final no puede ser menor que la fecha inicial"
      ),
  });

  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        buscar(values);
      },
    });

  const componente = (
    <>
      <Container className="mb-4 mt-3 " style={{ paddingBottom: "0px" }}>
        <div className="d-flex justify-content-between">
          <div className="">
            <h5>Compras Pendientes y Retorno de Secado</h5>
          </div>
          <div>
          </div>
        </div>
        <hr className="mb-4 mt-2" />
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row className="g-3 mb-4">
            <Col xs="12" md="2" lg="2">
              <Form.Group className="m-0">
                <Form.Label>Desde</Form.Label>
                <Form.Control
                  value={values.desde}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("hasta", e.target.value);
                  }}
                  name="desde"
                  type="date"
                  isInvalid={!!errors.desde & touched.desde}
                />
              </Form.Group>
            </Col>
            <Col xs="12" md="2" lg="2">
              <Form.Group className="m-0">
                <Form.Label>Hasta</Form.Label>
                <Form.Control
                  value={values.hasta}
                  onChange={handleChange}
                  name="hasta"
                  type="date"
                  isInvalid={!!errors.hasta & touched.hasta}
                />
              </Form.Group>
            </Col>
            <Col xs="12" md="2" lg="2">
              <div className="mt-2">
                <Button className="mt-4 " variant="primary" type="submit">
                  Bsucar
                </Button>
              </div>
            </Col>
          </Row>
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

export default ComprasSecadoFiltro;
