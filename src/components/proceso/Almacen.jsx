import { useEffect, useState } from "react";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import ModalD from "../global/ModalD";

import AlmacenGuardarRegistrar from "./AlmacenGuardarRegistrar";
import { useNavigate } from "react-router-dom";

const Almacen = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");

    setIdmodulo(idParam);
  }, []);

  useEffect(() => {
    get_columns();
    // eslint-disable-next-line
  }, []);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id_detalle,
        sortable: true,
        reorder: true,
        omit: true,
      },
      {
        id: 1,
        name: "Id_producto",
        selector: (row) => row.id_producto,
        sortable: true,
        reorder: true,
        omit: true,
      },
      {
        id: 2,
        name: "Producto",
        selector: (row) => row.producto,
        sortable: true,
        grow: 3,
        wrap: true,
      },
      {
        id: 3,
        name: "Cant",
        selector: (row) => row.cantidad,
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 4,
        name: "Precio",
        selector: (row) => row.precio,
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 5,
        name: "Total",
        selector: (row) => row.total,
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
            <Button
              variant="outline-light"
              onClick={(e) => {
                props.eliminar(e, row.id_detalle);
              }}
            >
              <i class="bi bi-archive text-danger"></i>
            </Button>
          </>
        ),
      },
    ]);
  };

  return (
    <Container className="mb-4 " style={{ paddingBottom: "80px" }}>
      <div className="d-flex justify-content-between">
        <div className="">
          <h3 className="fw-bold mb-1">Nota de Almacén</h3>
          <small className="text-secondary">
            Registrar notas de ingreso o salida de almacén
          </small>
        </div>

        <div className="pt-3 mb-3">
          <Button
            className=" "
            variant="outline-primary"
            title="Nuevo"
            onClick={() => {
              navigate("/proceso/almacen");
              window.location.reload();
            }}
          >
            <i className="bi bi-file-earmark-plus"></i>
          </Button>
          <Button
            className="  mx-1"
            variant="outline-primary"
            title="Buscar"
            onClick={() => navigate("/proceso/almacen/buscar")}
          >
            <i className="bi bi-search"></i>
          </Button>
          <Button
            className=""
            variant={idmodulo ? "danger" : "primary"}
            onClick={(e) => setShow(!show)}
          >
            <i className="bi bi-floppy me-2"></i>
            {idmodulo ? "Modificar" : "Guardar"}
          </Button>
        </div>
      </div>
      <hr className="mt-0 mb-4" />
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3">
          <Col md="6" lg="6">
            <Form.Label>Producto</Form.Label>
            <Select
              options={props.listaProducto}
              value={
                props.listaProducto.find(
                  (opt) => opt.value === props.values.id_producto
                ) || null
              }
              onChange={(option) => {
                props.setFieldValue("id_producto", option ? option.value : "");
                props.setFieldValue("producto", option ? option.label : "");
                props.setFieldValue(
                  "id_categoria",
                  option ? option.id_categoria : ""
                );
              }}
              placeholder="Seleccione un producto..."
              isClearable
              className={
                props.errors.id_producto && props.touched.id_producto
                  ? "is-invalid"
                  : props.touched.id_producto
                    ? "is-valid"
                    : ""
              }
            />

            {props.errors.id_producto && props.touched.id_producto && (
              <div className="invalid-feedback d-block">
                {props.errors.id_producto}
              </div>
            )}
          </Col>



          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Cant</Form.Label>
              <Form.Control
                required
                value={props.values.cantidad}
                onChange={(e) => {
                  let value = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                    props.setFieldValue("cantidad", value);
                    props.setFieldValue(
                      "total",
                      (value * props.values.precio).toFixed(2)
                    );
                  }
                }}
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
                onChange={(e) => {
                  let value = e.target.value;
                  if (/^\d*\.?\d{0,3}$/.test(value)) {
                    props.setFieldValue("precio", value);
                    props.setFieldValue(
                      "total",
                      (props.values.cantidad * value).toFixed(2)
                    );
                  }
                }}
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
                    props.setFieldValue("cantidad", value);
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
            <div class="d-grid">
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
        />
      </Card>

      {/* <div className="d-flex justify-content-end mt-4">
        <Card
          className="shadow-sm border-0"
          style={{ minWidth: "280px", borderRadius: "12px" }}
        >
          <Card.Body className="text-end">
            <h6 className="text-muted mb-1">Total</h6>
            <h3 className="fw-bold text-success">
              {" "}
              S/ {Number(props.total).toFixed(2)}
            </h3>
          </Card.Body>
        </Card>
      </div> */}

      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="lg"
        title="Guardar nota de almacen"
        formId="formIdModulo"
        aceptarTexto={idmodulo ? "Modificar" : "Guardar"}
        cancelarTexto="Cancelar"
      >
        <AlmacenGuardarRegistrar
          formId="formIdModulo"
          idmodulo={idmodulo}
          handleClose={handleClose}
          limpiarRowdata={props.limpiarRowdata}
          total={props.total}
        />
      </ModalD>
    </Container>
  );
};

export default Almacen;
