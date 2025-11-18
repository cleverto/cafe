import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Select from "react-select";
import Dashboard from "../dashboard/Dashboard.jsx";

const TrazabilidadFiltro = () => {
  const [listaProducto, setListaProducto] = useState([]);
  const [contenido, setContenido] = useState(""); // aquí mantenemos HTML

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  const initialValues = {
    desde: `${year}-${month}-01`,
    hasta: new Date().toISOString().slice(0, 10),
    filtro: "consolidado",
     idproducto: "",
  };

  useEffect(() => {
    get_lista_producto();
    // eslint-disable-next-line
  }, []);

  const get_lista_producto = async () => {
    try {
      const _datos = JSON.stringify({ modulo: "producto", campo: "producto" });
      const res = await Axios.post(
        `${window.globales.url}/producto/lista_stock`,
        _datos
      );

      const opciones = [
        { value: "TODOS", label: "TODOS", stock: 0 },
        ...res.data.items.map((data) => ({
          value: data.id_producto,
          label: data.producto,
          stock: data.stock || 0,
        })),
      ];

      setListaProducto(opciones);

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
      const isDetallado = values.filtro === "detallado";

      const url =
        `${window.globales.url}/reporte/` +
        `${isDetallado ? "trazabilidad?" : "trazabilidad_consolidado?"}` +
         `producto=${values.idproducto}` +
        `&desde=${values.desde}` +
        `&hasta=${values.hasta}` +
        `&h=0`;

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
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: () => {
        buscar();
      },
    });

  const componente = (
    <>
      <Container className="mb-4 mt-3" style={{ paddingBottom: "0px" }}>
        <div className="d-flex justify-content-between">
          <h5>Reporte de trazabilidad</h5>
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
                onChange={(option) =>
                  setFieldValue("idproducto", option?.value || "")
                }
                placeholder="Seleccione un producto..."
                isClearable
                formatOptionLabel={(option) => (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{option.label}</span>
                    <span style={{ fontWeight: "bold" }}>{option.stock}</span>
                  </div>
                )}
              />
            </Col>

            <Col xs="12" md="2" lg="2">
              <Form.Group className="m-0">
                <Form.Label>Desde</Form.Label>
                <Form.Control
                  value={values.desde}
                  onChange={handleChange}
                  name="desde"
                  type="date"
                  isInvalid={!!errors.desde && touched.desde}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.desde}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.hasta && touched.hasta}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.hasta}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs="12" md="2" lg="2">
              <div className="d-flex">
                <div className="mt-2">
                  <Button
                    className="mt-4"
                    variant="primary"
                    type="submit"
                    value="consolidado"
                    onClick={(e) => setFieldValue("filtro", "consolidado")}
                  >
                    Consolidado
                  </Button>
                </div>
                <div className="mt-2 mx-2">
                  <Button
                    className="mt-4"
                    variant="primary"
                    type="submit"
                    value="detallado"
                    onClick={(e) => setFieldValue("filtro", "detallado")}
                  >
                    Detallado
                  </Button>
                </div>
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

  return <Dashboard componente={componente} />;
};

export default TrazabilidadFiltro;
