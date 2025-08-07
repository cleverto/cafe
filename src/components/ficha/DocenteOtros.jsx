import { Card, Col, Container, Form, Row } from "react-bootstrap";
import DocenterMain from "./DocenteMain";
import Dashboard from "../dashboard/Dashboard";
import DocenteCabecera from "./DocenteCabecera";
import * as Yup from "yup";
import { useFormik } from "formik";

const DocenteOtros = () => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };
  const validationSchema = Yup.object({
    ingreso: Yup.date().nullable(),
  });
  const guardar = (e) => {};
  const initialValues = {
    apellido_paterno: "",
  };
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        guardar(values);
        //guardar(values);
        // if (error==="true"){
        //   resetForm();
        // }
        // inputReffocus.current.focus();
      },
    });
  const componente = (
    <>
      <Container className="mt-4">
        <DocenteCabecera />
        <DocenterMain modulo="/docente_otros" />
        <hr className="mt-1 " />
        <div style={{marginTop:"30px"}}></div>
        <Card>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="2">
                  Nombres y Apellidos
                </Form.Label>
                <Col lg="10">
                  <Form.Control
                    required
                    value={values.ingreso}
                    onChange={handleInputChange}
                    name="remuneracion"
                    type="text"
                    maxlength="50"
                    style={{ textTransform: "uppercase" }}
                    isInvalid={!!errors.ingreso & touched.ingreso}
                    isValid={!!touched.ingreso}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ingreso}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="2">
                  Parentezco
                </Form.Label>
                <Col lg="10">
                  <Form.Select
                    value={values.sexo}
                    onChange={handleInputChange}
                    name="sexo"
                    isValid={!!touched.sexo}
                  >
                    <option key="1" value="M">
                      Padre
                    </option>
                    <option key="1" value="M">
                      Hermano
                    </option>
                    <option key="1" value="M">
                      Tío
                    </option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="2">
                  Direccion
                </Form.Label>
                <Col lg="10">
                  <Form.Control
                    required
                    value={values.ingreso}
                    onChange={handleInputChange}
                    name="remuneracion"
                    type="text"
                    maxlength="50"
                    style={{ textTransform: "uppercase" }}
                    isInvalid={!!errors.ingreso & touched.ingreso}
                    isValid={!!touched.ingreso}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.ingreso}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="2">
                  Celular
                </Form.Label>
                <Col lg="10">
                  <Form.Control
                    required
                    value={values.ingreso}
                    onChange={handleInputChange}
                    name="remuneracion"
                    type="text"
                    maxlength="50"
                    style={{ textTransform: "uppercase" }}
                    isInvalid={!!errors.ingreso & touched.ingreso}
                    isValid={!!touched.ingreso}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.ingreso}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Form>
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

export default DocenteOtros;
