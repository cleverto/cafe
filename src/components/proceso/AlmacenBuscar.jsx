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
import ModalOc from "../global/ModalOc";
import CreditoPagarRegistrar from "./CreditoPagarRegistrar";

const AlmacenBuscar = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [idCredito, setIdCredito] = useState(false);
  const [showPagar, setShowPagar] = useState(false);

  useEffect(() => {
    get_columns();
    if (values) {
      buscar(values);
    }

    // eslint-disable-next-line
  }, []);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id_nota_almacen,
        sortable: true,
        reorder: true,
        omit: true,
      },
      {
        id: 1,
        name: "Operación",
        selector: (row) => row.operacion,
        sortable: true,
        reorder: true,
        center: true,
        width: "6rem",
      },
      {
        id: 2,
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        center: true,
        width: "8rem",
      },
      {
        id: 3,
        name: "Usuario",
        selector: (row) => row.usuario,
        sortable: true,
        reorder: true,
        center: true,
        width: "8rem",
      },

      {
        id: 4,
        name: "Nro",
        selector: (row) => row.nro_comprobante,
        sortable: true,
        width: "6rem",
      },
      {
        id: 5,
        name: "Motivo",
        selector: (row) => row.motivo,
        sortable: true,
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
                    navigate("/proceso/almacen?id=" + row.id_nota_almacen)
                  }
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(e, row.id_nota_almacen)}>
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ),
      },
    ]);
  };

  const eliminar = async (e, id) => {
    let _datos = JSON.stringify({ id: id });
    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(window.globales.url + "/almacen/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowData((prevData) =>
                prevData.filter((row) => row.id_nota_almacen !== id)
              );
            }
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const initialValues = {
    desde: new Date().toISOString().slice(0, 10),
    hasta: new Date().toISOString().slice(0, 10),
  };

  const buscar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/almacen/buscar", _datos)
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
      <Container className="mb-4 mt-3 " style={{ paddingBottom: "0px" }}>
        <div className="d-flex justify-content-between">
          <div className="">
            <h3 className="fw-bold mb-1">Buscar notas de almacén</h3>
          </div>

          <div>
            <Button variant="light" onClick={() => window.history.back()}>
              <i class="bi bi-backspace"></i> Regresar
            </Button>
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
        <Card>
          <DataTable
            columns={columns}
            data={rowdata}
            noDataComponent={<span>No hay información por mostrar</span>}
            persistTableHead
            responsive
            customStyles={{
              table: {
                style: {
                  minHeight: "200px",

                  overflow: "auto",
                },
              },
            }}
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

export default AlmacenBuscar;
