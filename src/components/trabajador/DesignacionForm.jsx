import React from "react";
import { Form, Row, Col, Button, Container, Card, Breadcrumb } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const Componente = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  listaTrabajador = [],
  listaCargo = [],
  listaDependencia = [],
}) => {
    const navigate = useNavigate();
    
  return (
    <Container className="mt-3 ">
      <Form noValidate onSubmit={handleSubmit} autoComplete="off">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate(-1)}>Regresar</Breadcrumb.Item>
          <Breadcrumb.Item active>Registrar</Breadcrumb.Item>
        </Breadcrumb>
        <Card.Title className="">
          Designación a personal
        </Card.Title>
        <Card className="m-0 p-3 mt-2">
          <Card.Body>
            <Row className="">
              <Col lg="12">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Trabajador
                  </Form.Label>
                  <Col lg="12">
                    <Form.Select
                      value={values.id_trabajador}
                      onChange={handleChange}
                      name="id_trabajador"
                      isValid={!!touched.id_trabajador}
                    >
                      {listaTrabajador.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Cargo
                  </Form.Label>
                  <Col lg="12">
                    <Form.Select
                      value={values.id_cargo}
                      onChange={handleChange}
                      name="id_cargo"
                      isValid={!!touched.id_cargo}
                    >
                      {listaCargo.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Dependencia
                  </Form.Label>
                  <Col lg="12">
                    <Form.Select
                      value={values.id_dependencia}
                      onChange={handleChange}
                      name="id_dependencia"
                      isValid={!!touched.id_dependencia}
                    >
                      {listaDependencia.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Inicio
                  </Form.Label>
                  <Col lg="12">
                    <Form.Control
                      value={values.inicio}
                      onChange={handleChange}
                      name="inicio"
                      type="date"
                      isInvalid={!!errors.inicio && touched.inicio}
                      isValid={!!touched.inicio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.inicio}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Fin
                  </Form.Label>
                  <Col lg="12">
                    <Form.Control
                      value={values.fin}
                      onChange={handleChange}
                      name="fin"
                      type="date"
                      isInvalid={!!errors.fin && touched.fin}
                      isValid={!!touched.fin}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fin}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="12">
                    Resolución
                  </Form.Label>
                  <Col lg="12">
                    <Form.Control
                      value={values.resolucion}
                      onChange={handleChange}
                      name="resolucion"
                      type="text"
                      maxLength={35}
                      isInvalid={!!errors.resolucion && touched.resolucion}
                      isValid={!!touched.resolucion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.resolucion}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center ">
          {values.operacion === "1" ? (
            <Button className="mt-4  mb-4" variant="danger" type="submit">
              Modificar
            </Button>
          ) : (
            <Button className="mt-4 mb-4" variant="primary" type="submit">
              Guardar
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default Componente;
