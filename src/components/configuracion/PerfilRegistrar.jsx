import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const PerfilRegistrar = (props) => {
  const inputRefdescripcion = useRef();
  const [valor, setValor] = useState({});

  useEffect(() => {
    inputRefdescripcion.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.idmodulo) {
      get_modulo();
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const initialValues = {
    operacion: props.idmodulo ? "1" : "0",
    id: props.idmodulo ? props.idmodulo : "0",
    modulo: "men_perfil",
    campo: "perfil",    
    descripcion: valor.descripcion ? valor.descripcion : "",
    activo: valor.activo ? valor.activo : true,
  };

  const get_modulo = async () => {
    let _datos = JSON.stringify({
      modulo: "men_perfil",
      campo: "perfil",
      id: props.idmodulo,
    });
    await Axios.post(
      window.globales.url + "/administracion/get_modulo_admi",
      _datos
    ).then((res) => {

      setValor((valor) => ({
        ...valor,
        operacion: "1",
      }));
      setValor((valor) => ({
        ...valor,
        descripcion: res.data.items[0].nombre,
      }));
      setValor((valor) => ({
        ...valor,
        activo: Boolean(parseInt(res.data.items[0].activo)),
      }));

    });
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);
    await Axios.post(
      window.globales.url + "/administracion/guardar_admi",
      _datos
    )
      .then((res) => {
        if (res.data.rpta === "true") {
          Swal.fire({
            text: res.data.msg,
            icon: "info",
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    descripcion: Yup.string().required("Por favor ingrese la descripcion"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(valores, { resetForm }) => {
        guardar(valores);
        resetForm();
        inputRefdescripcion.current.focus();
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              ref={inputRefdescripcion}
              required
              value={values.descripcion}
              onChange={handleChange}
              name="descripcion"
              type="text"
              placeholder="Descripción"
              style={{ textTransform: "uppercase" }}
              isInvalid={!!errors.descripcion & touched.descripcion}
            />
          </Form.Group>
          <Form.Check
            checked={values.activo}
            onChange={handleChange}
            inline
            label="activo"
            type="checkbox"
            name="activo"
            id="activo"
          />
          <div className="">
            {valor.operacion === "1" ? (
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
      )}
    </Formik>
  );
};

export default PerfilRegistrar;
