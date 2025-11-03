import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Spinner,
  InputGroup,
  Card,
} from "react-bootstrap";
import DataTable from "react-data-table-component";

const VentaGuardarForm = (props) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (props.rowData) {
      get_columns();
    }
  }, [props.rowDetalle]);

  const get_columns = () => {
    setColumns([
      {
        name: "Idm",
        selector: (row) => row.id_modulo,
        sortable: true,
        reorder: true,
        width: "6rem",
        omit: true,
      },
      {
        name: "Id",
        selector: (row) => row.id_detalle,
        sortable: true,
        reorder: true,
        width: "6rem",
        omit: true,
      },
      {
        name: "Id",
        selector: (row) => row.id_producto,
        sortable: true,
        reorder: true,
        width: "6rem",
        omit: true,
      },
      {
        name: "Modulo",
        selector: (row) => row.modulo,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        name: "Producto",
        selector: (row) => row.producto,
        sortable: true,
        reorder: true,
        wrap: true,
      },
      {
        name: "Cantidad",
        selector: (row) => row.cantidad,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        name: "PAnt.",
        selector: (row) => row.pa,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        name: "Precio",
        selector: (row) => row.precio,
        sortable: true,
        reorder: true,
        width: "6rem",
        cell: (row) => (
          <input
            type="number"
            step="0.01"
            min="0"
            value={row.precio || ""}
            onChange={(e) =>
              props.handlePrecioChange(row, parseFloat(e.target.value) || 0)
            }
            style={{
              width: "100%",
              textAlign: "right",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "2px 4px",
              fontSize: "0.9rem",
            }}
            className=" text-end no-spinner"
          />
        ),
      },
      {
        name: "Total",
        selector: (row) => row.total,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
    ]);
  };

  return (
    <Container className="mb-4 ">
      <Form
        noValidate
        id="formIdModulo"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3 mb-4">
          <Col md="12" lg="12">
            <div class="">
              <div
                style={{
                  backgroundColor: "#fff3cd", // amarillo suave
                  color: "#856404", // texto marrón oscuro
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textAlign: "right",
                  border: "2px solid #ffeeba",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div class="d-flex justify-content-between ">
                  <div></div>
                  <div>
                    QQ{" "}
                    <span className="ms-1">
                      {props.totalQQ.toLocaleString("es-PE")}
                    </span>
                  </div>

                  <div>
                    S/.{" "}
                    <span className="ms-1">
                      {props.total.toLocaleString("es-PE")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Fecha</Form.Label>

              <Form.Control
                value={props.values.fecha}
                onChange={props.handleChange}
                name="fecha"
                type="date"
                isInvalid={!!props.errors.fecha & props.touched.fecha}
                isValid={!!props.touched.fecha}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.fecha}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-3 mt-1">
          {/* Nro de referencia */}
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Nro de referencia</Form.Label>
              <Form.Control
                required
                value={props.values.referencia}
                onChange={(e) => {
                  const val = e.target.value;

                  if (/^\d*$/.test(val) && val.length <= 8) {
                    props.setFieldValue("referencia", val);
                  }
                }}
                onBlur={(e) => {
                  const val = props.values.referencia;
                  if (val) {
                    props.setFieldValue("referencia", val.padStart(8, "0"));
                  }
                }}
                name="referencia"
                type="text"
                maxLength="8"
                isInvalid={
                  !!props.errors.referencia &&
                  props.touched.referencia &&
                  props.values.referencia?.length === 0
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <span className="text-muted small  ">Datos del cliente</span>
        <Row className="g-3 mt-1 border-top border-bottom pb-2">
          <Col md="3" lg="3">
            <Form.Group>
              <Form.Label>Tipo Doc. Identidad</Form.Label>
              <Form.Select
                value={props.values.id_tipo_identidad}
                onChange={props.handleChange}
              >
                <option key="1" value="1">
                  DNI
                </option>
                <option key="6" value="6">
                  RUC
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="9" lg="9">
            <Form.Group>
              <Form.Label>Nro</Form.Label>
              <InputGroup>
                <Form.Control
                 
                  value={props.values.dni}
                  onChange={(e) => {
                    props.setFieldValue("proveedor", "");
                    props.handleChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      props.buscar_dni(props.values.dni);
                    }
                  }}
                  name="dni"
                  type="text"
                  placeholder="Buscar por nro"
                  maxLength={
                    props.values.id_tipo_identidad === "1"
                      ? 8
                      : props.values.id_tipo_identidad === "6"
                      ? 11
                      : ""
                  }
                />

                <Button
                  variant="secondary"
                  onClick={() => props.buscar_dni(props.values.dni)}
                >
                  {props.values.swdni ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="false"
                    />
                  ) : (
                    <i className="bi bi-search"></i>
                  )}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open(`#/administracion/proveedor`, "_blank")
                  }
                >
                  <i class="bi bi-plus-square"></i>
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className="m-0">
            <Col md="12" lg="12">
              <Form.Group className="mt-1">
                <Form.Control
                  readOnly
                  disabled
                  value={props.values.proveedor || ""}
                  name="proveedor"
                  type="text"
                  isInvalid={!!props.errors.proveedor && props.touched.proveedor}
                  isValid={!!props.touched.proveedor}
                />
              </Form.Group>
            </Col>
            <Col md="12" lg="12">
              <Form.Group className="mt-1">
                <Form.Control
                  readOnly
                  disabled
                  value={props.values.direccion || ""}
                  name="direccion"
                  type="text"
                  isInvalid={!!props.errors.direccion & props.touched.direccion}
                  isValid={!!props.touched.direccion}
                />
              </Form.Group>
            </Col>
          </Col>
        </Row>
      </Form>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={props.rowDetalle}
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
      </div>
    </Container>
  );
};

export default VentaGuardarForm;
