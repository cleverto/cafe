import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";

import { useNavigate } from "react-router-dom";

const ProcesoRetorno = (props) => {
  const navigate = useNavigate();
  const [idmodulo, setIdmodulo] = useState("");
  const [columns, setColumns] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");


    setIdmodulo(idParam);
  }, []);

  useEffect(() => {
    get_columns();
    // eslint-disable-next-line
  }, [props.rowdata]);

  const get_columns = () => {
    setColumns([
      {
        name: "Id",
        selector: (row) => row.id_detalle,
        omit: true,
      },
      {
        name: "Id_producto",
        selector: (row) => row.id_producto,
        omit: true,
      },
      {
        name: "Producto",
        selector: (row) => row.producto,
        sortable: true,
        wrap: true,
      },

      // === RENDIMIENTO ===
      {
        name: "Rdto",
        selector: (row) => row.rendimiento,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          Number(row.rendimiento || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === CÁSCARA ===
      {
        name: "Cascara",
        selector: (row) => row.cascara,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          Number(row.cascara || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === HUMEDAD ===
      {
        name: "Hum",
        selector: (row) => row.humedad,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          Number(row.humedad || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === CANTIDAD ===
      {
        name: "Cant",
        selector: (row) => row.cantidad,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          Number(row.cantidad || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === PRECIO ===
      {
        name: "Precio",
        selector: (row) => row.precio,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          Number(row.precio || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === TOTAL ===
      {
        name: "Total",
        selector: (row) => row.total,
        sortable: true,
        width: "8rem",
        cell: (row) =>
          Number(row.total || 0).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },

      // === BOTÓN ELIMINAR ===
      {
        name: " ",
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <Button
            variant="outline-light"
            onClick={(e) => {
              props.eliminar(e, row.id_detalle);
            }}
          >
            <i className="bi bi-archive text-danger"></i>
          </Button>
        ),
      },
    ]);
  };


  return (
    <Container className="mb-4 " style={{ paddingBottom: "80px" }}>
      <div className="d-flex justify-content-between mt-3">
        <div className="pt-2">
          <h5>Retorno de procesar</h5>
        </div>
        <div class="d-flex">
          <Button variant="light" onClick={() => window.history.back()}>
            <i class="bi bi-backspace"></i>
          </Button>

          <div className="">
            <Form.Group className="m-0">
              <Form.Control
                value={fecha}
                onChange={(e) => {                  
                  setFecha(e.target.value);
                }}
                name="fecha"
                type="date"
              />
            </Form.Group>
          </div>
          <div className="">
            <Button
              className="mx-2"
              variant="primary"
              onClick={(e) => props.guardar_all(fecha)}
            >
              <i className="bi bi-floppy me-2"></i>
              Guardar
            </Button>
          </div>
        </div>
      </div>
      <hr className="mt-2 mb-4" />

      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3">
          <Col md="12" lg="12">
            <Select
              options={props.listaProducto}
              value={
                props.listaProducto.find(
                  (opt) => opt.value === props.values.id_producto
                ) || null
              }
              onChange={(option) => {
                const opt = option || {};
                props.setFieldValue("id_producto", opt.value ?? "");
                props.setFieldValue("producto", opt.label ?? "");
                props.setFieldValue("id_categoria", opt.id_categoria ?? "");
                props.setFieldValue("cfg_tara", opt.tara ?? "");
                props.setFieldValue("cfg_qq", opt.qq ?? "");
              }}
              placeholder="Seleccione un producto..."
              isClearable
              formatOptionLabel={(option) => (
                <div key={`${option.value}-opt`} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span key={`${option.value}-label`}>{option.label}</span>
                  <span key={`${option.value}-stock`} style={{ fontWeight: "bold" }}>{option.stock}</span>
                </div>
              )}

              className={
                props.errors.id_producto && props.touched.id_producto
                  ? "is-invalid"
                  : props.touched.id_producto
                    ? "is-valid"
                    : ""
              }
            />
          </Col>

          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Rto</Form.Label>
              <Form.Control
                required
                className="no-spinner"
                value={props.values.rendimiento}
                onChange={props.handleChange}
                onWheel={(e) => e.currentTarget.blur()}
                name="rendimiento"
                type="number"
                inputMode="numeric"
                maxLength="3"
                isInvalid={
                  !!props.errors.rendimiento &&
                  props.touched.rendimiento &&
                  props.values.rendimiento?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.rendimiento}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>



          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Cas</Form.Label>
              <Form.Control
                required
                className="no-spinner"
                value={props.values.cascara}
                onChange={props.handleChange}
                onWheel={(e) => e.currentTarget.blur()}
                name="cascara"
                type="number"
                inputMode="numeric"
                maxLength="3"
                isInvalid={
                  !!props.errors.cascara &&
                  props.touched.cascara &&
                  props.values.cascara?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.cascara}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Hum</Form.Label>
              <Form.Control
                required
                className="no-spinner"
                value={props.values.humedad}
                onChange={props.handleChange}
                onWheel={(e) => e.currentTarget.blur()}
                name="humedad"
                type="number"
                inputMode="numeric"
                maxLength="3"
                isInvalid={
                  !!props.errors.humedad &&
                  props.touched.humedad &&
                  props.values.humedad?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.humedad}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>QQ neto</Form.Label>
              <Form.Control
                required
                value={props.values.cantidad}
                onChange={(e) => props.calcular_total_cantidad(e)}
                onWheel={(e) => e.currentTarget.blur()}
                name="cantidad"
                type="text"
                inputMode="decimal"
                maxLength="6"
                isInvalid={
                  !!props.errors.cantidad &&
                  props.touched.cantidad &&
                  props.values.cantidad?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.cantidad}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                required
                value={props.values.precio}
                onChange={(e) => props.calcular_total_precio(e)}
                onWheel={(e) => e.currentTarget.blur()}
                name="precio"
                type="text"
                inputMode="decimal"
                maxLength="6"
                isInvalid={
                  !!props.errors.precio &&
                  props.touched.precio &&
                  props.values.precio?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.precio}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Total</Form.Label>
              <Form.Control
                required
                value={props.values.total}
                onChange={(e) => {
                  let value = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                    props.setFieldValue("total", value);
                  }
                }}
                onWheel={(e) => e.currentTarget.blur()}
                name="total"
                type="text"
                inputMode="decimal"
                maxLength="7"
                readOnly
                isInvalid={
                  !!props.errors.total &&
                  props.touched.total &&
                  props.values.total?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.total}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4 mb-4">
          <Col md="12" lg="12">
            <div className="d-grid">
              <Button className="btn-block " variant="secondary" type="submit">
                <i className="bi bi-file-earmark-plus-fill me-2"></i>
                Añadir producto
              </Button>
            </div>
          </Col>
        </Row>
      </Form>


      <Card>
        <DataTable
          columns={columns}
          data={props.rowdata}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
          responsive
          dense
        />
      </Card>
    </Container>
  );
};

export default ProcesoRetorno;
