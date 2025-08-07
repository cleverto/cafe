import React, { useState } from "react";
import {
  Form,
  Row,
  Card,
  Col,
  Button,
  Container,
  InputGroup,
  Spinner,
  FloatingLabel,
  Breadcrumb,
} from "react-bootstrap";
import Dashboard from "../dashboard/Dashboard";
const TrabajadorBuscar = () => {
  const [values, setValues] = useState([]);
  const [swdni, setSwdni] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  const buscar = (e) => {
    console.log("hola buscar");
  };
  const componente = (
    <>
      <Container className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="#/">Regresar</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="m-0">
          <Form.Group as={Col} md="12" className="mb-2 not-spin p-0">
            <InputGroup>
              <FloatingLabel label="Buscar al trabajador">
                <Form.Control
                  required
                  value={values.numerodocumento}
                  onChange={handleInputChange}
                  name="numerodocumento"
                  type="number"
                  placeholder="DNI"
                  maxlength="8"
                  style={{ textTransform: "uppercase" }}
                />
              </FloatingLabel>
              <Button
                variant="secondary"
                id="btn-buscar-dni"
                onClick={() => buscar()}
              >
                {swdni ? (
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
            </InputGroup>
          </Form.Group>
          <Card>
            <Card.Body>
              <div class="d-flex justify-content-between">
                <div>
                  <h6>ELVE CLEVER TORRES ALTAMIRANO</h6>
                  <p>Manco Capac 699 - Jaén</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline-primary" className="mx-1">
                    Registrar Ficha CAS
                  </Button>
                  <Button variant="outline-primary" className="mx-1">
                    Registrar Ficha Docente
                  </Button>
                  <Button variant="outline-primary" className="mx-1">
                    Registrar Ficha Rpuesto Judicial
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default TrabajadorBuscar;
