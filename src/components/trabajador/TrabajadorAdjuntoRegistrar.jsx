import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const TrabajadorAdjuntoRegistrar = (props) => {
  const [listaRequisito, setlistaRequisito] = useState([]);
  const inputReffocus = useRef();

  useEffect(() => {
    get_lista_requisito();

    // eslint-disable-next-line
  }, []);

  const get_lista_requisito = async () => {
    let _datos = JSON.stringify({
      modulo: "requisito",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaRequisito(res.data.items);
    setFieldValue("id_requisito", res.data.items[0].id);
  };

  const obtenerDescripcion = (lista, id, campo, campoId) => {
    const item = lista.find((el) => el[campoId] === id);
    return item ? item[campo] : "Desconocido";
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify({
      ...data,
    });

    const formData = new FormData();
    formData.append("data", _datos);
    formData.append(data.id_requisito, data.archivo);

    Axios.post(window.globales.url + "/trabajador/guardar_adjunto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (ProgressEvent) => {},
    })
      .then((res) => {
        if (res.data.rpta === "1") {
          const obj = {
            id_requisito: data.id_requisito,
            requisito: obtenerDescripcion(
              listaRequisito,
              data.id_requisito,
              "descripcion",
              "id"
            ),
          };

          props.inserta(obj);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((err) => {
        Swal.fire({ text: err.message, icon: "error" });
      });
  };
  const initialValues = {
    operacion: "0",
    idmodulo: props.idmodulo ? props.idmodulo : "",
    id_trabajador: props.idmodulo ? props.idmodulo : "",
    id_requisito: "",
    archivo: "",
  };
  const validationSchema = Yup.object({
    archivo: Yup.mixed()
      .required("Debe seleccionar un archivo")
      .test("fileType", "Solo se permite PDF", (value) =>
        value ? value.type === "application/pdf" : false
      ),
  });
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        guardar(values);
      },
    });

  return (
    <Container className="mt-3">
      <Form noValidate onSubmit={handleSubmit} autoComplete="off">
        <Row className="">
          <Col lg="12">
            <Form.Group as={Row} className="mb-2 m-0">
              <Form.Label column lg="3">
                Grado
              </Form.Label>
              <Col lg="9">
                <Form.Select
                  ref={inputReffocus}
                  value={values.id_requisito}
                  onChange={handleChange}
                  name="id_requisito"
                  isValid={!!touched.id}
                >
                  {listaRequisito.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
          <Col lg="12">
            <Form.Group as={Row} className="mb-2 m-0">
              <Form.Label column lg="3">
                Adjunto
              </Form.Label>
              <Col lg="9">
                <Form.Control
                  type="file"
                  name="archivo"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("archivo", file);
                  }}
                  isInvalid={!!errors.archivo && touched.archivo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.archivo}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Col>
        </Row>
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

export default TrabajadorAdjuntoRegistrar;
