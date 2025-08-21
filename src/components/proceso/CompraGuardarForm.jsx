
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Card,
  InputGroup,
  Spinner,
} from "react-bootstrap";


const CompraGuardarForm = (props) => {

  const inputRef = useRef(null);


  return (
    <Container className="mb-4 " >
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3 mb-4">
          <Col md="12" lg="12">
            <div class="">

              <div
                style={{
                  backgroundColor: "#fff3cd", // amarillo suave
                  color: "#856404",           // texto marrón oscuro
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
                  <div >

                    <Form.Group>

                      <Form.Select
                        value={props.values.moneda}
                        onChange={props.handleChange}
                        name="moneda"
                        isValid={!!props.touched.moneda}
                      >
                        <option key="1" value="PEN">
                          PEN
                        </option>
                        <option key="2" value="USD">
                          DOLAR
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div></div>
                  <div>{props.values.totalCompra ? ` ${props.values.totalCompra}` : "S/. 100,000.00"}</div>
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
                  onClick={() => props.buscar_dni(props.values.dni)}
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
                placeholder="Nombre del proveedor"
                name="proveedor"
                type="text"
              />
            </Form.Group>
          </Col>
          <Col md="12" lg="12">

          </Col>
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Documento</Form.Label>
              <Form.Select
                value={props.values.moneda}
                onChange={props.handleChange}
                name="moneda"
                isValid={!!props.touched.moneda}
              >
                <option key="1" value="PEN">
                  Liquidación de compra
                </option>
                <option key="2" value="USD">
                  DOLAR
                </option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Nro de referencia */}
          <Col md="10" lg="10">
            <Form.Group>
              <Form.Label>Nro de referencia</Form.Label>
              <Form.Control
                required
                value={props.values.nroReferencia}
                onChange={props.handleChange}
                name="nroReferencia"
                type="text"
                isInvalid={
                  !!props.errors.nroReferencia &&
                  props.touched.nroReferencia &&
                  props.values.nroReferencia?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.nroReferencia}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Moneda */}

        </Row>

      </Form>

    </Container>
  );
};

export default CompraGuardarForm;
