import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const TrabajadorAcademicoRegistrar = (props) => {
  const [listaGrado, setlistaGrado] = useState([]);
  const [listaInstitucion, setlistaInstitucion] = useState([]);
  const [listaCarrera, setlistaCarrera] = useState([]);
  const currentYear = new Date().getFullYear();
  const inputReffocus = useRef();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idm = searchParams.get("id");

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    inputReffocus.current.focus();
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(
      window.globales.url + "/trabajador/modulo_academica",
      _datos
    )
      .then((res) => {
        if (res.data.rpta === "1") {
          setFieldValue("operacion", "1");
          setFieldValue("idmodulo", res.data.items.id_trabajador_academica);
          setFieldValue("id_trabajador", res.data.items.id_trabajador);
          setFieldValue("id_grado", res.data.items.id_grado);
          setFieldValue("id_institucion", res.data.items.id_institucion);
          setFieldValue("id_carrera", res.data.items.id_carrera);
          setFieldValue("egresado", res.data.items.egresado);
          setFieldValue("colegiatura", res.data.items.colegiatura);
        } else {
          setFieldValue("operacion", "0");
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  useEffect(() => {
    get_lista_grado();
    get_lista_institucion();
    get_lista_carrera();

    // eslint-disable-next-line
  }, []);

  const get_lista_grado = async () => {
    let _datos = JSON.stringify({
      modulo: "grado",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaGrado(res.data.items);
    setFieldValue("id_grado", res.data.items[0].id);
  };
  const get_lista_institucion = async () => {
    let _datos = JSON.stringify({
      modulo: "institucion",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaInstitucion(res.data.items);
    setFieldValue("id_institucion", res.data.items[0].id);
  };
  const get_lista_carrera = async () => {
    let _datos = JSON.stringify({
      modulo: "carrera",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaCarrera(res.data.items);
    setFieldValue("id_carrera", res.data.items[0].id);
  };
  const obtenerDescripcion = (lista, id, campo, campoId) => {
    const item = lista.find((el) => el[campoId] === id);
    return item ? item[campo] : "Desconocido";
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(
      window.globales.url + "/trabajador/guardar_academica",
      _datos
    )
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({ text: res.data.msg, icon: "info" });

          const obj = {
            id_trabajador_academica:
              data.operacion === "0" ? res.data.id : data.idmodulo,
            grado: obtenerDescripcion(
              listaGrado,
              data.id_grado,
              "grado",
              "id_grado"
            ),
            institucion: obtenerDescripcion(
              listaInstitucion,
              data.id_institucion,
              "institucion",
              "id_institucion"
            ),
            carrera: obtenerDescripcion(
              listaCarrera,
              data.id_carrera,
              "carrera",
              "id_carrera"
            ),
            egresado: data.egresado,
            colegiatura: data.colegiatura,
          };

          if (data.operacion === "0") {
            props.inserta(obj);
          } else {
            console.log(obj);
            props.modifica(obj);
          }
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const initialValues = {
    operacion: "0",
    idmodulo: props.idmodulo ? props.idmodulo : "",
    id_trabajador: idm,
    id_grado: "",
    id_institucion: "",
    id_carrera: "",
    egresado: "",
    colegiatura: "",
  };

  const validationSchema = Yup.object({
    egresado: Yup.string()
      .matches(/^\d{4}$/, "Debe ser un año válido de 4 dígitos")
      .test(
        "max-year",
        `El año no puede ser mayor a ${currentYear}`,
        (value) => !value || parseInt(value, 10) <= currentYear
      )
      .required("Este campo es obligatorio"),
    colegiatura: Yup.string().required("Este campo es obligatorio"),
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
        <Row className="g-3">
          <Col lg="12">
            <Form.Group className="">
              <Form.Label>Grado</Form.Label>

              <Form.Select
                ref={inputReffocus}
                value={values.id}
                onChange={handleChange}
                name="id_grado"
                isValid={!!touched.id}
              >
                {listaGrado.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg="12">
            <Form.Group className="">
              <Form.Label>Institucion superior</Form.Label>

              <Form.Select
                value={values.id}
                onChange={handleChange}
                name="id_institucion"
                isValid={!!touched.id}
              >
                {listaInstitucion.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg="12">
            <Form.Group className="">
              <Form.Label>Carrera</Form.Label>

              <Form.Select
                value={values.id}
                onChange={handleChange}
                name="id_carrera"
                isValid={!!touched.id}
              >
                {listaCarrera.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg="12">
            <Form.Group className="">
              <Form.Label>Año de egresado</Form.Label>

              <Form.Control
                required
                value={values.egresado}
                onChange={handleChange}
                name="egresado"
                type="text"
                minLength="4"
                maxLength="4"
                isInvalid={!!errors.egresado & touched.egresado}
                isValid={!!touched.egresado}
              />

              <Form.Control.Feedback type="invalid">
                {errors.egresado}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg="12">
            <Form.Group className="">
              <Form.Label>Nro de colegiatura</Form.Label>

              <Form.Control
                required
                value={values.colegiatura}
                onChange={handleChange}
                name="colegiatura"
                type="text"
                maxLength="35"
                isInvalid={!!errors.colegiatura & touched.colegiatura}
                isValid={!!touched.colegiatura}
              />

              <Form.Control.Feedback type="invalid">
                {errors.colegiatura}
              </Form.Control.Feedback>
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

export default TrabajadorAcademicoRegistrar;
