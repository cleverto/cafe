import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";

const CompraGuardarForm = (props) => {
  const inputRef = useRef(null);

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
                  <div>
                    <Form.Group>
                      <Form.Select
                        value={props.values.id_moneda}
                        onChange={props.handleChange}
                        name="id_moneda"
                        isValid={!!props.touched.id_moneda}
                        onClick={(e) => {
                          const selected = e.target.selectedOptions[0];
                          props.setFieldValue(
                            "simbolo",
                            selected.getAttribute("data-simbolo")
                          );
                        }}
                      >
                        <option ey="PEN" value="PEN" data-simbolo="S/">
                          PEN
                        </option>
                        <option key="PEN" value="USD" data-simbolo="$">
                          DOLAR
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div></div>
                  <div>{`${props.values.simbolo} ${props.values.total}`}</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>DNI del proveedor</Form.Label>
              <InputGroup>
                <Form.Control
                  ref={inputRef}
                  value={props.values.dni}
                  onChange={props.handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      props.buscar_dni(props.values.dni);
                    }
                  }}
                  name="dni"
                  type="text"
                  placeholder="Buscar por DNI"
                  maxLength="8"
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
            <Form.Group className="mt-2">
              <Form.Control
                readOnly
                disabled
                value={props.values.proveedor || ""}
                name="proveedor"
                type="text"
                isInvalid={
                  !!props.errors.id_proveedor &
                  props.touched.id_tipo_comprobante
                }
                isValid={!!props.touched.id_proveedor}
              />
            </Form.Group>
          </Col>
          <Col md="12" lg="12"></Col>
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
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Comprobante</Form.Label>
              <Form.Select
                value={props.values.id_tipo_comprobante}
                onChange={props.handleChange}
                name="id_tipo_comprobante"
                isInvalid={
                  !!props.errors.id_tipo_comprobante &
                  props.touched.id_tipo_comprobante
                }
                isValid={!!props.touched.id_tipo_comprobante}
              >
                {props.listaTipoComprobante.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

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

          {/* Moneda */}
        </Row>
      </Form>
    </Container>
  );
};

export default CompraGuardarForm;
