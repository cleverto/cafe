import { Card, Col, Container, Form, Row } from "react-bootstrap";
import DocenterMain from "./DocenteMain";
import Dashboard from "../dashboard/Dashboard";
import DocenteCabecera from "./DocenteCabecera";

const DocenteAdjuntar = () => {
  const componente = (
    <>
      <Container className="mt-4">
        <DocenteCabecera />
        <DocenterMain modulo="/docente_adjuntar" />
        <hr className="mt-1 " />
        <div style={{ marginTop: "30px" }}></div>
        <Card>
          <Card.Body className="">
            <Row className="m-0">
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Adjuntar DNI de hijos
                </Form.Label>
                <Col sm="8" lg="8">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>
            </Row>
            <Row className="m-0">
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Adjuntar Copia de partida de matrimonio civil
                </Form.Label>
                <Col sm="8" lg="8">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>
            </Row>
            <Row className="m-0">
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Adjuntar DNI de su esposa(o)
                </Form.Label>
                <Col sm="8" lg="8">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>
            </Row>
            <Row className="m-0">
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Adjuntar copia de DNI de su conviviente
                </Form.Label>
                <Col sm="8" lg="8">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>
            </Row>
            <Row className="m-0">
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="4">
                  Adjuntar copia de DNI
                </Form.Label>
                <Col sm="8" lg="8">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>
            </Row>
          </Card.Body>
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

export default DocenteAdjuntar;
