import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Select from "react-select";
import Dashboard from "../dashboard/Dashboard.jsx";
import { abrirReporte } from "../global/utils.js";

const AlmacenFiltro = () => {
  const [listaProducto, setListaProducto] = useState([]);
  const [contenido, setContenido] = useState(""); // aquí mantenemos HTML
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");


  const initialValues = {
    desde: `${year}-${month}-01`,
    hasta: new Date().toISOString().slice(0, 10),
    idproducto: "",
  };

  useEffect(() => {
    get_lista_producto();

    // eslint-disable-next-line
  }, []);

  const get_lista_producto = async () => {
    try {
      let _datos = JSON.stringify({ modulo: "producto", campo: "producto" });

      const res = await Axios.post(
        `${window.globales.url}/producto/lista_stock`,
        _datos
      );
      // Transformamos los datos para que React-Select los entienda
      const opciones = res.data.items.map((data) => ({
        value: data.id_producto,
        label: data.producto,
      }));

      setListaProducto(opciones);

      // Si hay al menos un producto, selecciona el primero
      if (opciones.length > 0) {
        setFieldValue("idproducto", opciones[0].value);
      }
    } catch (error) {
      console.error("Error lista producto", error);
      setListaProducto([]);
    }
  };

  const buscar = async () => {
    try {
      const url =`${window.globales.url}/reporte/almacen?id=${values.idproducto}&desde=${values.desde}&hasta=${values.hasta}&h=0`;

      const res = await Axios.post(url);
      setContenido(res.data);
    } catch (error) {
      console.error("Error al buscar trazabilidad", error);
      setContenido("");
    }
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
            <h5>Reporte de almacén</h5>
          </div>
          <div></div>
        </div>
        <hr className="mb-4 mt-2" />
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row className="g-3 mb-4">
            <Col md="12" lg="12">
              <Select
                options={listaProducto}
                value={
                  listaProducto.find(
                    (opt) => opt.value === values.idproducto
                  ) || null
                }
                onChange={(option) => {
                  const opt = option || {};
                  setFieldValue("idproducto", opt.value);
                }}
                placeholder="Seleccione un producto..."
                isClearable
                formatOptionLabel={(option) => (
                  <div
                    key={`${option.value}-opt`}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span key={`${option.value}-label`}>{option.label}</span>
                    <span
                      key={`${option.value}-stock`}
                      style={{ fontWeight: "bold" }}
                    >
                      {option.stock}
                    </span>
                  </div>
                )}
              />
            </Col>
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
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="cont">
        <div style={{ overflowX: "auto" }}>
          <div dangerouslySetInnerHTML={{ __html: contenido }} />
        </div>
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default AlmacenFiltro;
