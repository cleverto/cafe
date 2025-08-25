import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

import { useFormik } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import DataTable from "react-data-table-component";
import Dashboard from "../dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

const CompraBuscar = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    get_columns();

    // eslint-disable-next-line
  }, []);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id_compra,
        sortable: true,
        reorder: true,
        omit: true,
      },
      {
        id: 1,
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        omit: true,
        center: true,
      },
      {
        id: 2,
        name: "Nro",
        selector: (row) => row.nro_comprobante,
        sortable: true,
        width: "6rem",
      },
      {
        id: 3,
        name: "Referencia",
        selector: (row) => row.referencia,
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 4,
        name: "Proveedor",
        selector: (row) => row.proveedor,
        sortable: true,
      },
      {
        id: 5,
        name: "Total",
        selector: (row) => row.total, // mantiene el dato original para ordenamiento
        cell: (row) =>
          Number(row.total).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 6,
        name: " ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <>
            <Dropdown className="hide-split-after ">
              <Dropdown.Toggle
                className="rounded-circle"
                size="sm"
                variant="outline-secondary"
              >
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) =>
                    navigate("/proceso/compra?id=" + row.id_compra)
                  }
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item
                // onClick={(e) => eliminar(e, row.id)}
                >
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ),
      },
    ]);
  };

  const initialValues = {
    desde: new Date().toISOString().slice(0, 10),
    hasta: new Date().toISOString().slice(0, 10),
  };

  const buscar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/compra/buscar", _datos)
      .then((res) => {
        setRowData(res.data.items);
        setFilterData(res.data.items);
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
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
      <Container className="mb-4 " style={{ paddingBottom: "80px" }}>
        <div className="d-flex justify-content-between">
          <div className="">
            <h5>Buscar compras</h5>
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
        <Row className="g-3 mb-2">
          <Col lg="12">
            <Form.Group>
              <Form.Control
                required
                value={values.proveedor}
                onChange={(e) => {
                  handleChange(e); // mantiene Formik

                  const filtro = e.target.value.toLowerCase();

                  // 👇 aquí usamos allData como respaldo original
                  const filtrados = filterData.filter((item) =>
                    item.proveedor.toLowerCase().includes(filtro)
                  );

                  setRowData(filtrados); // actualiza la tabla
                }}
                name="proveedor"
                type="text"
                maxLength="50"
                placeholder="Buscar por el proveedor"
                autoComplete="off"
              />
            </Form.Group>
          </Col>
        </Row>
        <Card>
          <DataTable
            columns={columns}
            data={rowdata}
            noDataComponent={<span>No hay información por mostrar</span>}
            persistTableHead
            responsive
          />
        </Card>
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default CompraBuscar;
