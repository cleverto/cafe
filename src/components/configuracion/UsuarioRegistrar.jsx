import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const UsuarioRegistrar = ({ handleClose, rowdata, idmodulo }) => {
  const inputRefdescripcion = useRef();

  const [listaperfil, setListaperfil] = useState([]);

  useEffect(() => {
    get_lista_perfil();

    inputRefdescripcion.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (idmodulo) {
      get_modulo(idmodulo);
    }
    // eslint-disable-next-line
  }, [idmodulo]);

  const initialValues = {
    operacion: "0",
    id: idmodulo ? idmodulo : "",
    usuario: "",
    dni: "",
    id_perfil: "",
    nacimiento: new Date().toISOString().split("T")[0],
    email: "",
    telefono: "",
    direccion: "",
    activo: true,
  };
  const get_lista_perfil = async () => {
    let _datos = JSON.stringify({ modulo: "perfil", campo: "perfil" });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaperfil(res.data.items);
    setFieldValue("id_perfil", res.data.items[0].id);
  };
  const get_modulo = async (id) => {
    let _datos = JSON.stringify({ id: id });
    await Axios.post(window.globales.url + "/usuario/modulo", _datos).then(
      (res) => {
        let fecha = new Date(res.data.items.nacimiento);

        fecha = fecha.toISOString().split("T")[0];

        setFieldValue("operacion", "1");
        setFieldValue("usuario", res.data.items.usuario);
        setFieldValue("dni", res.data.items.dni);
        setFieldValue("id_perfil", res.data.items.id_perfil);
        setFieldValue("nacimiento", fecha);
        setFieldValue("email", res.data.items.email);
        setFieldValue("telefono", res.data.items.telefono);
        setFieldValue("direccion", res.data.items.direccion);
        setFieldValue("activo", Boolean(parseInt(res.data.items.activo)));
      }
    );
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);
    await Axios.post(window.globales.url + "/usuario/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({
            text: res.data.msg,
            icon: "info",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    usuario: Yup.string()
      .required("Por favor ingrese el nombre del usuario")
      .max(50, "El apellido paterno debe tener como máximo 100 caracteres"),
    dni: Yup.string()
      .required("Por favor ingrese el número de documento")
      .length(8, "El DNI debe tener exactamente 8 caracteres"),
    nacimiento: Yup.date()
      .required("La fecha es incorrecta")
      .min(
        new Date(new Date().setFullYear(new Date().getFullYear() - 70)),
        "Verifique el año"
      )
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "Verifique el año"
      )
      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    email: Yup.string()
      .required("Por favor ingrese el correo electrónico")
      .email("Por favor ingrese un correo electrónico válido")
      .max(100, "El correo electrónico debe tener como máximo 100 caracteres")
      .matches(
        /^[a-zA-Z0-9._%+-]+@unj\.edu\.pe$/,
        "El correo debe ser institucional (@unx.com)"
      ),

    telefono: Yup.string()
      .required("Por favor ingrese el teléfono")
      .max(30, "El teléfono debe tener como máximo 30 caracteres"),
    activo: Yup.boolean(),
  });

  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        guardar(values);

        inputRefdescripcion.current.focus();
      },
    });
  return (
    <>
      <Container>
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row>
            <Form.Group as={Col} md="12" className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                ref={inputRefdescripcion}
                required
                value={values.usuario}
                onChange={handleChange}
                name="usuario"
                type="text"
                maxLength={100}
                isInvalid={!!errors.usuario & touched.usuario}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                required
                value={values.dni}
                onChange={handleChange}
                name="dni"
                type="text"
                maxLength={8}
                isInvalid={!!errors.dni & touched.dni}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" className="mb-3">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control
                value={values.nacimiento}
                onChange={handleChange}
                name="nacimiento"
                type="date"
                isInvalid={!!errors.nacimiento & touched.nacimiento}
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Perfil</Form.Label>
            <Form.Select
              value={values.id}
              onChange={handleChange}
              name="id_perfil"
              className=""
            >
              {listaperfil.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.descripcion}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={values.email}
                onChange={handleChange}
                name="email"
                type="text"
                maxLength={100}
                isInvalid={!!errors.email & touched.email}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                required
                value={values.telefono}
                onChange={handleChange}
                name="telefono"
                type="text"
                maxLength={30}
                isInvalid={!!errors.telefono & touched.telefono}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="12" className="mb-4">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                required
                value={values.direccion}
                onChange={handleChange}
                name="direccion"
                type="text"
                isInvalid={!!errors.direccion & touched.direccion}
              />
            </Form.Group>
          </Row>
          <Form.Check
            checked={values.activo}
            onChange={handleChange}
            inline
            label="activo"
            type="checkbox"
            name="activo"
            id="activo"
          />
          <div className="d-grid">
            {values.operacion === "1" ? (
              <Button className="mt-4 " variant="danger" type="submit">
                Modificar
              </Button>
            ) : (
              <Button className="mt-4 " variant="primary" type="submit">
                Guardar
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};

export default UsuarioRegistrar;
