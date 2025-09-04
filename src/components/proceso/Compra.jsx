import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Container, Button, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import ModalD from "../global/ModalD";
import ModalOc from "../global/ModalOc";
import CreditoPagarRegistrar from "./CreditoPagarRegistrar";

import CompraGuardarRegistrar from "./CompraGuardarRegistrar";
import { useNavigate } from "react-router-dom";

const Compra = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showPagar, setShowPagar] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const [id_credito, setIdCredito] = useState("");
  const handleClose = () => setShow(false);
  const handleClosePagar = () => setShowPagar(false);
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

  // useEffect(() => {
  //   if (idmodulo) {
  //     console.log(idmodulo);
  //   }
  //   // eslint-disable-next-line
  // }, [idmodulo]);

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
        cell: (row) => (
          <Container className="p-0 pt-1 pb-2">
            <Row>
              <Col>
                <strong>{row.producto}</strong>
              </Col>
            </Row>
            <Row className="mt-1 g-1">
              <Col xs={12} md={4} lg={1}>
                <div className="p-1 bg-light text-secondary border rounded-2">
                  <div className="d-flex justify-content-between">
                    <span>Rdto</span>
                    <span>{row.rendimiento}</span>
                  </div>
                </div>
              </Col>
              {row.id_categoria === "1" && (
                <>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Sp</span>
                        <span>{row.segunda}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Bol</span>
                        <span>{row.bola}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2 ">
                      <div className="d-flex justify-content-between">
                        <span>Cas</span>
                        <span>{row.cascara}</span>
                      </div>
                    </div>
                  </Col>
                </>
              )}
              {row.id_categoria === "2" && (
                <>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Dst</span>
                        <span>{row.descarte}</span>
                      </div>
                    </div>
                  </Col>
                </>
              )}
              {row.id_categoria === "3" && (
                <>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Pll</span>
                        <span>{row.pasilla}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>N/M</span>
                        <span>{row.negro}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>BM</span>
                        <span>{row.ripio}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Imp</span>
                        <span>{row.impureza}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Def.</span>
                        <span>{row.defectos}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={1}>
                    <div className="p-1 bg-light text-secondary border rounded-2">
                      <div className="d-flex justify-content-between">
                        <span>Pt</span>
                        <span>{row.taza}</span>
                      </div>
                    </div>
                  </Col>
                </>
              )}
              <Col xs={12} md={4} lg={1}>
                <div className="p-1 bg-light text-secondary border rounded-2 ">
                  <div className="d-flex justify-content-between">
                    <span>Hum</span>
                    <span>{row.humedad}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ),
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
        <div className="pt-4">
          <h5>Compras</h5>
        </div>

        <div className="pt-3 mb-3">
          <Button
            className=" "
            variant="outline-primary"
            title="Nuevo"
            onClick={() => {
              navigate("/proceso/compra");
              window.location.reload();
            }}
          >
            <i className="bi bi-file-earmark-plus"></i>
          </Button>
          <Button
            className="  mx-1"
            variant="outline-primary"
            title="Buscar"
            onClick={() => navigate("/proceso/compra/buscar")}
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
          <Col md="12" lg="12">
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
              formatOptionLabel={(option) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{option.label}</span>
                  <span style={{ fontWeight: "bold" }}>{option.stock}</span>
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
              <Form.Label>Muestra</Form.Label>
              <Form.Control
                required
                className="no-spinner"
                value={props.values.muestra}
                onChange={props.handleChange}
                onWheel={(e) => e.currentTarget.blur()}
                name="muestra"
                type="number"
                inputMode="numeric"
                maxLength="3"
                isInvalid={
                  !!props.errors.muestra &&
                  props.touched.muestra &&
                  props.values.muestra?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.muestra}
              </Form.Control.Feedback>
            </Form.Group>
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
          {props.values.id_categoria === "2" && (
            <Col md="2" lg="2">
              <Form.Group>
                <Form.Label>Dst</Form.Label>
                <Form.Control
                  required
                  className="no-spinner"
                  value={props.values.descarte}
                  onChange={props.handleChange}
                  onWheel={(e) => e.currentTarget.blur()}
                  name="descarte"
                  type="number"
                  inputMode="numeric"
                  maxLength="3"
                  isInvalid={
                    !!props.errors.descarte &&
                    props.touched.descarte &&
                    props.values.descarte?.length === 0
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {props.errors.descarte}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          {props.values.id_categoria === "1" && (
            <>
              <Col md="2" lg="2">
                <Form.Group>
                  <Form.Label>Sp</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.segunda}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="segunda"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.segunda &&
                      props.touched.segunda &&
                      props.values.segunda?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.segunda}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="2">
                <Form.Group>
                  <Form.Label>Bol</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.bola}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="bola"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.bola &&
                      props.touched.bola &&
                      props.values.bola?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.bola}
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
            </>
          )}
          {props.values.id_categoria === "3" && (
            <>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>Pll</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.pasilla}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="pasilla"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.pasilla &&
                      props.touched.pasilla &&
                      props.values.pasilla?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.pasilla}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>N/M</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.negro}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="negro"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.negro &&
                      props.touched.negro &&
                      props.values.negro?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.negro}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>BM</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.ripio}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="ripio"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.ripio &&
                      props.touched.ripio &&
                      props.values.ripio?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.ripio}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>Imp</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.impureza}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="impureza"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.impureza &&
                      props.touched.impureza &&
                      props.values.impureza?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.impureza}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>Def</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.defectos}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="defectos"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.defectos &&
                      props.touched.defectos &&
                      props.values.defectos?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.defectos}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="2" lg="1">
                <Form.Group>
                  <Form.Label>Pt</Form.Label>
                  <Form.Control
                    required
                    className="no-spinner"
                    value={props.values.taza}
                    onChange={props.handleChange}
                    onWheel={(e) => e.currentTarget.blur()}
                    name="taza"
                    type="number"
                    inputMode="numeric"
                    maxLength="3"
                    isInvalid={
                      !!props.errors.taza &&
                      props.touched.taza &&
                      props.values.taza?.length === 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.taza}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          )}
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
        </Row>
        <Row className="g-3 mt-1">
          <Col md="2" lg="2">
            <Form.Group>
              <Form.Label>Cant Kg</Form.Label>
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

      <div className="d-flex justify-content-end mt-4">
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
      </div>

      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="lg"
        title="Guardar compra"
        formId="formIdModulo"
        aceptarTexto={idmodulo ? "Modificar" : "Guardar"}
        cancelarTexto="Cancelar"
      >
        <CompraGuardarRegistrar
          formId="formIdModulo"
          idmodulo={idmodulo}
          handleClose={handleClose}
          limpiarRowdata={props.limpiarRowdata}
          showPagar={(e) => setShowPagar(!showPagar)}
          id_credito={(e) => setIdCredito(e)}
          total={props.total}
        />
      </ModalD>
      <ModalOc
        componente={
          <CreditoPagarRegistrar id_credito={id_credito} modulo="compra" />
        }
        title="Realizar el pago"
        posicion="end"
        izquierda=""
        show={showPagar}
        handleClose={() => setShowPagar(false)}
      />
    </Container>
  );
};

export default Compra;
