import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const AdmRegistrar = ({
  handleClose,
  inserta,
  modifica,
  rowdata,
  idmodulo,
  modulo,
}) => {
  const inputRefdescripcion = useRef();
  const [valor, setValor] = useState({});

  useEffect(() => {
    inputRefdescripcion.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (idmodulo) {
      get_modulo();
    }
    // eslint-disable-next-line
  }, [idmodulo, modulo]);

  const initialValues = {
    operacion: idmodulo ? "1" : "0",
    id: idmodulo ? idmodulo : "0",
    modulo: modulo,
    campo: modulo,
    descripcion: valor.descripcion ? valor.descripcion : "",
  };

  const get_modulo = async () => {
    let _datos = JSON.stringify({
      modulo: modulo,
      campo: `id_${modulo}`,
      id: idmodulo,
    });
    await Axios.post(
      window.globales.url + "/administracion/modulo",
      _datos
    ).then((res) => {
      setFieldValue("operacion", "1");
      setFieldValue("descripcion", res.data.items.descripcion);
    });
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);
    await Axios.post(window.globales.url + "/administracion/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          const obj = {
            id: data.operacion === "0" ? res.data.id : data.id,
            descripcion: data["descripcion"].toUpperCase(),
          };

          if (data.operacion === "0") {
            inserta(obj);
          } else {
            modifica(obj);
          }
        }else{
           Swal.fire({ text: res.data.msg, icon: "info" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    descripcion: Yup.string().required("Por favor ingrese la descripcion"),
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
    <>
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
        <div className="">
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
    </>
  );
};

export default AdmRegistrar;
