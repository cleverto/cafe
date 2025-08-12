import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProveedorForm from "./ProveedorForm";

const ProveedorRegistrar = (props) => {


  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);


  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/proveedor/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("proveedor", res.data.items.proveedor);

        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };


  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/proveedor/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("foco", "1");
          const obj = {
            id_proveedor: data.operacion === "0" ? res.data.id : data.idmodulo,
            proveedor: data.proveedor,
          };

          if (data.operacion === "0") {
            props.inserta(obj);
          } else {
            props.modifica(obj);
            props.handleClose();
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
    idmodulo: props.idmodulo,
    proveedor: "",
    foco: "0",
  };

  const validationSchema = Yup.object({
    proveedor: Yup.string().required("Requerido"),

  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      guardar(values);
      if (formik.values.operacion === "0") {
        resetForm();
      }


    },
  });

  return (

    <ProveedorForm
      {...formik}
    />

  );
};

export default ProveedorRegistrar;
