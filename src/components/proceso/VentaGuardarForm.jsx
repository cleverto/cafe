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
  const inputRef = useRef(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (props.rowData) {
      get_columns();
    }
  }, [props.rowData]);

  const get_columns = () => {
    setColumns([
      {
        name: "Id",
        selector: (row) => row.id_producto,
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

                  {/* <div>
                    S/.{" "}
                    <span className="ms-1">
                      {props.totalActivos.toLocaleString("es-PE")}
                    </span>
                  </div> */}
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
          <Col md="3" lg="3">
            <Form.Group>
              <Form.Label>Tipo Doc. Identidad</Form.Label>
              <Form.Select
                value={props.values.id_tipo_identidad}
                onChange={props.handleChange}
                name="id_tipo_identidad"
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
                  ref={inputRef}
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
        </Row>
        <Row className="g-1">
          <Col md="12" lg="12">
            <Form.Group className="mt-2">
              <Form.Control
                readOnly
                disabled
                value={props.values.proveedor || ""}
                name="proveedor"
                type="text"
                isInvalid={
                  !!props.errors.id_proveedor & props.touched.id_proveedor
                }
                isValid={!!props.touched.id_proveedor}
              />
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group className="">
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
        </Row>
      </Form>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={props.rowData.filter((row) => row.activo === "1")}
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
