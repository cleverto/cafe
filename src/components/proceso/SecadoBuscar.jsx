import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Dropdown,
  Badge,
} from "react-bootstrap";

import { useFormik } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import DataTable from "react-data-table-component";
import Dashboard from "../dashboard/Dashboard";
import { useNavigate } from "react-router-dom";


const SecadoBuscar = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowData] = useState([]);



  useEffect(() => {
    get_columns();
    if (values) {
      buscar(values);
    }

    // eslint-disable-next-line
  }, []);

  const eliminar = async (e, id) => {
    console.log(id);
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
        Axios.post(window.globales.url + "/secado/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowData((prevData) =>
                prevData.filter((row) => row.id_secado !== id)
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

  const get_columns = () => {
    setColumns([
      {
        name: "Id",
        selector: (row) => row.id_secado,
        sortable: true,
        reorder: true,
        omit: true,
      },
      {
        name: "Oper.",
        selector: (row) => row.operacion,
        sortable: true,
        reorder: true,
        center: "true",
        width: "5rem",
      },
      {
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        center: "true",
        width: "7rem",
      },
      {
        name: "Nro Comprobante",
        selector: (row) => row.nro_comprobante,
        sortable: true,
        width: "10rem",
      },
      {
        name: "Referencia",
        selector: (row) => row.referencia, // se mantiene para ordenamiento
        cell: (row) =>
          row.referencia ? (
            <div
              title={row.referencia} // muestra el texto completo al pasar el mouse
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "6.5rem", // ligeramente menor que el width
              }}
            >
              {row.referencia}
            </div>
          ) : null,
        sortable: true,
        wrap: true, // permite contenido multilinea
      },
      {
        name: "Proveedor",
        selector: (row) => row.proveedores,
        cell: (row) =>
          row.proveedores ? (
            <div
              title={row.proveedores}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,  // 🔑 solo una línea visible
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: 0,
                whiteSpace: "normal", // necesario con line-clamp
                flex: "1 1 0",        // evita que la celda crezca por el contenido
              }}
            >
              {row.proveedores}
            </div>
          ) : null,
        sortable: true,
        wrap: true,
        grow: 2, // hace la columna un poco más ancha proporcionalmente
        maxWidth: "400px", // 👈 limita el ancho máximo de la columna
      },
      {
        name: "Total",
        selector: (row) => row.total, // mantiene el dato original para ordenamiento
        cell: (row) =>
          Number(row.total).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        sortable: true,
        width: "6rem",
        right: "true",
      },
      {
        name: " ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <>
            <Dropdown className="hide-split-after " >
              <Dropdown.Toggle
                className="rounded-circle border-0"
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
                    navigate("/proceso/secado?id=" + row.id_secado)
                  }
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(e, row.id_secado)}>
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={(e) =>
                  navigate("/proceso/secado/retorno?id=" + row.id_secado)
                }>
                  <i class="bi bi-arrow-left-circle-fill me-2"></i>Retorno
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

    await Axios.post(window.globales.url + "/secado/buscar", _datos)
      .then((res) => {
        setRowData(res.data.items);
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
      <Container className="mb-4 mt-3 responsive-container" style={{ paddingBottom: "0px" }}>
        <div className="d-flex justify-content-between">
          <div className="">
            <h5>Buscar secado</h5>
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
              rows: {
                style: {
                  minHeight: "32px",
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

export default SecadoBuscar;
