import { Card, Col, Container, Form, Row } from "react-bootstrap";
import DocenterMain from "./DocenteMain";
import Dashboard from "../dashboard/Dashboard";
import DocenteCabecera from "./DocenteCabecera";
import * as Yup from "yup";
import { useFormik } from "formik";

const DocenteVinculo = () => {
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
        <DocenterMain modulo="/docente_vinculo" />

        <hr className="mt-1 " />
        <div style={{marginTop:"30px"}}></div>
        <Card>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Row className="m-0">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="3">
                    Ingreso
                  </Form.Label>
                  <Col lg="9">
                    <Form.Control
                      value={values.ingreso}
                      onChange={handleInputChange}
                      name="ingreso"
                      type="date"
                      isInvalid={!!errors.ingreso & touched.ingreso}
                      isValid={!!touched.ingreso}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ingreso}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="3">
                    Remuneración
                  </Form.Label>
                  <Col lg="9">
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
                      {errors.remuneracion}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="3">
                    Categoria
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Cargo funcional
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Categoria y dedicación
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Tipo y clasificación
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Departamento Académico
                  </Form.Label>
                  <Col lg="9">
                    <Form.Select
                      value={values.sexo}
                      onChange={handleInputChange}
                      name="sexo"
                      isValid={!!touched.sexo}
                    >
                      <option key="1" value="M">
                        INGENIERIA CIVIL
                      </option>
                      <option key="1" value="M">
                        INGENIERIA DE INDUSTRIAS ALIMENTARIAS
                      </option>
                      <option key="1" value="M">
                        INGENIERIA FORESTAL Y AMBIENTAL
                      </option>
                      <option key="1" value="M">
                        INGENIERIA MECANICA Y ELECTRICA
                      </option>
                      <option key="0" value="F">
                        TECNOLOGIA MÉDICA
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="3">
                    Nro de plaza
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Tipo de resolución
                  </Form.Label>
                  <Col lg="9">
                    <Form.Select
                      value={values.sexo}
                      onChange={handleInputChange}
                      name="sexo"
                      isValid={!!touched.sexo}
                    >
                      <option key="1" value="N">
                        NOMBRAMIENTO
                      </option>
                      <option key="1" value="C">
                        CONTRATADO
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="3">
                    Nro de resolución
                  </Form.Label>
                  <Col lg="9">
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
                  <Form.Label column lg="3">
                    Fecha de resolución
                  </Form.Label>
                  <Col lg="9">
                    <Form.Control
                      value={values.ingreso}
                      onChange={handleInputChange}
                      name="ingreso"
                      type="date"
                      isInvalid={!!errors.ingreso & touched.ingreso}
                      isValid={!!touched.ingreso}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ingreso}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>
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

export default DocenteVinculo;
