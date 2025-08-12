import { useEffect, useRef } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";

const Componente = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.values.foco === "0") {
      inputRef.current?.focus();
    }
    props.setFieldValue("foco", "0");
  }, [props.values.foco]);

  return (
    <Container className=" ">
      <Form noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off">
        <Row className="">
          <Form.Group as={Col} md="12" className="mb-2">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              required
              ref={inputRef}
              value={props.values.proveedor}
              onChange={props.handleChange}
              name="proveedor"
              type="text"
              placeholder="Proveedor"
              maxlength="50"
              isInvalid={
                !!props.errors.proveedor &&
                props.touched.proveedor &&
                props.values.proveedor?.length === 0
              }
              isValid={!!props.touched.proveedor}
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.proveedor}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default Componente;
